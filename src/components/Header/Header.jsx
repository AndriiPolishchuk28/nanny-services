import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import { useState } from 'react';
import FormModal from '../../components/FormModal/FormModal';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [typeBtn, setTypeBtn] = useState(null);

  const openModal = (event) => {
    setTypeBtn(event.target.innerText);
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  };
  return (
    <header className={css.header}>
      <FormModal type={typeBtn} isOpen={modalIsOpen} isClose={closeModal} />
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
            <button
              onClick={openModal}
              className={css.login_btn}
              aria-controls="loginModal"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={openModal}
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
