import { useState, useEffect } from "react"
import { IData } from "../../models/IData"
import { IFossil } from "../../models/IFossil/IFossil"
import FossilCard from "../FossilCard/FossilCard"

import styles from "./FossilList.module.css"
import { fetchFossils } from "./operations"

function FossilList() {
  const [fossils, setFossils] = useState<IData<IFossil>>({
    allIds: [],
    byId: {}
  })
  useEffect(() => {
    doFetch()
  }, [])

  async function doFetch() {
    const fossils = await fetchFossils()
    if(!fossils) return;
    setFossils({
      allIds: fossils.allIds,
      byId: fossils.byId
    })
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
