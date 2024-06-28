import { useDispatch, useSelector } from 'react-redux';
import css from './BurgerMenu.module.css';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { logOut } from '../../../redux/auth/operations';

const BurgerMenu = ({ isOpen, menuRef, openModal, closeMenu }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  return (
    <div ref={menuRef} className={`${css.wrap} ${isOpen ? css.active : ''}`}>
      <ul className={css.menu_wrapper}>
        <li className={css.li_home}>
          <NavLink className={css.link_item} to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={css.link_item} to="/nannies" onClick={closeMenu}>
            Nannies
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              className={css.link_item}
              to="/favorites"
              onClick={closeMenu}
            >
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
          <button
            onClick={() => {
              dispatch(logOut());
              closeMenu();
            }}
            className={css.btn}
          >
            Logout
          </button>
        )}
      </ul>
    </div>
  );
};

export default BurgerMenu;
