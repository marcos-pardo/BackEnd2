import mongoose from "npm:mongoose@7.6.3";
import { Mascota } from "../types.ts";

const Schema = mongoose.Schema;

const MascotaSchema = new Schema(
  {
    name: { type: String, required: true },
    descripcion: { type: String, required: true},
    tipo: { type: String, required: true },
  },
  { timestamps: true }
);

export type MascotaModelType = mongoose.Document & Omit<Mascota, "id">;

export default mongoose.model<MascotaModelType>("Mascota", MascotaSchema);