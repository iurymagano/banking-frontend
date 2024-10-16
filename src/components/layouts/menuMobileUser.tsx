'use client';

import { useState } from 'react';
import { Menu, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { handleSignOut } from '@/lib/server/auth';
import { ModalPix } from '../modals/modalPix';
import { ModalTransf } from '../modals/modalTransf';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import Link from 'next/link';

export default function MenuMobileUser() {
  const [open, setOpen] = useState<boolean>(false);

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
          <div className="flex flex-col h-full">
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

            <div
              className=" flex-grow border-t-[1px] border-zinc-300 mt-2 pb-2"
              onClick={() => setOpen(false)}
            >
              <Link
                href={'/dashboard'}
                className="flex gap-2 items-center py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                <div className="flex gap-2 items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                  <Home color="purple" size={24} />
                  <span className=" text-sm cursor-pointer">Inicio</span>
                </div>
              </Link>
              <div
                className="flex gap-2 items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={() => handleSignOut()}
              >
                <LogOut color="brown" size={24} />
                <span className=" text-sm cursor-pointer">Sair</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
