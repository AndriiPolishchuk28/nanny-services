import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import css from './Home.module.css';
import { NavLink } from 'react-router-dom';
import { icons } from '../../assets';

const Home = () => {
  return (
    <Container>
      <Header />
      <div className={css.wrapper_bg}>
        <div className={css.bg_red}>
          <h1 className={css.title}>Make Life Easier for the Family:</h1>
          <p className={css.subtitle}>
            Find Babysitters Online for All Occasions
          </p>

          <NavLink to="/nannies" className={css.get_started}>
            Get started
            <svg className={css.arrow}>
              <use href={`${icons}#icon-arrow`}></use>
            </svg>
          </NavLink>
        </div>
        <div className={css.bg_img}>
          <div className={css.wrapper_box}>
            <div className={css.svg_wrapper}>
              <svg className={css.check}>
                <use href={`${icons}#icon-check`}></use>
              </svg>
            </div>
            <div className={css.text_wrapper}>
              <p className={css.text_nannies}>Experienced nannies</p>
              <p className={css.text_quantity}>15,000</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
