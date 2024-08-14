import React from 'react';
import styles from './styles.module.css';

interface ImagProps {
  image: string | null;
}

const defaultImage = 'https://avatars.mds.yandex.net/i?id=44530653a3d5eb9eac3a0b7d9730976d_l-5025855-images-thumbs&n=13';
const Imag: React.FC<ImagProps> = ({ image }) => {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <div className={styles.wrapper}>
      {image ? (
        <img
          src={image}
          alt="news"
          className={styles.image}
          onError={handleError}
        />
      ) : (
        <img
          src={defaultImage}
          alt="default news"
          className={styles.image}
        />
      )}
    </div>
  );
};

export default Imag;