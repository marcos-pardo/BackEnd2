import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const getMascota = async (req: Request, res: Response) => {
    try {
        const todasMascotas = await MascotaModel.find().exec();
        if (!todasMascotas) {
          res.status(404).send("Person not found");
          return;
        }
        res.status(200).send({
            mascotas: todasMascotas.map((mascota) => ({
                name: mascota.name,
                descripcion: mascota.descripcion,
                tipo: mascota.tipo,
                id: mascota._id.toString(),
            })),
        });
      } catch (error) {
        res.status(404).send(error.message);
        return;
      }
};

export default getMascota;