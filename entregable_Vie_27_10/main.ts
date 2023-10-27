import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import addMascota from "./resolvers/addMascota.ts";
import getMascotas from "./resolvers/getMascotas.ts";
import getMascota from "./resolvers/getMascota.ts"; 
import updateMascota from "./resolvers/updateMascota.ts";
import deleteMascota from "./resolvers/deleteMascota.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();


const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("Debes especificar la variable de entorno MONGO_URL");
  Deno.exit(1);
}

//await mongoose.connect("mongodb+srv://mpz3105:12345@cluster-backendnebrija.885pvfw.mongodb.net/clase3?retryWrites=true&w=majority");

try {
  await mongoose.connect(MONGO_URL);
  console.log("Conectado a la base de datos");
  const app = express();
app.use(express.json());
app
.get("/api/mascotas", getMascotas)
.get("/api/mascotas/:id", getMascota)
.post("/api/mascotas", addMascota)
.put("/api/mascotas/:id", updateMascota)
.delete("/api/mascotas/:id", deleteMascota);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
  

}
catch (error) {
  console.log(error);
}







