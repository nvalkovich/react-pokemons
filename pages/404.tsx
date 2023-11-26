import styles from '../styles/404.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.numbers_container}>
        <span className={styles.number}>4</span>
        <Image
          src="./svg/pokeball.svg"
          alt="pokeball"
          width={100}
          height={100}
        ></Image>
        <span className={styles.number}>4</span>
      </div>
      <p>Page not found</p>
      <Link href="/" className={styles.link}>
        Main page
      </Link>
    </div>
  );
}
