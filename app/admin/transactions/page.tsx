import {
  expenseCategories,
  incomeCategories,
} from "@/app/constants/categories";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { TransactionFormDialog } from "@/components/Transaction/TransactionFormDialog";
import { TransactionsTable } from "@/components/Transaction/TransactionsTable";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/interfaces/transaction";
import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default async function Transactions() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: transactions } = (await supabase
    .from("transactions")
    .select("*, profiles(full_name, avatar_url)")
    .order("created_at", { ascending: false })) as { data: Transaction[] };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-end">
        <TransactionFormDialog
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          triggerButton={
            <div>
              <Button className="hidden lg:block" variant="outline">
                Agregar Transacción
              </Button>
              <Button
                className="rounded-full fixed bottom-10 right-6"
                variant="secondary"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          }
        />
      </div>

      <div>
        <div className="hidden lg:block">
          <Suspense fallback={"loading..."}>
            <TransactionsTable
              transactions={transactions}
              userId={user?.id ?? ""}
            />
          </Suspense>
        </div>
        <div className="lg:hidden">
          <Suspense fallback={"loading..."}>
            <div className="flex flex-col gap-8">
              {transactions?.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  userId={user?.id ?? ""}
                />
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
