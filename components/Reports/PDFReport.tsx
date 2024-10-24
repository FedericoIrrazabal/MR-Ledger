import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange, Profiles, Transaction } from "@/interfaces/transaction";
import { formatCurrency } from "@/utils/format-currency";

interface PDFReportProps {
  data: {
    transactions: Transaction[];
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
    userProfile: Profiles;
    dateRange: DateRange;
  };
}

const PDFReport: React.FC<PDFReportProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 space-y-6">
      <div className="border-b pb-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {data.userProfile.full_name}
            </h2>
            <p className="text-sm text-gray-600">
              {format(data.dateRange.from, "dd 'de' MMMM yyyy", { locale: es })}{" "}
              - {format(data.dateRange.to, "dd 'de' MMMM yyyy", { locale: es })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Ingresos Totales"
          amount={data.totalIncome}
          type="income"
        />
        <SummaryCard
          title="Egresos Totales"
          amount={data.totalExpenses}
          type="expense"
        />
        <SummaryCard
          title="Balance Neto"
          amount={data.netBalance}
          type={data.netBalance >= 0 ? "income" : "expense"}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          Detalle de Transacciones
        </h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left text-gray-600">Fecha</th>
              <th className="py-2 text-left text-gray-600">Descripción</th>
              <th className="py-2 text-left text-gray-600">Categoría</th>
              <th className="py-2 text-right text-gray-600">Monto</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componentes auxiliares tipados
interface SummaryCardProps {
  title: string;
  amount: number;
  type: "income" | "expense";
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => (
  <div className="p-4 border rounded-lg">
    <p className="text-sm text-gray-600 mb-1">{title}</p>
    <p
      className={`text-2xl font-bold ${
        type === "income" ? "text-green-600" : "text-red-600"
      }`}
    >
      {formatCurrency(amount)}
    </p>
  </div>
);

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => (
  <tr className="border-b">
    <td className="py-3 text-gray-900">
      {format(new Date(transaction.created_at), "dd/MM/yyyy")}
    </td>
    <td className="py-3 text-gray-900">{transaction.description}</td>
    <td className="py-3 text-gray-900">{transaction.category}</td>
    <td
      className={`py-3 text-right ${
        transaction.type === "income" ? "text-green-600" : "text-red-600"
      }`}
    >
      {formatCurrency(transaction.amount)}
    </td>
  </tr>
);

export default PDFReport;
