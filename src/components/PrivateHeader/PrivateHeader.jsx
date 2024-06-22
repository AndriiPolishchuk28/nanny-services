import { NavLink } from 'react-router-dom';
import css from './PrivateHeader.module.css';
import { icons } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserName } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { clearFavorites } from '../../redux/nannies/nannySlice';
import FormModal from '../FormModal/FormModal';
import { useState } from 'react';

const PrivateHeader = () => {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [modalOpen, setModalOpen] = useState(false);

  const handlerLogOut = () => {
    dispatch(logOut());
    dispatch(clearFavorites());
  };
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink className={css.link_nanny} to="/">
          Nanny.Services
        </NavLink>
        <ul className={css.menu_wrapper}>
          <li className={css.li_item}>
            <NavLink
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.activeLink : ''}`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className={css.li_item}>
            <NavLink
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.activeLink : ''}`
              }
              to="/nannies"
            >
              Nannies
            </NavLink>
          </li>
          <li className={css.li_item}>
            <NavLink
              className={({ isActive }) =>
                `${css.link} ${isActive ? css.activeLink : ''}`
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          </li>
        </ul>
        <div className={css.btn_wrapper}>
          {userName && (
            <div className={css.user_info_wrapper}>
              <div className={css.bg_icon}>
                <svg width={24} height={24} className={css.svg_user}>
                  <use href={`${icons}#icon-user`}></use>
                </svg>
              </div>
              <p className={css.user_name}>{userName}</p>
            </div>
          )}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handlerLogOut}
              className={css.btn_logout}
            >
              Log out
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={css.btn_logout}
            >
              Login
            </button>
          )}

          <FormModal
            type="Login"
            isOpen={modalOpen}
            isClose={() => setModalOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
};

export default PrivateHeader;
