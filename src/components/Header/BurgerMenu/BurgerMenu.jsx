import css from './BurgerMenu.module.css';
import { NavLink } from 'react-router-dom';

const BurgerMenu = ({ isOpen, menuRef, openModal }) => {
  return (
    <div ref={menuRef} className={`${css.wrap} ${isOpen ? css.active : ''}`}>
      <ul className={css.menu_wrapper}>
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
      </ul>
      <ul className={css.btn_wrapper}>
        <li>
          <button onClick={openModal} className={css.btn}>
            Login
          </button>
        </li>
        <li>
          <button onClick={openModal} className={css.btn}>
            Registration
          </button>
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
