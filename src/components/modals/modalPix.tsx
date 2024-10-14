'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import FormPix from './formPix';

type DialogProps = {
  children: React.ReactNode;
};

export function ModalPix({ children }: DialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md" aria-describedby="create account">
        <DialogHeader>
          <DialogTitle>Realizar Pix</DialogTitle>
        </DialogHeader>
        <FormPix setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
