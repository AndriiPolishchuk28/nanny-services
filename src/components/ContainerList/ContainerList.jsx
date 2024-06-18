import css from './ContainerList.module.css';

const ContainerList = ({ children }) => {
  return <div className={css.wrapper}>{children}</div>;
};

export default ContainerList;
