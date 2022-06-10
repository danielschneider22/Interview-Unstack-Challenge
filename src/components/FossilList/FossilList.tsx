import { useState, useEffect } from "react"
import { API_URL } from "../../constants/API_URL"
import { MAX_ALLOWED_PRICE } from "../../constants/MAX_ALLOWED_PRICE"
import { IData } from "../../models/IData"
import { IFossil, IFossilContractToModel } from "../../models/IFossil/IFossil"
import { IFossilC } from "../../models/IFossil/IFossilC"
import FossilCard from "../FossilCard/FossilCard"

import styles from "./FossilList.module.css"

function FossilList() {
  const [fossils, setFossils] = useState<IData<IFossil>>({
    allIds: [],
    byId: {}
  })
  useEffect(() => {
    fetchFossils()
  }, [])

  async function fetchFossils() {
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
      setFossils({
        allIds: fossils.allIds,
        byId: fossils.byId
      })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <ul className={styles.FossilsList}>
          {fossils.allIds.map(id => {
            const fossil = fossils.byId[id]
            return (
              <FossilCard id={id} imageUri={fossil.imageUri} musuemPhrase={fossil.musuemPhrase} name={fossil.name} price={fossil.price} />
            )
          })
        }
        
        </ul>
      </header>
    </div>
  );
}

export default FossilList;
