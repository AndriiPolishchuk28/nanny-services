import css from './NanniesReviews.module.css';
import { icons } from '../../../../assets';

const NanniesReviews = ({ comment, rating, reviewer }) => {
  return (
    <li className={css.wrapper_review}>
      <div className={css.info_wrapper}>
        <div className={css.avatar_bg}>
          <span>O</span>
        </div>
        <div className={css.wrapper_name}>
          <p className={css.name_text}>{reviewer}</p>
          <div className={css.wrapper_rating}>
            <svg width={16} height={16} className={css.svg_star}>
              <use href={`${icons}#icon-star`}></use>
            </svg>
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <p className={css.comment}> {comment}</p>
    </li>
  );
};

export default NanniesReviews;
