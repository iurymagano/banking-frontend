'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import FormCreateAccount from './formCreateAccount';

type DialogProps = {
  children: React.ReactNode;
};

export function ModalAccount({ children }: DialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md" aria-describedby="create account">
        <DialogHeader>
          <DialogTitle>Criar conta</DialogTitle>
        </DialogHeader>
        <FormCreateAccount setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
