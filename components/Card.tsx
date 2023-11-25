import { CardData } from '../types/interfaces';
import Image from 'next/image';
import styles from '../styles/Card.module.css';
import { useRouter } from 'next/router';

type CardProps = {
  data: CardData;
};

export default function Card({ data }: CardProps) {
  const router = useRouter();

  const onCardClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, details: data.id },
    });
  };

  return (
    <div className={styles.card} onClick={onCardClick}>
      <p className={styles.title}>{data.name}</p>
      <Image
        src={data.images.small}
        alt={data.name}
        width={260}
        height={340}
      ></Image>
      <ul className={styles.details_list}>
        <li className={styles.list_item}>Level: {data.level || 'Unknown'}</li>
        <li className={styles.list_item}>Rarity: {data.rarity || 'Unknown'}</li>
      </ul>
    </div>
  );
}
