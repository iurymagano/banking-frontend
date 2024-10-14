'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import FormTransfers from './formTransfers';

type DialogProps = {
  children: React.ReactNode;
};

export function ModalTransf({ children }: DialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md" aria-describedby="create account">
        <DialogHeader>
          <DialogTitle>Transferências</DialogTitle>
        </DialogHeader>
        <FormTransfers setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
