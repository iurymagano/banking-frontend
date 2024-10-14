'use client';

import { useState } from 'react';
import { Menu, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { handleSignOut } from '@/lib/server/auth';
import { ModalAccount } from '../modals/modalAccount';
import { ModalPix } from '../modals/modalPix';
import { ModalTransf } from '../modals/modalTransf';
import { IoIosPersonAdd } from 'react-icons/io';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import Link from 'next/link';

export default function MenuMobile() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <Home color="purple" />, label: 'Início', href: '/dashboard' },
    {
      icon: <LogOut color="brown" />,
      label: 'Sair',
      href: '',
      onClick: () => handleSignOut(),
    },
  ];

  return (
    <div className="block lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 right-4 z-40 bg-background"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex flex-col h-full ">
            <ModalAccount>
              <div className="flex gap-2  items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <IoIosPersonAdd size={24} color="blue" />
                <span className=" text-sm cursor-pointer">Nova Conta</span>
              </div>
            </ModalAccount>
            <ModalPix>
              <div className="flex gap-2  items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <MdOutlineAttachMoney size={24} color="green" />
                <span className=" text-sm cursor-pointer">Realizar PIX</span>
              </div>
            </ModalPix>
            <ModalTransf>
              <div className="flex gap-2 items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <BiTransfer size={24} color="orange" />
                <span className=" text-sm cursor-pointer">Transferência</span>
              </div>
            </ModalTransf>

            <nav className="flex-grow border-t-[1px] border-zinc-300 mt-2 pb-2">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex gap-2 items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      onClick={() => item.onClick && item.onClick()}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
