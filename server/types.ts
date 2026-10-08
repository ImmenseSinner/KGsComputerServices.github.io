export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
}

export interface EnquiryRecord extends EnquiryInput {
  id: number;
  otp: string;
  verified: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentInput {
  amount: number;
  item_name: string;
  name: string;
  email: string;
  cell: string;
  reference?: string;
}

export interface YocoApiConfig {
  merchantId: string;
  merchantKey: string;
  passphrase?: string;
  sandbox: boolean;
}
