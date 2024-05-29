import Container from '../../components/Container/Container';
import css from './Home.module.css';

const Home = () => {
  return (
    <Container>
      <div className={css.wrapper_bg}>
        <div className={css.bg_red}></div>
        <div className={css.bg_img}></div>
      </div>
    </Container>
  );
};

export default Home;
