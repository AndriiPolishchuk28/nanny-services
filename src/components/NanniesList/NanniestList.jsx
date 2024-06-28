import NanniesItem from './NanniesItem/NanniesItem';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
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
  selectNannyIsLoading,
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
  const loading = useSelector(selectNannyIsLoading);
  const [arrayNannies, setArrayNannies] = useState([]);

  useEffect(() => {
    dispatch(
      getListOfNannies({
        lastKey: null,
        pageSize,
      }),
    );
  }, [dispatch, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(resetNannies());
    };
  }, [dispatch]);

  useEffect(() => {
    const nanny =
      location.pathname === '/nannies' ? [...nannies] : [...favorites];
    const sortedArray = sort(nanny, filter);
    setArrayNannies(sortedArray);
  }, [filter, nannies, favorites, location.pathname]);

  const loadMoreNannies = () => {
    dispatch(getListOfNannies({ lastKey, pageSize }));
  };

  const isNannies = arrayNannies.length > 0;

  const addFavorite = useCallback(
    (id, nanny) => {
      if (!userId) {
        errorToast('You should login to use favorites');
        return;
      }
      dispatch(addFavoriteNanny({ id, nanny }));
    },
    [userId, dispatch],
  );

  return (
    <>
      <SelectComponents />
      <ul className={css.list}>
        {isNannies ? (
          arrayNannies.map((nanny) => {
            return (
              <NanniesItem
                handleFavorite={addFavorite}
                key={nanny.name}
                data={nanny}
              />
            );
          })
        ) : (
          <p className={css.no_items}>No Items available</p>
        )}
      </ul>
      {location.pathname === '/nannies' && !loading && isNannies && (
        <button
          onClick={() => loadMoreNannies()}
          className={css.loadmore_btn}
          type="button"
        >
          Load more
        </button>
      )}
    </>
  );
};

export default NanniestList;
