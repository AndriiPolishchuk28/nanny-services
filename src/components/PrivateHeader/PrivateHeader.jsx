import { NavLink } from 'react-router-dom';
import css from './PrivateHeader.module.css';
import { icons } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserName } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { clearFavorites } from '../../redux/nannies/nannySlice';
import FormModal from '../FormModal/FormModal';
import { useEffect, useRef, useState } from 'react';
import BurgerMenu from '../Header/BurgerMenu/BurgerMenu';

const PrivateHeader = () => {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [typeBtn, setTypeBtn] = useState(null);

  const handleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = (e) => {
    const { current } = menuRef;
    if (current && !current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleCloseMenu);
    } else {
      document.removeEventListener('mousedown', handleCloseMenu);
    }
    return () => {
      document.removeEventListener('mousedown', handleCloseMenu);
    };
  }, [isOpen]);

  const openModal = (event) => {
    setTypeBtn(event.target.innerText);
    setModalOpen(true);
    setIsOpen(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handlerLogOut = () => {
    dispatch(logOut());
    dispatch(clearFavorites());
  };
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <svg
          onClick={handleBurgerMenu}
          width={24}
          height={24}
          className={css.svg_burger}
        >
          <use href={`${icons}#icon-burger`}></use>
        </svg>
        <BurgerMenu
          menuRef={menuRef}
          openModal={openModal}
          isOpen={isOpen}
          closeMenu={handleBurgerMenu}
        />
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
          {isLoggedIn && (
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
          )}
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
            <>
              <button
                type="button"
                onClick={openModal}
                className={css.btn_logout}
              >
                Login
              </button>
              <button
                type="button"
                onClick={openModal}
                className={css.btn_logout}
              >
                Registration
              </button>
            </>
          )}

          <FormModal
            type={typeBtn}
            isOpen={modalOpen}
            isClose={closeModal}
            closeMenu={handleBurgerMenu}
          />
        </div>
      </nav>
    </header>
  );
};

export default PrivateHeader;
