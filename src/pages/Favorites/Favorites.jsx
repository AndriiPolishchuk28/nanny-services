import ContainerList from '../../components/ContainerList/ContainerList';
import NanniestList from '../../components/NanniesList/NanniestList';
import css from './Favorites.module.css';

const Favorites = () => {
  return (
    <div className={css.container}>
      <ContainerList>
        <NanniestList />
      </ContainerList>
    </div>
  );
};

export default Favorites;
