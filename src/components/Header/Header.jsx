import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import { useState, useRef, useEffect } from 'react';
import FormModal from '../../components/FormModal/FormModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { icons } from '../../assets';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const menuRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeBtn, setTypeBtn] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = (e) => {
    const { current } = menuRef;
    if ((current && !current.contains(e.target)) || e.target.matches('a')) {
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
    setModalIsOpen(true);
    setIsOpen(false);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  };
  const logoutHandler = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.wrap_header}>
      <header className={css.header}>
        <FormModal type={typeBtn} isOpen={modalIsOpen} isClose={closeModal} />
        <nav className={css.navbar}>
          <NavLink className={css.nanny_link} to="/">
            Nanny.Services
          </NavLink>
          <svg
            onClick={handleBurgerMenu}
            width={24}
            height={24}
            className={css.svg_burger}
          >
            <use href={`${icons}#icon-burger`}></use>
          </svg>
          <BurgerMenu menuRef={menuRef} openModal={openModal} isOpen={isOpen} />
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
              <button
                onClick={openModal}
                className={css.login_btn}
                aria-controls="loginModal"
              >
                {userName ? userName : 'Login'}
              </button>
            </li>
            <li>
              {userName ? (
                <button onClick={logoutHandler} className={css.logout_btn}>
                  Logout
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className={css.register_btn}
                  aria-controls="registrationModal"
                >
                  Registration
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
