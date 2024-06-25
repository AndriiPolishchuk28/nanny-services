import { useSelector } from 'react-redux';
import css from './BurgerMenu.module.css';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

const BurgerMenu = ({ isOpen, menuRef, openModal }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
        {isLoggedIn && (
          <li>
            <NavLink className={css.link_item} to="/favorites">
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
      <ul className={css.btn_wrapper}>
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <button onClick={openModal} className={css.btn}>
            Logout
          </button>
        )}
      </ul>
    </div>
  );
};

export default BurgerMenu;
