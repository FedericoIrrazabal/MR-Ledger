import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { getInitials } from "@/utils/get-initials";
import { Transaction, Type } from "@/interfaces/transaction";
import { TransactionFormDialog } from "./TransactionFormDialog";
import { TransactionDeleteDialog } from "./TransactionDeleteDialog";
import {
  expenseCategories,
  incomeCategories,
} from "@/app/constants/categories";
import { formatCurrency } from "@/utils/format-currency";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  transactions: Transaction[];
  userId: string;
}

export const TransactionsTable = ({ transactions, userId }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <Avatar>
                <AvatarImage
                  src={transaction.profiles?.avatar_url}
                  alt={transaction.profiles?.full_name}
                />
                <AvatarFallback>
                  {getInitials(transaction.profiles?.full_name || "")}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              {transaction.type === Type.Income ? "Ingreso" : "Egreso"}
            </TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>
              {format(transaction.created_at, "dd 'de' MMMM yyyy", {
                locale: es,
              })}
            </TableCell>
            <TableCell>
              <TransactionFormDialog
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                transaction={transaction}
                triggerButton={
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={transaction.user_id !== userId}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                }
              />
              <TransactionDeleteDialog
                transactionId={transaction.id}
                triggerButton={
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={transaction.user_id !== userId}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
