import { SignInData } from '@/types/Auth';
import { api } from './api';
import {
  ApiLogin,
  ApiData,
  ApiGetAccounts,
  ApiDataAccountId,
} from '@/types/Api';
import { AccountCreate, DataIca } from '@/types/Accounts';
import { DataCreateTransfer } from '@/types/Tranfers';

/** Auth User  */
export const signIn = async (data: SignInData) => {
  return await api<ApiLogin>({
    endpoint: '/auth/login',
    method: 'POST',
    withAuth: false,
    data,
  });
};

/** Create account  */
export const registerAccount = async (data: AccountCreate) => {
  return await api<ApiData>({
    endpoint: '/auth/register',
    method: 'POST',
    data,
  });
};

/** Create account  */
export const signUp = async (data: AccountCreate) => {
  return await api<ApiData>({
    endpoint: '/auth/signup',
    method: 'POST',
    data,
  });
};

/** Get Accounts  */
export const getAccounts = async () => {
  return await api<ApiGetAccounts>({
    endpoint: '/ica/accounts',
    method: 'GET',
  });
};
/** Get Transactions  */
export const getTransactions = async () => {
  return await api<ApiGetAccounts>({
    endpoint: '/ica/transactions',
    method: 'GET',
  });
};

/** Request Api Ica */
export const apiIca = async (data: DataIca) => {
  return await api<ApiDataAccountId>({
    endpoint: '/ica/request',
    method: 'POST',
    data,
  });
};

export const createPix = async (data: DataCreateTransfer) => {
  const respE2eId = await apiIca({
    path: `/transaction/pix/${process.env.NEXT_PUBLIC_PIX_KEY}`,
  });
  if (respE2eId.result !== 'success') {
    return respE2eId;
  }
  //@ts-ignore
  const e2eId = respE2eId.data?.e2eId as string;
  const number = data.amount.replace(/[^\d,]/g, '');

  const valueNumeric = parseFloat(number.replace(',', '.'));

  const respTransaction = await apiIca({
    path: `/transaction/pix/${data.accountId}/pay`,
    //@ts-ignore
    headers: {
      'X-Payer-Id': data.document,
    },
    //@ts-ignore
    request: {
      method: 'POST',
      data: {
        e2eId,
        pixKey: process.env.NEXT_PUBLIC_PIX_KEY,
        amount: valueNumeric,
      },
    },
  });
  if (respTransaction.result !== 'success') {
    return respTransaction;
  }

  return { result: 'success', data: { e2eId } };
};
