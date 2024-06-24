import Modal from 'react-modal';
// import css from './ModalWrapper.module.css';

export const modalWrapper = (WrappedComponent) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      outline: 'transparent',
      borderRadius: '20px',
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(11, 11, 11, 0.6)',
      overflow: 'hidden',
    },
  };
  return function ModalWrapper(props) {
    Modal.setAppElement('#root');

    return (
      <div>
        <WrappedComponent />
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.isClose}
          style={customStyles}
        >
          {props.children}
        </Modal>
      </div>
    );
  };
};

const WrappedComponent = ({ children }) => {
  return <>{children}</>;
};

const ComponentWithModal = modalWrapper(WrappedComponent);

export default ComponentWithModal;
