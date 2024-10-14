import { Button } from '@/components/ui/button';
import { ModalAccount } from '../modals/modalAccount';
import { ModalPix } from '../modals/modalPix';
import { ModalTransf } from '../modals/modalTransf';
import { IoIosPersonAdd } from 'react-icons/io';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

export default function TabButtons() {
  return (
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start">
      <div>
        <h1 className="font-bold text-2xl text-gray-600">Dashboard</h1>
      </div>
      <div className="flex gap-4 max-md:hidden">
        <ModalAccount>
          <Button className="flex gap-2">
            <IoIosPersonAdd size={20} /> Nova Conta
          </Button>
        </ModalAccount>
        <ModalPix>
          <Button className="flex gap-2">
            <MdOutlineAttachMoney size={20} /> Realizar Pix
          </Button>
        </ModalPix>
        <ModalTransf>
          <Button className="flex gap-2">
            <BiTransfer size={20} />
            Transferência
          </Button>
        </ModalTransf>
      </div>
    </div>
  );
}
