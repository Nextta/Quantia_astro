export type TradeSide = "LONG" | "SHORT";

export interface TradeRow {
  id: number;
  fecha: string;
  pl: number;
}

export interface PaginatedTrades {
  trades: TradeRow[];
  currentPage: number;
  totalPages: number;
  total: number;
  perPage: number;
}