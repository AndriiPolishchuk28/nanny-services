import css from './NanniesItem.module.css';
import { icons } from '../../../assets';
import { useState } from 'react';
import { calculateAge } from '../../../helpers/index';
import { nanoid } from 'nanoid';
import NanniesReviews from './NanniesReviews/NanniesReviews';

const NanniesItem = ({ data }) => {
  const {
    about,
    avatar_url,
    name,
    rating,
    location,
    price_per_hour,
    birthday,
    experience,
    kids_age,
    characters,
    education,
    reviews,
  } = data;
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(true);
  };
  return (
    <li className={css.item_wrapper}>
      <div className={css.img_wrapper}>
        <img className={css.avatar} src={avatar_url} alt="avatar" />
      </div>
      <div className={css.info_wrapper}>
        <div className={css.name_and_details}>
          <h3 className={css.nanny}>Nanny</h3>
          <div className={css.details_wrapper}>
            <div className={css.details_info}>
              <svg width={16} height={16} className={css.svg_map}>
                <use href={`${icons}#icon-map-pin`}></use>
              </svg>
              <p className={css.text_details_info}>{location}</p>
            </div>
            <div className={css.details_info}>
              <svg width={16} height={16} className={css.svg_star}>
                <use href={`${icons}#icon-star`}></use>
              </svg>
              <p className={css.text_details_info}>{rating}</p>
            </div>
            <div className={css.details_info}>
              <p className={css.text_details_info}>
                Price / 1 hour: <span>{price_per_hour}$</span>
              </p>
            </div>
            <div className={css.details_info}>
              <svg width={26} height={26} className={css.svg_heart}>
                <use href={`${icons}#icon-heart`}></use>
              </svg>
            </div>
          </div>
        </div>
        <p className={css.name_teacher}>{name}</p>
        <div className={css.features_wrapper}>
          <div className={css.features_item}>
            <p className={css.features_name}>Age:</p>&nbsp;
            <p className={css.features_describtion}>{calculateAge(birthday)}</p>
          </div>
          <div className={css.features_item}>
            <p className={css.features_name}>Experience</p>&nbsp;
            <p className={css.features_describtion}>{experience}</p>
          </div>
          <div className={css.features_item}>
            <p className={css.features_name}>Kid's age</p>&nbsp;
            <p className={css.features_describtion}>{kids_age}</p>
          </div>
          <div className={css.features_item}>
            <p className={css.features_name}>Characters:</p>&nbsp;
            {characters.map((item) => (
              <p key={item} className={css.features_describtion}>
                {item},&nbsp;
              </p>
            ))}
          </div>
          <div className={css.features_item}>
            <p className={css.features_name}>Education:</p>&nbsp;
            <p className={css.features_describtion}>{education}</p>
          </div>
        </div>
        <p className={css.about_teacher}>{about}</p>
        {!readMore && (
          <button onClick={handleReadMore} className={css.btn_more}>
            Read more
          </button>
        )}
        {readMore && (
          <ul className={css.review_list}>
            {reviews.map(({ comment, rating, reviewer }) => (
              <NanniesReviews
                key={nanoid()}
                comment={comment}
                rating={rating}
                reviewer={reviewer}
              />
            ))}
            <button className={css.btn_appointment} type="button">
              Make an appointment
            </button>
          </ul>
        )}
      </div>
    </li>
  );
};

export default NanniesItem;
