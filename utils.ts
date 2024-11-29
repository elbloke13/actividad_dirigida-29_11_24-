import{ Vuelo , VueloModel} from "./type.ts";


export const fromModeltoVuelo = (vuelomodel : VueloModel): Vuelo => {
    return {
        id : vuelomodel._id!.toString(),
        Origen: vuelomodel.Origen,
        Destino: vuelomodel.Destino,
        FechaHora: vuelomodel.FechaHora
    };
}; 