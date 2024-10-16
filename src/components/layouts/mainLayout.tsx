'use client';

import { getAccounts, getTransactions } from '@/lib/requests';
import { useAccountStore } from '@/stores/accountsStore';
import { useAuthStore } from '@/stores/authStore';
import { Account, Transaction } from '@/types/Accounts';
import { User } from '@/types/User';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

type Props = {
  user: User | null;
  children: React.ReactNode;
};

export const MainLayout = ({ user, children }: Props) => {
  const [loading, setLoading] = useState(true);
  const { setAccounts, setTransactions } = useAccountStore();
  const { setUser } = useAuthStore();

  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    if (user) {
      setInterval(() => {
        getDataStore();
      }, 6000);
    }
  }, []);

  const getData = async () => {
    if (user) {
      await getDataStore();
      setUser(user);
    }
    setLoading(false);
  };

  const getDataStore = async () => {
    const [resp, respTransactions] = await Promise.all([
      getAccounts(),
      getTransactions(),
    ]);
    if (resp.result === 'success') {
      setAccounts(resp.data as Account[]);
    }
    if (respTransactions.result === 'success') {
      setTransactions(respTransactions.data as Transaction[]);
    }
  };

  return (
    <div className="h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <BarLoader color="#493cdd" />
        </div>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
};
