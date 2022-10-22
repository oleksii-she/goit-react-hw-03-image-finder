import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = ({ visible }) => {
  return (
    <div className={css.loader_box}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={visible}
      />
    </div>
  );
};
