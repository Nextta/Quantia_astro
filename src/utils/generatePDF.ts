import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { isTauri } from "@tauri-apps/api/core";

export interface PerformanceReportPdfTrade {
  t0: string;
  tipo: string;
  precio_entrada: number;
  precio_cierre: number;
  pl: number;
  duracion_horas: string;
}

export interface PerformanceReportPdf {
  title: string;
  initialBalance: number;
  trades: PerformanceReportPdfTrade[];
  /*
   * Cada elemento será una captura correspondiente
   * a una página del dashboard.
   */
  dashboardPages?: string[];
}

const COLORS = {
  background: [9, 18, 35] as [number, number, number],
  surface: [30, 41, 59] as [number, number, number],
  surfaceAlt: [35, 47, 68] as [number, number, number],
  border: [51, 65, 85] as [number, number, number],
  text: [241, 245, 249] as [number, number, number],
  muted: [148, 163, 184] as [number, number, number],
  green: [52, 211, 153] as [number, number, number],
  red: [251, 113, 133] as [number, number, number],
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function safeFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export async function generatePerformancePdf(report: PerformanceReportPdf): Promise<boolean> {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const generatedAt = new Date().toLocaleString("es-MX");

  doc.setProperties({
    title: `Reporte de desempeño - ${report.title}`,
    subject: "Reporte de desempeño de estrategia",
    creator: "Axen Broker",
  });

  //Encapsulamos eso en una función para no repetir.
  const paintBackground = () => {
    doc.setFillColor(...COLORS.background); //Aqui definimos el color de relleno para el fondo de la página.
    doc.rect(0, 0, pageWidth, pageHeight, "F"); //Aqui pintamos el fondo de la página.
  };

  // Página 1: resumen y curva de equidad.

  //Primero dibujamos el fondo

  const dashboardPages = report.dashboardPages ?? [];

  if (dashboardPages.length > 0) {
    const horizontalMargin = 10;
    const topMargin = 8;
    const bottomMargin = 14;
    const sectionGap = 5;

    const maxWidth = pageWidth - horizontalMargin * 2; //Multiplicamos por 2 porque tenemos margen a la izquierda y a la derecha.

    const contentBottom = pageHeight - bottomMargin; //Aqui definimos el límite inferior del contenido, para que no se dibuje sobre el pie de página.

    const maxSectionHeight = contentBottom - topMargin; //El contenido no puede superar este límite, para que no se dibuje sobre el

    let currentY = topMargin;

    // Pintamos la primera página del dashboard.
    paintBackground();

    dashboardPages.forEach((pageImage) => {
      const image = doc.getImageProperties(pageImage);

      /*
       * Todas las capturas conservan el mismo ancho,
       * manteniendo su proporción.
       */
      let scale = maxWidth / image.width;

      let imageWidth = image.width * scale;
      let imageHeight = image.height * scale;

      /*
       * Si una sección individual es más alta que una
       * página, la reducimos hasta que pueda entrar.
       */
      if (imageHeight > maxSectionHeight) {
        scale = maxSectionHeight / image.height;

        imageWidth = image.width * scale;
        imageHeight = image.height * scale;
      }

      /*
       * Solamente crea una página cuando la siguiente
       * sección ya no cabe en la página actual.
       */
      if (
        currentY > topMargin &&
        currentY + imageHeight > contentBottom //Validamos que no exista una captura anterior y si la captura terminaría debajo del límite permitido.
      ) {
        doc.addPage(); //Agregamos una nueva página.
        paintBackground(); //Pintamos el fondo de la nueva página.
        currentY = topMargin; //Reiniciamos la posición vertical para la nueva página.
      }

      const imageX = (pageWidth - imageWidth) / 2;
      //Como la imagen no abarca toda la página, la centramos horizontalmente.
      doc.addImage(
        //Ya que la imagen si cabe en la página, la agregamos.
        pageImage,
        "PNG",
        imageX,
        currentY,
        imageWidth,
        imageHeight,
        undefined,
        "FAST",
      );

      currentY += imageHeight + sectionGap;
    });
  } else {
    /*
     * Portada provisional si la captura no está disponible.
     * Así la tabla todavía puede descargarse.
     */
    paintBackground();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...COLORS.text);
    doc.text("Reporte de Desempeño", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.muted);
    doc.text(report.title, 14, 29);
    doc.text(`Trades: ${report.trades.length}`, 14, 37);
  }

  /*
   * La tabla siempre comienza en una página nueva.
   */
  doc.addPage();

  autoTable(doc, {
    startY: 21,
    head: [
      [
        "Fecha",
        "Lado",
        "Entrada",
        "Salida",
        "Resultado (%)",
        "Resultado ($)",
        "Duración hrs",
      ],
    ],
    body: report.trades.map((trade) => {
      const resultPercent =
        report.initialBalance === 0
          ? 0
          : (trade.pl * 100) / report.initialBalance;

      return [
        trade.t0,
        trade.tipo,
        priceFormatter.format(trade.precio_entrada),
        priceFormatter.format(trade.precio_cierre),
        `${resultPercent.toFixed(2)}%`,
        moneyFormatter.format(trade.pl),
        trade.duracion_horas,
      ];
    }),
    theme: "plain",
    showHead: "everyPage",
    pageBreak: "auto",
    rowPageBreak: "avoid",
    margin: { top: 21, right: 12, bottom: 13, left: 12 },
    styles: {
      font: "helvetica",
      fontSize: 7.5,
      textColor: COLORS.text,
      fillColor: COLORS.surface,
      lineColor: COLORS.border,
      lineWidth: 0.1,
      cellPadding: 2.7,
      valign: "middle",
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [19, 31, 52],
      textColor: COLORS.text,
      fontStyle: "bold",
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: COLORS.surfaceAlt,
    },
    columnStyles: {
      0: { cellWidth: 47 },
      1: { cellWidth: 21, halign: "center" },
      2: { cellWidth: 35, halign: "right" },
      3: { cellWidth: 35, halign: "right" },
      4: { cellWidth: 37, halign: "right" },
      5: { cellWidth: 37, halign: "right" },
      6: { cellWidth: 37, halign: "right" },
    },
    didParseCell(data) {
      if (data.section !== "body") return; //Si se trata del encabezado o pie de página, no hacemos nada.

      const trade = report.trades[data.row.index];
      if (!trade || (data.column.index !== 4 && data.column.index !== 5)) {
        return;
      }

      data.cell.styles.textColor = trade.pl >= 0 ? COLORS.green : COLORS.red;
      data.cell.styles.fontStyle = "bold";
    },
    willDrawPage() {
      paintBackground();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.text);
      doc.text(`${report.title} - Historial completo de trades`, 12, 13);
    },
  });

  const totalPages = doc.getNumberOfPages();

  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.muted);
    doc.text(`Generado: ${generatedAt}`, 12, pageHeight - 6);
    doc.text(
      `Página ${page} de ${totalPages}`,
      pageWidth - 12,
      pageHeight - 6,
      {
        align: "right",
      },
    );
  }

  // const filename = safeFileName(report.title) || "reporte";
  // doc.save(`${filename}-desempeno.pdf`);

  const filename = `${safeFileName(report.title) || "reporte"}-performance.pdf`;

// En el navegador conservamos la descarga actual.
if (!isTauri()) {
  doc.save(filename);
  return true;
}

// Estos plugins solamente se cargan dentro de Tauri.
  const [{ save }, { writeFile }] = await Promise.all([
  import("@tauri-apps/plugin-dialog"),
  import("@tauri-apps/plugin-fs"),
]);

const path = await save({
  title: "Guardar reporte de trading window",
  defaultPath: filename,
  filters: [{ name: "Documento PDF", extensions: ["pdf"] }],
});

if (path === null) {
  console.info("Se canceló el guardado del reporte PDF. || null");
  return false;
}

await writeFile(path, new Uint8Array(doc.output("arraybuffer")));

return true;
}
