export type ApiError = {
  result: 'success' | 'error';
  message: string;
};

export type ApiLogin = {
  result: 'success' | 'error';
  data: { token?: string };
  message: string;
};

export type ApiData = {
  result: 'success' | 'error';
  data: {};
  message: string;
};

export type ApiGetAccounts = {
  result: 'success' | 'error';
  data: Array<any>;
  message: string;
};

export type ApiDataAccountId = {
  result: 'success' | 'error';
  data: {
    id: number;
    avatar: string;
    name: string;
    userId: number;
    balance: number;
    type: string;
    status: 'ACTIVE' | 'PENDING_KYC';
    createdAt: Date;
  };
  message: string;
};
