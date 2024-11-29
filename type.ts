import { OptionalId } from 'mongodb';


export type VueloModel = OptionalId<{
    Origen: string,
    Destino: string,
    FechaHora: string
}>;



export type Vuelo = {
    id: string,
    Origen: string,
    Destino: string,
    FechaHora: string
};  