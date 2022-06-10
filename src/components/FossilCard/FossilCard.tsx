import { capitalizeFirstLetter } from './utils';
import styles from './FossilCard.module.css';

interface Props {
  id: string,
  imageUri: string
  musuemPhrase: string
  name: string
  price: number
}

function FossilCard(props: Props) {

  return (
    <li key={props.id} className={styles.FossilCard}>
      <section className={styles.ImageSection}>
        <img alt={props.id} className={styles.Image} src={props.imageUri} />
      </section>

      <section className={styles.TextSection}>
        <header>
          <h3 className={styles.Name}>{capitalizeFirstLetter(props.id)}</h3>
        </header>
        
        <p className={styles.MusuemPhrase}>{props.musuemPhrase}</p>
        
        <footer>
          <h4 className={styles.Price}>${props.price}</h4>
        </footer>
      </section>
    </li>
  );
}

export default FossilCard;
