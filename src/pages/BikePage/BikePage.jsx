import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  minusBike,
  plusBike,
} from '../../store/cartReducer/cartSlice';

import './BikePage.scss';

const BikePage = () => {
  const dispatch = useDispatch();

  const [infoCard, setInfoCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();

  const cartItems = useSelector((state) => state.cart.items);

  const bikeItem = cartItems.find((obj) => obj.id === +id);

  const bikeCount = bikeItem ? bikeItem.counter : 0;

  const onPlusBtn = () => {
    if (infoCard) {
      dispatch(
        plusBike({
          id: +id,
          imageUrl: infoCard.imageUrl,
          title: infoCard.title,
          price: infoCard.price,
          descr: infoCard.descr,
        }),
      );
    }
  };

  const onMinusBtn = () => {
    dispatch(minusBike(+id));
  };

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(
        'https://63669f9bf5f549f052c9fd91.mockapi.io/bikesItems',
      );
      const data = await res.json();
      setInfoCard(data.find((item) => item.id === +id));
      setIsLoading(false);
    })();
  }, [id]);

  const cardContent = () => {
    return (
      <>
        <h2 className="bike-page__title">
          Страница товара {infoCard.title}
        </h2>
        <div className="bike-page__wrapper">
          <img
            className="bike-page__img"
            src={infoCard.imageUrl}
            alt="Card Product"
          />
          <div className="bike-page__descr">
            <h4>{infoCard.title}</h4>
            <p>{infoCard.op}</p>
            <div className="bike-page__bottom">
              <div className="bike-block__price bike-page__firstbtn">
                от {infoCard.price} ₽
              </div>
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
        </div>
      </>
    );
  };

  return (
    <div className="container">
      {isLoading ? (
        <h3>Загрузка...</h3>
      ) : infoCard ? (
        cardContent()
      ) : (
        <h1>Произошла ошибка</h1>
      )}
    </div>
  );
};

export default BikePage;
