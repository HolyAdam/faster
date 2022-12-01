import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  plusBike,
  minusBike,
} from '../../store/cartReducer/cartSlice';

const BikeBlock = ({ id, imageUrl, title, price, descr }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const bikeItem = cartItems.find((obj) => obj.id === id);

  const bikeCount = bikeItem ? bikeItem.counter : 0;

  const onPlusBtn = () => {
    dispatch(
      plusBike({
        id,
        imageUrl,
        title,
        price,
        descr,
      }),
    );
  };

  const onMinusBtn = () => {
    dispatch(minusBike(id));
  };

  return (
    <div className="bike-block">
      <Link to={`/bike/${id}`}>
        <img
          className="bike-block__image"
          src={imageUrl}
          alt="Картинка товара"
        />
        <h4 className="bike-block__title">{title}</h4>
        <p>{descr}</p>
      </Link>
      <div className="bike-block__bottom">
        <div className="bike-block__price">от {price} ₽</div>
        <button
          onClick={onPlusBtn}
          className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{bikeCount}</i>
        </button>
        <button
          className="button button--outline button--remove"
          onClick={onMinusBtn}
          disabled={bikeCount < 1}>
          Уменьшить -
        </button>
      </div>
    </div>
  );
};

export default BikeBlock;
