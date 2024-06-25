import ComponentWithModal from '../ModalWrapper/ModalWrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './Appointment.module.css';
import { icons } from '../../assets';
import clsx from 'clsx';
import TimePicker from './TimePicker/TimePicker';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone is required'),
  age: Yup.number().required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  parentsName: Yup.string().required('Name is required'),
  comment: Yup.string().required('Comment is required'),
  time: Yup.date().required('Time is required'), // Оновлено для перевірки часу
});

const initialValues = {
  address: '',
  phone: '',
  age: '',
  email: '',
  parentsName: '',
  comment: '',
  time: null,
};

const Appointment = ({ isOpen, isClose, name, avatar }) => {
  return (
    <ComponentWithModal isOpen={isOpen} isClose={isClose}>
      <div className={css.modal_wrapper}>
        <button onClick={isClose} className={css.btn_close}>
          <svg width={20} height={20} className={css.close}>
            <use href={`${icons}#icon-close`}></use>
          </svg>
        </button>
        <h3 className={css.title_text}>
          Make an appointment with a babysitter
        </h3>
        <p className={css.subtitle_text}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
        <div className={css.wrapper_info}>
          <img className={css.avatar} src={avatar} alt="avatar" />
          <div className={css.wrapper_name}>
            <p className={css.title_name}>Your nanny</p>
            <p className={css.subtitle_name}>{name}</p>
          </div>
        </div>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={css.groups_input}>
                <div className={css.input_wrapper}>
                  <label htmlFor="address"></label>
                  <Field
                    className={css.input}
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div className={css.input_wrapper}>
                  <label htmlFor="phone"></label>
                  <Field
                    className={css.input}
                    type="tel"
                    name="phone"
                    placeholder="+380"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div className={css.input_wrapper}>
                  <label htmlFor="age"></label>
                  <Field
                    className={css.input}
                    type="number"
                    name="age"
                    placeholder="Child's age"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div className="time_picker">
                  <Field
                    className={css.input}
                    name="time"
                    component={TimePicker}
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className={css.error}
                  />
                </div>
              </div>
              <div className={css.input_wrapper}>
                <label htmlFor="email"></label>
                <Field
                  className={clsx(css.input, css.long_input)}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.input_wrapper}>
                <label htmlFor="parentsName"></label>
                <Field
                  className={clsx(css.input, css.long_input)}
                  type="text"
                  name="parentsName"
                  placeholder="Father's or mother's name"
                />
                <ErrorMessage
                  name="parentsName"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.input_wrapper}>
                <label htmlFor="comment"></label>
                <Field
                  as="textarea"
                  className={clsx(css.input, css.long_input, css.textarea)}
                  name="comment"
                  placeholder="Comment"
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={css.error}
                />
              </div>
              <button
                type="submit"
                className={css.btn_send}
                disabled={isSubmitting}
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </ComponentWithModal>
  );
};

export default Appointment;
