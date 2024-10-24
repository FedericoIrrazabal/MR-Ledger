"use client";
import {
  getReportTransactions,
  markTransactionsAsReported,
} from "@/app/actions/transactionActions";
import DateRangePicker from "@/components/Reports/DateRangePicker";
import { DateRange, ReportSummary } from "@/interfaces/transaction";
import { useState } from "react";
import ReportPreview from "@/components/Reports/ReportPreview";
import { Html2PdfOptions } from "html2pdf.js";
import { format } from "date-fns";
import PDFReport from "@/components/Reports/PDFReport";

export default function Reports() {
  const [transactions, setTransactions] = useState<ReportSummary>();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleGetTransactionsToReport = async (dateRange: DateRange) => {
    try {
      const data = await getReportTransactions(dateRange);
      data && setTransactions(data);
    } catch (error) {
      console.error("Error al obtener las transacciones:", error);
    }
  };

  const handleGeneratePDF = async () => {
    if (!transactions) return;

    try {
      setIsGeneratingPDF(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const html2pdf = (await import("html2pdf.js")).default;
      const element: HTMLDivElement | null =
        document.querySelector("[data-pdf-report]");
      if (!element) {
        throw new Error("No se encontró el elemento del reporte");
      }

      const options: Html2PdfOptions = {
        margin: 10,
        filename: `reporte-${format(
          transactions.dateRange.from,
          "dd-MM-yyyy"
        )}-${format(transactions.dateRange.to, "dd-MM-yyyy")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(options).from(element).save();

      await markTransactionsAsReported(
        transactions.transactions.map((t) => t.id)
      );

      setTransactions(undefined);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div>
      <DateRangePicker
        onSubmit={(startDate, endDate) => {
          handleGetTransactionsToReport({
            from: startDate,
            to: endDate,
          });
        }}
      />
      {transactions && (
        <>
          <ReportPreview
            data={transactions}
            onGeneratePDF={handleGeneratePDF}
            isGeneratingPDF={isGeneratingPDF}
          />
          {isGeneratingPDF && (
            <div data-pdf-report>
              <PDFReport data={transactions} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
