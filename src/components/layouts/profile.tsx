//@ts-nocheck
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils/format';
import { ArrowRightLeft, QrCode } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { apiIca } from '@/lib/requests';
import NumberMotion from '@/components/ui/numberMotion';
import { UserInfo } from '@/components/layouts/userInfo';
import { ModalTransf } from '../modals/modalTransf';
import { ModalPix } from '../modals/modalPix';

export default function Profile() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const { user } = useAuthStore();
  const userObj = user ? user : {};

  useEffect(() => {
    getData();
  }, [userObj]);

  const getData = async () => {
    if (userObj && userObj.accounts[0]) {
      const accountId = userObj.accounts[0].accountId;
      const resp = await apiIca({
        method: 'GET',
        path: `/account/${accountId}/statement`,
      });
      if (resp.result === 'success') {
        setBalance(resp.data.balance);
        setTransactions(resp.data.transactions);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
            <CardTitle className="text-2xl font-bold text-center">
              Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <UserInfo user={userObj} balance={balance} />
          </CardContent>
          <CardFooter className="bg-gray-50 gap-2 max-sm:flex-col flex w-full flex-1">
            <ModalTransf>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <ArrowRightLeft className="mr-2 h-4 w-4" /> Transferência
              </Button>
            </ModalTransf>
            <ModalPix>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <QrCode className="mr-2 h-4 w-4" /> PIX
              </Button>
            </ModalPix>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Transações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo de transação</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          transaction.amount > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <NumberMotion
                        value={transaction.amount}
                        className={`text-sm ${
                          transaction.amount > 0
                            ? ' text-green-600'
                            : ' text-red-600'
                        }`}
                        money={true}
                        prefix="R$"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
