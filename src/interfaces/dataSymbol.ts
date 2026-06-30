import  {Timeframe} from "../../src/enums/timeframe";
import { DataFormatSymbol } from '../enums/dataFormatSymbol';


export interface DataSymbol {
    id: number;
    name: string;
    timeframe?: Timeframe;
    ruta: string;
    formato?: DataFormatSymbol;
    fecha_inicio: string;
    fecha_fin: string;
    actualizado: boolean;
    n_data: number;
    origen: string;
}