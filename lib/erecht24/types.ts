export type Erecht24LegalPayload = {
  html_de?: string;
  html_en?: string;
  created?: string;
  modified?: string;
  warnings?: string;
  pushed?: string;
};

export type Erecht24ApiErrorBody = {
  message?: string;
  message_de?: string;
  error_code?: number;
  faq_link?: string;
};
