import { ImageGalleryItem } from './ImageGalleryItem';

import css from './imageGallery.module.css';
console.log(css);
export const ImageGallery = ({ data, clickModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {data.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            img={webformatURL}
            alt={tags}
            imgModal={largeImageURL}
            clickModal={clickModal}
          />
        );
      })}
    </ul>
  );
};
