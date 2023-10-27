import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const getMascota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mascota = await MascotaModel.findOne({ _id: id }).exec();// acuerdate de lo del id, que como es de mongo hay que poner _id
        if (!mascota) {
          res.status(404).send("Ninguna mascota encontrada con ese id");
          return;
        }
        res.status(200).send({
            name: mascota.name,
            descripcion: mascota.descripcion,
            tipo: mascota.tipo,
            id: mascota._id.toString(),
        });
        } catch (error) {
        res.status(404).send(error.message);
        return;
        }
};

export default getMascota;
