"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Type,
  Transaction,
  TransactionFormValues,
} from "@/interfaces/transaction";
import {
  createTransaction,
  updateTransaction,
} from "@/app/actions/transactionActions";
import { useTransition } from "react";
import { useToast } from "../ui/use-toast";

interface TransactionFormContentProps {
  categories: string[];
  type: Type;
  transaction?: Transaction;
  onSuccess?: () => void;
}

const formSchema = z.object({
  type: z.nativeEnum(Type),
  amount: z.number().positive(),
  description: z.string().min(1),
  category: z.string().min(1),
});

export const TransactionFormContent = ({
  categories,
  type,
  transaction,
  onSuccess,
}: TransactionFormContentProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: transaction?.type ?? type,
      amount: transaction?.amount ?? 0,
      description: transaction?.description ?? "",
      category: transaction?.category ?? "",
    },
  });

  const onSubmit = async (data: TransactionFormValues) => {
    startTransition(async () => {
      try {
        if (transaction) {
          await updateTransaction(transaction.id, data);
          toast({
            title: "Transacción actualizada",
            description: "La transacción se ha actualizado correctamente.",
          });
        } else {
          await createTransaction(data);
          toast({
            title: "Transacción creada",
            description: "La nueva transacción se ha creado correctamente.",
          });
        }
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error("Error al procesar la transacción:", error);
        toast({
          title: "Error",
          description:
            "Hubo un problema al procesar la transacción. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    });
  };

  const getButtonText = () => {
    if (isPending) return "Procesando...";
    const action = transaction ? "Actualizar" : "Crear";
    const transactionType = type === Type.Income ? "Ingreso" : "Egreso";
    return `${action} ${transactionType}`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {getButtonText()}
        </Button>
      </form>
    </Form>
  );
};
