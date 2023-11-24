
import { Pet } from "../types.ts";
import { GraphQLError } from "graphql";
import MascotaModel from "../db/mascota.ts";

export const Mutation= {
  addPet: async(_: unknown, args: { name: string; breed: string }) : Promise<Pet> => {
    const { name, breed } = args;
    const mascota = await MascotaModel.create({ name, breed });
    return {
      id: mascota._id.toString(),
      name: mascota.name,
      breed: mascota.breed,
    };
  },

  deletePet: async(_: unknown, args: { id: string }) : Promise<Pet> => {
    const { id } = args;
    const mascota = await MascotaModel.findOneAndDelete({_id:id});
    if(!mascota){
      throw new GraphQLError("No existe mascota con ese id");
    }
    return {
      id: mascota._id.toString(),
      name: mascota.name,
      breed: mascota.breed,
    };

  },
  updatePet: async(_: unknown, args: { id: string; name: string; breed: string }) : Promise<Pet> => {
    const { id, name, breed } = args;
    const mascota = await MascotaModel.findOneAndUpdate({_id:id},{name, breed});
    if(!mascota){
      throw new GraphQLError("No existe mascota con ese id");
    }
    return {
      id: mascota._id.toString(),
      name: mascota.name,
      breed: mascota.breed,
    };
  }
};