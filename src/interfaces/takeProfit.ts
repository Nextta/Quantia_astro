export interface TakeProfit {
    tipo: String;       // Tipo de limite: ask; bid; bb; atr... etc
    nombre_col: String; // Nombre de la columna a usar como limite
    shift: number;       // Numero de filas a desplazar
    valor: number;         // en caso de ser por pip; ticks o puntos
}