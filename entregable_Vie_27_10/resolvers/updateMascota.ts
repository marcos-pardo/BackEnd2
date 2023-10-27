import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const updateMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, descripcion, tipo } = req.body;
    if (!name || !descripcion || !tipo) {
        res.status(400).send("Name, descripcion y tipo son requeridos");
        return;
      }
  
      else if (tipo != "perros" && tipo != "gatos" && tipo != "serpientes") {
        res.status(400).send("En el tipo solo puede ser perros, gatos o serpientes");
        return;
      }
    const updatedMascota = await MascotaModel.findOneAndUpdate(
      { _id: id },
      { name, descripcion, tipo },
      { new: true }
    ).exec();

    if (!updatedMascota) {
      res.status(404).send("Mascota no encontrada");
      return;
    }

    res.status(200).send({
        name: updatedMascota.name,
        descripcion: updatedMascota.descripcion,
        tipo: updatedMascota.tipo,
        id: updatedMascota._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMascota;