import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './imageGallery.module.css';

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

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  clickModal: PropTypes.func,
};
