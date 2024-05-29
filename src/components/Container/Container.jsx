import css from './Container.module.css';

const Container = ({ children }) => {
  return <div className={css.wrapper}>{children}</div>;
};

export default Container;
