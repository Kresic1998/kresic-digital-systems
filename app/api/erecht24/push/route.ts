import { timingSafeEqual } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import {
  ERECHT24_CACHE_TAG,
  ERECHT24_PUSH_QUERY,
  ERECHT24_PUSH_TYPES,
  type Erecht24PushType,
} from "@/lib/erecht24/constants";

function timingSafeStringEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "utf8");
    const bb = Buffer.from(b, "utf8");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

function isPushType(v: string): v is Erecht24PushType {
  return (ERECHT24_PUSH_TYPES as readonly string[]).includes(v);
}

function getParams(req: NextRequest): URLSearchParams {
  return req.nextUrl.searchParams;
}

/**
 * eRecht24 push: GET/POST sa query parametrima `erecht24_secret` i `erecht24_type`
 * (vidi zvanični PHP primer: docs/push_controller.md).
 *
 * Postavi `ERECHT24_PUSH_SECRET` na istu vrednost kao `secret` iz klijenta
 * registrovanog u Projekt Manageru (max 3 klijenta po projektu).
 */
export async function GET(req: NextRequest) {
  return handleErecht24Push(req);
}

export async function POST(req: NextRequest) {
  return handleErecht24Push(req);
}

async function handleErecht24Push(req: NextRequest): Promise<NextResponse> {
  const expected = process.env.ERECHT24_PUSH_SECRET?.trim();
  if (!expected) {
    return NextResponse.json(
      { error: "ERECHT24_PUSH_SECRET is not configured" },
      { status: 503 }
    );
  }

  const qs = getParams(req);
  let secret = qs.get(ERECHT24_PUSH_QUERY.secret) ?? "";
  let type = qs.get(ERECHT24_PUSH_QUERY.type) ?? "";

  if (req.method === "POST" && (!secret || !type)) {
    const ct = req.headers.get("content-type") ?? "";
    if (ct.includes("application/x-www-form-urlencoded")) {
      const body = await req.text();
      const parsed = new URLSearchParams(body);
      secret = parsed.get(ERECHT24_PUSH_QUERY.secret) ?? secret;
      type = parsed.get(ERECHT24_PUSH_QUERY.type) ?? type;
    } else if (ct.includes("application/json")) {
      try {
        const json = (await req.json()) as Record<string, unknown>;
        secret = String(json[ERECHT24_PUSH_QUERY.secret] ?? json.secret ?? secret);
        type = String(json[ERECHT24_PUSH_QUERY.type] ?? json.type ?? type);
      } catch {
        /* ignore */
      }
    }
  }

  if (!timingSafeStringEqual(secret, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!type || !isPushType(type)) {
    return NextResponse.json({ error: "Invalid erecht24_type" }, { status: 422 });
  }

  if (type === "ping") {
    return NextResponse.json({ status: 200, message: "pong" });
  }

  revalidateTag(ERECHT24_CACHE_TAG);
  return NextResponse.json({ ok: true, revalidated: ERECHT24_CACHE_TAG });
}
