import Image from 'next/image';
import styles from '../styles/Details.module.css';

import { CardData } from '@/types/interfaces';
import { useRouter } from 'next/router';

type DetailsProps = {
  card: CardData;
};

export default function Details({ card }: DetailsProps) {
  const router = useRouter();

  const onCloseClick = () => {
    const { pathname, query } = router;
    delete router.query.details;
    router.replace({ pathname, query }, undefined);
  };

  return (
    <div className="details-section">
      <div data-testid="details">
        <>
          <div className={styles.container}>
            {card ? (
              <div className={styles.details_container}>
                <button
                  data-testid="close-btn"
                  className="btn btn_close"
                  onClick={onCloseClick}
                >
                  Close
                </button>
                <h1 className={styles.name}>{card.name}</h1>
                <ul className={styles.details_list}>
                  <li>
                    <span className={styles.category}>Supertype: </span>
                    {card.supertype}
                  </li>
                  <li>
                    <span className={styles.category}>Subtypes: </span>{' '}
                    {card.subtypes?.join(', ')}
                  </li>
                  {card.types && (
                    <li>
                      <span className={styles.category}>Types: </span>{' '}
                      {card.types?.join(', ')}
                    </li>
                  )}
                  {card.level && (
                    <li>
                      <span className={styles.category}>Level: </span>{' '}
                      {card.level}
                    </li>
                  )}
                  {card.hp && (
                    <li>
                      <span className={styles.category}>HP: </span> {card.hp}
                    </li>
                  )}
                  {card.abilities && (
                    <li>
                      <span className={styles.category}>Abilities: </span>
                      {card.abilities
                        ?.map((ability) => ability.name)
                        .join(', ')}
                    </li>
                  )}
                  {card.attacks && (
                    <li>
                      <span className={styles.category}>Attacks: </span>
                      {card.attacks?.map((attack) => attack.name).join(', ')}
                    </li>
                  )}
                  {card.rarity && (
                    <li>
                      <span className={styles.category}>Rarity: </span>{' '}
                      {card.rarity}
                    </li>
                  )}
                </ul>
                <Image
                  className={styles.image}
                  src={card.images?.small}
                  alt={card.name}
                  width={200}
                  height={400}
                ></Image>
                {card.flavorText && (
                  <p className={styles.description}>{card.flavorText}</p>
                )}
              </div>
            ) : (
              <div>Not found</div>
            )}
          </div>
        </>
      </div>
    </div>
  );
}
