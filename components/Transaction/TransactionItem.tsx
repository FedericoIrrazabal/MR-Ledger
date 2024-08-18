import React from "react";
import {
  ArrowRightLeft,
  Banknote,
  CreditCard,
  Briefcase,
  Pizza,
  Fuel,
  Package,
} from "lucide-react";
import {
  expenseCategories,
  incomeCategories,
} from "@/app/constants/categories";

type IncomeCategory = (typeof incomeCategories)[number];
type ExpenseCategory = (typeof expenseCategories)[number];

type Category = IncomeCategory | ExpenseCategory;

interface TransactionItem {
  category: string;
}

const iconMapping: Record<Category, JSX.Element> = {
  Transferencia: <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />,
  Efectivo: <Banknote className="h-4 w-4 text-muted-foreground" />,
  Cheque: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  Haberes: <Briefcase className="h-4 w-4 text-muted-foreground" />,
  Viaticos: <Pizza className="h-4 w-4 text-muted-foreground" />,
  Combustible: <Fuel className="h-4 w-4 text-muted-foreground" />,
  Insumos: <Package className="h-4 w-4 text-muted-foreground" />,
};

export const TransactionItem = ({ category }: TransactionItem) => {
  return (
    <div className="flex items-center gap-2">
      {iconMapping[category]}
      <span className="text-sm text-muted-foreground">{category}</span>
    </div>
  );
};
