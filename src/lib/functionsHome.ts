import type { PaginatedTrades, TradeRow } from "./types";
const API_URL = "http://localhost:3000/api";

export async function getTradesDetails(
    page: number = 1,
    perPage: number = 10
): Promise<PaginatedTrades> {
    const safePage = Number.isNaN(page) || page < 1 ? 1 : page;

  const response = await fetch(
    `${API_URL}?page=${safePage}&limit=${perPage}`
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los trades");
  }

  const data = await response.json();

  // ejemplo de respuesta esperada:
  // {
  //   trades: [...],
  //   total: 47,
  //   page: 1,
  //   perPage: 10
  // }

  return {
    trades: data.trades as TradeRow[],
    currentPage: data.page,
    totalPages: Math.ceil(data.total / data.perPage),
    total: data.total,
    perPage: data.perPage,
  };
}



