import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./schema.ts";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const resolvers = {
  Query,
  Mutation
};

try {
  const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

  if(!MONGO_URL){
    console.log("No se ha encontrado la variable de entorno MONGO_URL");  
    Deno.exit(1);
  }

  await mongoose.connect(MONGO_URL)
  console.log("Conectado a MongoDB");


const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {listen: { port: 4000 }}); // Se pone el puerto 3000

console.log(`🛸 Server ready at ${url}`);
}
catch(error){
  console.log(error);

}
