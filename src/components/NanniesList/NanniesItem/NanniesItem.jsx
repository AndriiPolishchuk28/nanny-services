import css from './NanniesItem.module.css';
import { icons } from '../../../assets';
import { useState } from 'react';

const NanniesItem = () => {
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(true);
  };
  return (
    <div className={css.item_wrapper}>
      <div className={css.img_wrapper}></div>
      <div className={css.info_wrapper}>
        <div className={css.name_and_details}>
          <h3 className={css.nanny}>Nanny</h3>
          <div className={css.details_wrapper}>
            <div className={css.details_info}>
              <svg width={16} height={16} className={css.svg_map}>
                <use href={`${icons}#icon-map-pin`}></use>
              </svg>
              <p className={css.text_details_info}>Lviv, Ukraine</p>
            </div>
            <div className={css.details_info}>
              <svg width={16} height={16} className={css.svg_star}>
                <use href={`${icons}#icon-star`}></use>
              </svg>
              <p className={css.text_details_info}>Rating: 4.5</p>
            </div>
            <div className={css.details_info}>
              <p className={css.text_details_info}>
                Price / 1 hour: <span>16$</span>
              </p>
            </div>
            <div className={css.details_info}>
              <svg width={26} height={26} className={css.svg_heart}>
                <use href={`${icons}#icon-heart`}></use>
              </svg>
            </div>
          </div>
        </div>
        <p className={css.name_teacher}>Andrii Polishchuk</p>
        <div className={css.features_wrapper}>
          <div className={css.features_item}>
            <p className={css.features_name}>Age:</p>&nbsp;
            <p className={css.features_describtion}> 32</p>
          </div>
          <div className={css.features_item}>
            <p className={css.features_name}>Age:</p>&nbsp;
            <p className={css.features_describtion}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              repellat itaque
            </p>
          </div>
        </div>
        <p className={css.about_teacher}>
          I lhave a passion for teaching and mentoring children. I aim to help
          them grow and learn in a safe and loving environment. I am also a
          trained child psychologist, which helps me in understanding and
          catering to the unique needs of every child.
        </p>
        <button onClick={handleReadMore} className={css.btn_more}>
          Read more
        </button>
        {readMore && <p>etstststtstssttsts</p>}
      </div>
    </div>
  );
};

export default NanniesItem;
