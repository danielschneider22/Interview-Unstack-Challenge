import { IFossilC } from "./IFossilC";

export interface IFossil {
  fileName: string
  imageUri: string, // url
  id: string
  musuemPhrase: string // description of fossil
  name: string
  partOf: string
  price: number
}

export function IFossilContractToModel(id: string, contract: IFossilC): IFossil {
  return { 
    fileName: contract['file-name'],
    imageUri: contract['image_uri'],
    name: contract.name['name-USen'], // only need U.S. English for this code challenge
    id,
    musuemPhrase: contract['museum-phrase'],
    partOf: contract['part-of'],
    price: contract.price
  }
}
