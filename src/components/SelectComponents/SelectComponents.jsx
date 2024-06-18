import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { setFilter } from '../../redux/nannies/nannySlice';
import css from './SelectComponents.module.css';

const options = [
  { value: 'ascName', label: 'A to Z' },
  { value: 'descName', label: 'Z to A' },
  { value: 'cheaper10', label: 'Less than 10$' },
  { value: 'greater10', label: 'Greater than 10$' },
  { value: 'popular', label: 'Popular' },
  { value: 'notpopular', label: 'Not popular' },
  { value: 'all', label: 'Show all' },
];

const SelectComponents = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '226px',
      backgroundColor: 'var(--primary-color-red)',
      border: 'none',
      borderRadius: '14px',
      boxShadow: 'none',
      padding: '10px',
      '&:hover': {
        borderColor: '#aaa',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--primary-color-white)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--primary-color-white)',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected
        ? 'var(--primary-color-black)'
        : 'var(--primary-color-grey)',
      padding: '10px',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'none',
        color: 'var(--primary-color-black)',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '0',
      color: 'var(--primary-color-white)',
    }),
    indicatorContainer: (provided) => ({
      ...provided,
      '&:hover': {
        color: 'var(--primary-color-dark-grey)',
      },
    }),

    menu: (provided) => ({
      ...provided,
      borderRadius: '14px',
      boxShadow: ' 0 20px 69px 0 rgba(0, 0, 0, 0.07);',
      backgroundColor: '#fff',
      width: '226px',
    }),
  };

  useEffect(() => {
    dispatch(setFilter(selectedOption));
  }, [selectedOption, dispatch]);

  return (
    <div className={css.select_wrapper}>
      <p className={css.filters_title}>Filters</p>
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
};

export default SelectComponents;
