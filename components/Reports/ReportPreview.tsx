import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange, Profiles, Transaction } from "@/interfaces/transaction";
import { Button } from "../ui/button";
import { formatCurrency } from "@/utils/format-currency";

interface ReportPreviewProps {
  data: {
    transactions: Transaction[];
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
    userProfile: Profiles;
    dateRange: DateRange;
  };
  isGeneratingPDF: boolean;
  onGeneratePDF: () => void;
}

const ReportPreview = ({
  data,
  isGeneratingPDF,
  onGeneratePDF,
}: ReportPreviewProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={data.userProfile.avatar_url} />
                <AvatarFallback>{data.userProfile.full_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  {data.userProfile.full_name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {format(data.dateRange.from, "dd 'de' MMMM yyyy", {
                    locale: es,
                  })}{" "}
                  -{" "}
                  {format(data.dateRange.to, "dd 'de' MMMM yyyy", {
                    locale: es,
                  })}
                </p>
              </div>
            </div>
            <Button
              onClick={onGeneratePDF}
              className="w-full sm:w-auto"
              disabled={isGeneratingPDF}
            >
              Generar PDF
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(data.totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Egresos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(data.totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Balance Neto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                data.netBalance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(data.netBalance)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(new Date(transaction.created_at), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell
                      className={`text-right ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPreview;
