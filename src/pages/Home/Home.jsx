import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import css from './Home.module.css';
import { NavLink } from 'react-router-dom';
import { icons } from '../../assets';
import useWindowSize from '../../hooks/hooks';

const Home = () => {
  const { width } = useWindowSize();
  return (
    <Container>
      <div className={css.wrap_overflow}>
        <Header />
        <div className={css.wrapper_bg}>
          {width > 1439 && (
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
          )}
          <div className={css.bg_img}>
            {width <= 1440 && (
              <div>
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
            )}

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
      </div>
    </Container>
  );
};

export default Home;
