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

export interface Tradess { //Trade para TradesList
  id: number;
  date: string;
  side: TradeSide;
  entryPrice: number;
  exitPrice: number;
  resultPercentage: number;
  resultAmount: number;
  duration: string;
}