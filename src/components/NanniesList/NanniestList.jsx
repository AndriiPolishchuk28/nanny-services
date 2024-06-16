import NanniesItem from './NanniesItem/NanniesItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getListOfNannies } from '../../redux/nannies/operations';
import {
  selectLastKey,
  selectNannies,
  selectPage,
} from '../../redux/nannies/selectors';
import css from './NanniesList.module.css';
import { resetNannies } from '../../redux/nannies/nannySlice';

const NanniestList = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const lastKey = useSelector(selectLastKey);
  const pageSize = useSelector(selectPage);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    dispatch(getListOfNannies({ lastKey: null, pageSize, selectedOption }));
  }, [dispatch, pageSize, selectedOption]);

  useEffect(() => {
    return () => {
      dispatch(resetNannies());
    };
  }, [dispatch]);

  const loadMoreNannies = () => {
    dispatch(getListOfNannies({ lastKey, pageSize }));
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption);

  return (
    <>
      <select id="select" value={selectedOption} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="name">A to Z</option>
        <option value="des">Z to A</option>
        <option value="cheap">less that 10$</option>
      </select>
      <ul>
        {Array.isArray(nannies) &&
          nannies.map((nanny) => {
            return <NanniesItem key={nanny.name} data={nanny} />;
          })}
      </ul>
      <button
        onClick={() => loadMoreNannies()}
        className={css.loadmore_btn}
        type="button"
      >
        Load more
      </button>
    </>
  );
};

export default NanniestList;
