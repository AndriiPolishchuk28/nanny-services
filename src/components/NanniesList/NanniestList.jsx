import NanniesItem from './NanniesItem/NanniesItem';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListOfNannies } from '../../redux/nannies/operations';
import { selectNannies } from '../../redux/nannies/selectors';

const NanniestList = () => {
  const dispatch = useDispatch();
  const nannies = useSelector(selectNannies);
  console.log(nannies);

  useEffect(() => {
    dispatch(getListOfNannies());
  }, [dispatch]);

  return (
    <ul>
      {nannies.map((nanny) => {
        return <NanniesItem key={nanoid()} data={nanny} />;
      })}
    </ul>
  );
};

export default NanniestList;
