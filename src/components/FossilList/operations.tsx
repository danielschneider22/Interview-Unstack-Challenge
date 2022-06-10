import { API_URL } from "../../constants/API_URL"
import { MAX_ALLOWED_PRICE } from "../../constants/MAX_ALLOWED_PRICE"
import { IData } from "../../models/IData"
import { IFossil, IFossilContractToModel } from "../../models/IFossil/IFossil"
import { IFossilC } from "../../models/IFossil/IFossilC"

export async function fetchFossils() {
  try {
    const resp = await fetch(API_URL)
    const result: {[id: string]: IFossilC} = await resp.json()
    const idsFossilContracts = Object.keys(result)
    const fossils: IData<IFossil> = {
      allIds: [],
      byId: {}
    }
    idsFossilContracts.forEach(id => {
      const fossilContract = result[id]
      if (fossilContract.price < MAX_ALLOWED_PRICE) {
        fossils.byId[id] = IFossilContractToModel(id, fossilContract)
        fossils.allIds.push(id)
      }        
    })
    return fossils
  } catch (error) {
    alert(error)
  }
}