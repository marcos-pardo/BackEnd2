import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const addMascota = async (req: Request, res: Response) => {
  try {
    const { name, descripcion, tipo } = req.body;
    if (!name || !descripcion || !tipo) {
      res.status(400).send("name, descripcion y tipo son requeridos");
      return;
    }

    else if (tipo != "perros" && tipo != "gatos" && tipo != "serpientes") {
      res.status(400).send("En el tipo solo puede ser perros, gatos o serpientes");
      return;
    }


    const newMascota = new MascotaModel({ name, descripcion, tipo });
    await newMascota.save();

    res.status(200).send({
      name:newMascota.name,
      age: newMascota.descripcion,
      dni: newMascota.tipo,
      id: newMascota._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMascota;
