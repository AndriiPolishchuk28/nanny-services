import NanniesItem from './NanniesItem/NanniesItem';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListOfNannies } from '../../redux/nannies/operations';
import {
  selectLastKey,
  selectNannies,
  selectPage,
} from '../../redux/nannies/selectors';
import css from './NanniesList.module.css';

const NanniestList = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  const lastKey = useSelector(selectLastKey);
  const pageSize = useSelector(selectPage);
  console.log(pageSize);

  useEffect(() => {
    dispatch(getListOfNannies({ lastKey: null, pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const loadMoreNannies = () => {
    dispatch(getListOfNannies({ lastKey, pageSize }));
  };

  return (
    <>
      <ul>
        {Array.isArray(nannies) &&
          nannies.map((nanny) => {
            return <NanniesItem key={nanoid()} data={nanny} />;
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
