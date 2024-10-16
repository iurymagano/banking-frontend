export type AccountCreate = {
  name: string;
  password: string;
  type: string;
  document: string;
  email: string;
};

export type Account = {
  id: number;
  avatar: string;
  name: string;
  userId: number;
  balance: number;
  type: string;
  status: 'ACTIVE' | 'PENDING_KYC';
  createdAt: Date;
  accountId: string;
};

export type DataIca = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

export type Transaction = {
  id: string;
  accountId: string;
  type: string;
  amount: number;
  description: string;
  recipientName: string;
  recipientDocument: string;
  recipientBank: number | null;
  recipientBranch: number | null;
  recipientAccount: number | null;
  billetCode: number | null;
  pixKey: string;
  e2eId: string;
  createdAt: Date;
  name: string;
  typeAccount: 'PERSONAL' | 'BUSINESS';
  document: string;
};
