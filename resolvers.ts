import { Collection, ObjectId} from "mongodb";
import {Vuelo , VueloModel} from "./type.ts";
import { fromModeltoVuelo } from "./utils.ts";



export const resolvers = {

    Query: {
        getFlights: async(
            _: unknown,
            args: {Origen?: string, Destino?: string},
            context : {VuelosCollection: Collection<VueloModel>},
            ): Promise<Vuelo[]> => {

                if(args.Origen && args.Destino){

                    const vueloscollection = await context.VuelosCollection.find({Origen: args.Origen , Destino: args.Destino}).toArray();
                    return vueloscollection.map((vueloscollection) => fromModeltoVuelo(vueloscollection));  
                }
                else if(args.Origen){
                    const vueloscollection = await context.VuelosCollection.find({Origen: args.Origen}).toArray();
                    return vueloscollection.map((vueloscollection) => fromModeltoVuelo(vueloscollection));
                }
                else if(args.Destino){
                    const vueloscollection = await context.VuelosCollection.find({Destino: args.Destino}).toArray();
                    return vueloscollection.map((vueloscollection) => fromModeltoVuelo(vueloscollection));
                }
                else{
                    const vueloscollection = await context.VuelosCollection.find({}).toArray();
                    return vueloscollection.map((vueloscollection) => fromModeltoVuelo(vueloscollection));
                }

            },
        getFlight: async(
            _: unknown,
            args: {id : string},
            context: {VuelosCollection: Collection<VueloModel>},
        ): Promise<Vuelo | null> => {
            const vueloscollection = await context.VuelosCollection.findOne({id: new ObjectId(args.id)});
            if(!vueloscollection){
                return null;
            }

            return fromModeltoVuelo(vueloscollection);
        },

    },

    Mutation:{
        addFlight: async(
            _:unknown,
            args: {Origen: string, Destino: string, FechaHora: string},
            context: {VuelosCollection: Collection<VueloModel>},
        ): Promise<Vuelo> => {

            const {Origen, Destino, FechaHora} = args;
            const {insertedId} = await context.VuelosCollection.insertOne({Origen, Destino, FechaHora});

            const vuelomodel = {
                id: insertedId,
                Origen,
                Destino,
                FechaHora
            };

            return fromModeltoVuelo(vuelomodel);
        },      

    },
};
