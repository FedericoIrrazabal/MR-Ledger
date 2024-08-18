import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Transaction, Type } from "@/interfaces/transaction";
import { TransactionFormContent } from "./TransactionFormContent";

interface TransactionFormProps {
  incomeCategories: string[];
  expenseCategories: string[];
  transaction?: Transaction;
  onSuccess?: () => void;
}

export const TransactionForm = ({
  incomeCategories,
  expenseCategories,
  transaction,
  onSuccess,
}: TransactionFormProps) => {
  return (
    <Tabs defaultValue={transaction?.type ?? Type.Income}>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value={Type.Income}>Ingresos</TabsTrigger>
        <TabsTrigger value={Type.Expense}>Egresos</TabsTrigger>
      </TabsList>
      <TabsContent value={Type.Income}>
        <TransactionFormContent
          categories={incomeCategories}
          type={Type.Income}
          transaction={transaction}
          onSuccess={onSuccess}
        />
      </TabsContent>
      <TabsContent value={Type.Expense}>
        <TransactionFormContent
          categories={expenseCategories}
          type={Type.Expense}
          transaction={transaction}
          onSuccess={onSuccess}
        />
      </TabsContent>
    </Tabs>
  );
};
