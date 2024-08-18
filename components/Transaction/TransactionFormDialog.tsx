"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "@/interfaces/transaction";
import { TransactionForm } from "./TransactionForm";

interface TransactionFormDialogProps {
  incomeCategories: string[];
  expenseCategories: string[];
  transaction?: Transaction;
  triggerButton: React.ReactNode;
}

export const TransactionFormDialog = ({
  incomeCategories,
  expenseCategories,
  transaction,
  triggerButton,
}: TransactionFormDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="w-10/12 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl lg:text-2xl">
            {transaction ? "Editar Transacción" : "Nueva Transacción"}
          </DialogTitle>
        </DialogHeader>
        <TransactionForm
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          transaction={transaction}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};
