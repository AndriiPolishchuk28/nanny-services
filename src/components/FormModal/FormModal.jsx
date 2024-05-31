import ComponentWithModal from '../ModalWrapper/ModalWrapper';
import css from './FormModal.module.css';

const FormModal = ({ isOpen, isClose }) => {
  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.modal_wrapper}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, at?
          Rerum, sit quis veniam sint eligendi quibusdam excepturi in minima!
        </p>
      </div>
    </ComponentWithModal>
  );
};

export default FormModal;
