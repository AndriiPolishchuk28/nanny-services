import NanniesItem from './NanniesItem/NanniesItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getListOfNannies } from '../../redux/nannies/operations';
import {
  selectFilter,
  selectLastKey,
  selectNannies,
  selectPage,
} from '../../redux/nannies/selectors';
import css from './NanniesList.module.css';
import { resetNannies, setFilter } from '../../redux/nannies/nannySlice';
import sort from '../../helpers/sortFunctions';

const NanniestList = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const lastKey = useSelector(selectLastKey);
  const pageSize = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const [selectedOption, setSelectedOption] = useState('');
  const [ab, setAb] = useState([]);

  useEffect(() => {
    dispatch(getListOfNannies({ lastKey: null, pageSize }));
  }, [dispatch, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(resetNannies());
    };
  }, [dispatch]);

  useEffect(() => {
    const sortedArray = sort([...nannies], filter);
    setAb(sortedArray);
  }, [filter, nannies]);

  const loadMoreNannies = () => {
    dispatch(getListOfNannies({ lastKey, pageSize }));
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    dispatch(setFilter(event.target.value));
  };
  console.log(selectedOption);

  return (
    <>
      <select id="select" value={selectedOption} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="ascName">A to Z</option>
        <option value="descName">Z to A</option>
        <option value="cheap">less that 10$</option>
      </select>
      <ul>
        {ab.length &&
          ab.map((nanny) => {
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
