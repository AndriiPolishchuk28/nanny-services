import NanniesItem from './NanniesItem/NanniesItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  addFavoriteNanny,
  getListOfNannies,
} from '../../redux/nannies/operations';
import {
  selectFavorites,
  selectFilter,
  selectLastKey,
  selectNannies,
  selectPage,
} from '../../redux/nannies/selectors';
import css from './NanniesList.module.css';
import { resetNannies } from '../../redux/nannies/nannySlice';
import sort from '../../helpers/sortFunctions';
import SelectComponents from '../SelectComponents/SelectComponents';
import { selectId } from '../../redux/auth/selectors';
import { errorToast } from '../../helpers/toast';

const NanniestList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nannies = useSelector(selectNannies);
  const lastKey = useSelector(selectLastKey);
  const pageSize = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const userId = useSelector(selectId);
  const favorites = useSelector(selectFavorites);
  const [arrayNannies, setArrayNannies] = useState([]);

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
    setArrayNannies(sortedArray);
  }, [filter, nannies]);

  const loadMoreNannies = () => {
    dispatch(getListOfNannies({ lastKey, pageSize }));
  };

  const addFalorite = (id, nanny) => {
    if (!userId) {
      errorToast('You should login to use favorites');
    }
    dispatch(addFavoriteNanny({ id, nanny }));
  };
  return (
    <>
      <SelectComponents />
      <ul className={css.list}>
        {location.pathname === '/nannies'
          ? arrayNannies.length &&
            arrayNannies.map((nanny) => {
              return (
                <NanniesItem
                  handleFavorite={addFalorite}
                  key={nanny.name}
                  data={nanny}
                />
              );
            })
          : favorites.map((nanny) => {
              return (
                <NanniesItem
                  handleFavorite={addFalorite}
                  key={nanny.name}
                  data={nanny}
                />
              );
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
