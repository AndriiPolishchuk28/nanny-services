import NanniestList from '../../components/NanniesList/NanniestList';
import ContainerList from '../../components/ContainerList/ContainerList';
import css from './Nannies.module.css';

const Nannies = () => {
  return (
    <div className={css.container}>
      <ContainerList>
        <NanniestList />
      </ContainerList>
    </div>
  );
};

export default Nannies;
