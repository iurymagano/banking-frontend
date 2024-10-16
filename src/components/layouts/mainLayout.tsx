//@ts-nocheck
'use client';

import { getAccounts, getTransactions } from '@/lib/requests';
import { useAccountStore } from '@/stores/accountsStore';
import { useAuthStore } from '@/stores/authStore';
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
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

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
      setAccounts(resp.data);
    }
    if (respTransactions.result === 'success') {
      setTransactions(respTransactions.data);
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
