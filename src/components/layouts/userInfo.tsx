import {
  User,
  Mail,
  FileText,
  CreditCard,
  Building2,
  Wallet,
} from 'lucide-react';
import NumberMotion from '../ui/numberMotion';
import { Account } from '@/types/Accounts';

type Props = {
  user: {
    name: string;
    email: string;
    accounts?: Account[];
  };
  balance: number;
};

export function UserInfo({ user, balance }: Props) {
  const accounts = user?.accounts?.[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <User className="text-blue-700" />
          <div>
            <h3 className="font-semibold text-gray-700">Nome</h3>
            <p className="text-lg">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="text-blue-700" />
          <div>
            <h3 className="font-semibold text-gray-700">Email</h3>
            <p className="text-lg">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FileText className="text-blue-700" />
          <div>
            <h3 className="font-semibold text-gray-700">Documento</h3>
            <p className="text-lg">{accounts?.document}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <CreditCard className="text-blue-700" />
          <div>
            <h3 className="font-semibold text-gray-700">Número da Conta</h3>
            <p className="text-lg">{accounts?.number}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Building2 className="text-blue-700" />
          <div>
            <h3 className="font-semibold text-gray-700">Banco</h3>
            <p className="text-lg">{accounts?.branch}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start">
            <div className="flex items-center space-x-4">
              <Wallet className="text-blue-700" />
              <h3 className="font-semibold text-gray-700">Saldo</h3>
            </div>
            <NumberMotion
              value={balance}
              className={` text-2xl  ${
                balance >= 0 ? ' text-green-600' : ' text-red-600'
              }`}
              money={true}
              prefix="R$"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
