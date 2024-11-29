/*
Se pide crear una API GraphQL con persistencia de datos en Mongo para gestionar los vuelos de una compañía aerea.



Los vuelos tienes tres campos:

Origen
Destino
Fecha y hora, por ej. "22/11/23 12:45"
Los tres datos son una cadena de texto.



Las queries y mutaciones que debe ofrecer la API son.



getFlights, tiene los argumentos opcionales origen y destino. Si ambos argumentos están presentes devuelve todos los vuelos con dicho origen y destino, si solo un argumento está presente, por ejemplo el origen, devuelve todos los vuelos con ese origen, si ningún argumento está presente devuelve todos los vuelos (incluyendo sus ids).
getFlight, recibe como argumento obligatorio el id del vuelo, devuelve el vuelo con dicho id, y si no existe devuelve null.
addFlight, recibe como argumentos obligatorios el origen, destino y fecha-hora. Devuelve los datos del vuelo (incluyendo su id)


*/

import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { VueloModel } from "./type.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";


const Mongo_url = Deno.env.get("MONGO_URL");

if(!Mongo_url){
  throw  new Error("La conexión a la base de datos no está definida");
}


const Mongo_client = new MongoClient(Mongo_url);
await Mongo_client.connect();


console.info("Conexión a la base de datos establecida");

const mongodb = Mongo_client.db("Vuelos");
const VuelosCollection = mongodb.collection<VueloModel>("Vuelos");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ VuelosCollection }),
});

console.info(`Server ready at ${url}`);


