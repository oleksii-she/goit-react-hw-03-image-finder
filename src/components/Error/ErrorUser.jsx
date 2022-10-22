import css from './ErrorUser.module.css';

export const ErrorUser = () => {
  return (
    <div className={css.error_box}>
      <h2 className={css.error_title}>
        Sorry, we are currently undergoing technical work, try to reload the
        page or use our service later. Thank you for being with us!
      </h2>
      <img
        className={css.error_img}
        src="https://www.meme-arsenal.com/memes/191b81386903584b217930086be4c4a0.jpg"
        alt="error"
      />
    </div>
  );
};
