import { NavLink } from 'react-router-dom';
import css from './PrivateHeader.module.css';
import { icons } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';

const PrivateHeader = () => {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
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

          <button onClick={() => dispatch(logOut())} className={css.btn_logout}>
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default PrivateHeader;
