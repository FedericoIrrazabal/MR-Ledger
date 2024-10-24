declare module "html2pdf.js" {
  export interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number };
    jsPDF?: {
      unit: string;
      format: string;
      orientation: string;
    };
  }

  interface Html2PdfInstance {
    set: (options: Html2PdfOptions) => Html2PdfInstance;
    from: (element: HTMLElement | string) => Html2PdfInstance;
    save: () => Promise<void>;
  }

  function html2pdf(): Html2PdfInstance;
  export = html2pdf;
}