import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <nav className={css.navbar}>
        <NavLink className={css.nanny_link} to="/">
          Nanny.Services
        </NavLink>
        <ul className={css.nav_menu}>
          <li className={css.li_home}>
            <NavLink className={css.link_item} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={css.link_item} to="/nannies">
              Nannies
            </NavLink>
          </li>
          <li className={css.login_li}>
            <button className={css.login_btn} aria-controls="loginModal">
              Login
            </button>
          </li>
          <li>
            <button
              className={css.register_btn}
              aria-controls="registrationModal"
            >
              Registration
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
