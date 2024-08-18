"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteTransaction } from "@/app/actions/transactionActions";
import { toast } from "../ui/use-toast";

interface TransactionDeleteDialogProps {
  transactionId: string;
  triggerButton: React.ReactNode;
}

export const TransactionDeleteDialog = ({
  transactionId,
  triggerButton,
}: TransactionDeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTransaction(transactionId);
        toast({
          title: "Transacción eliminada",
          description: "La transacción se ha eliminado correctamente.",
        });
      } catch (error) {
        console.error("Error al eliminar la transacción:", error);
        toast({
          title: "Error",
          description:
            "Hubo un problema al eliminar la transacción. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
      handleCancel();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="w-10/12 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-semibold">
            ¿Eliminar transacción?
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Esta acción no se puede deshacer. La transacción se eliminará
            permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
