import  {Timeframe} from "../../src/enums/timeframe";
import { DataFormatSymbol } from '../enums/dataFormatSymbol';


export interface DataSymbol {
    id: number;
    name: String;
    timeframe?: Timeframe;
    ruta: String;
    formato?: DataFormatSymbol;
    fecha_inicio: String;
    fecha_fin: String;
    actualizado: boolean;
    n_data: number;
    origen: String;
}