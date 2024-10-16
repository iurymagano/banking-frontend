import { Account } from './Accounts';

export type User = {
  id: number;
  email: string;
  name: string;
  accounts: Account[];
};
