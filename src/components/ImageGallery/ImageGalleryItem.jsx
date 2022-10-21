import css from './imageGallery.module.css';

export const ImageGalleryItem = ({ img, tags, clickModal, imgModal }) => {
  return (
    <li onClick={clickModal}>
      <img
        src={img}
        alt={tags}
        className={css.ImageGalleryItem_image}
        data-src={imgModal}
      />
    </li>
  );
};
