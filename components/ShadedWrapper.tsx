import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styles from '../styles/ShadedWrapper.module.css';

interface LayoutProps {
  children?: ReactNode;
}

export default function ShadedWrapper({ children }: LayoutProps) {
  const router = useRouter();

  const removeShadedWrapper = () => {
    const { pathname, query } = router;
    delete router.query.details;
    router.replace({ pathname, query }, undefined);
  };

  return (
    <>
      <div className={styles.shaded_wrapper} onClick={removeShadedWrapper}>
        {children}
      </div>
    </>
  );
}
