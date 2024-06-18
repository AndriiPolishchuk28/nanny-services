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
import { resetNannies } from '../../redux/nannies/nannySlice';
import sort from '../../helpers/sortFunctions';
import SelectComponents from '../SelectComponents/SelectComponents';

const NanniestList = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const lastKey = useSelector(selectLastKey);
  const pageSize = useSelector(selectPage);
  const filter = useSelector(selectFilter);
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

  return (
    <>
      <SelectComponents />
      <ul className={css.list}>
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
