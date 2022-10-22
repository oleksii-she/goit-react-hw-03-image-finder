import css from './button.module.css';

export const Button = ({ loadMore }) => {
  return (
    <button className={css.btn_loadMore} type="button" onClick={loadMore}>
      Load more
    </button>
  );
};
