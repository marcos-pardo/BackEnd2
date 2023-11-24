import { Pet } from "../types.ts";
import { GraphQLError } from "graphql";
import MascotaModel from "../db/mascota.ts";


export const Query = {
    pets : async (_:unknown, args:{breed?: string}): Promise<Array<Pet>> => {

      const {breed} = args;
      // Si no se especifica la raza, se devuelven todas las mascotas, y si se especifica, solo las de esa raza
      const mascotas = await MascotaModel.find(breed ? {breed} : {});
      return mascotas.map((mascota) => {
        return {
          id: mascota._id.toString(),
          name: mascota.name,
          breed: mascota.breed,
    }
  })
    },



    pet : async (_:unknown, args:{id: string}): Promise<Pet> => {
      const {id} = args;
      const mascota = await MascotaModel.findOne({_id:id});
      if(!mascota){
        throw new GraphQLError("No existe mascota con ese id");
      }
      return {
        id: mascota._id.toString(),
        name: mascota.name,
        breed: mascota.breed,
      }

  }
};
