import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimePicker = ({ field, form, ...props }) => {
  const { setFieldValue } = form;

  return (
    <DatePicker
      {...field}
      {...props}
      selected={field.value}
      onChange={(val) => setFieldValue(field.name, val)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={30}
      timeCaption="Meeting time"
      dateFormat="HH : mm"
      timeFormat="HH : mm"
      placeholderText="Select a time"
    />
  );
};

export default TimePicker;
