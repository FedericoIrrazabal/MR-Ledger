import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2, WalletIcon } from "lucide-react";
import { Transaction } from "@/interfaces/transaction";
import { getInitials } from "@/utils/get-initials";
import { TransactionFormDialog } from "./TransactionFormDialog";
import { TransactionDeleteDialog } from "./TransactionDeleteDialog";
import {
  expenseCategories,
  incomeCategories,
} from "@/app/constants/categories";
import { TransactionItem } from "./TransactionItem";
import { formatCurrency } from "@/utils/format-currency";

interface Props {
  transaction: Transaction;
  userId: string;
}

export const TransactionCard = ({ transaction, userId }: Props) => {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
        <Avatar>
          <AvatarImage
            src={transaction.profiles.avatar_url}
            alt={transaction.profiles.full_name}
          />
          <AvatarFallback>
            {getInitials(transaction.profiles.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                transaction.type === "income" ? "secondary" : "destructive"
              }
              className="px-2 py-1 text-xs font-medium"
            >
              {transaction.type === "income" ? "Ingreso" : "Egreso"}
            </Badge>
            <span className="text-muted-foreground text-xs">
              {new Date(transaction.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="text-2xl font-semibold">
            {formatCurrency(transaction.amount)}
          </div>
          <p className="text-sm text-muted-foreground">
            {transaction.description}
          </p>
          <TransactionItem category={transaction.category} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <TransactionFormDialog
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
            transaction={transaction}
            triggerButton={
              <Button
                variant="outline"
                size="icon"
                disabled={transaction.user_id !== userId}
              >
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            }
          />
          <TransactionDeleteDialog
            transactionId={transaction.id}
            triggerButton={
              <Button
                variant="outline"
                size="icon"
                className="text-destructive"
                disabled={transaction.user_id !== userId}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
