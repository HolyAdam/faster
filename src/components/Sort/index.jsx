import React from 'react';

const sort = [
  {
    sortName: 'популярности',
    sortType: 'rating',
  },
  {
    sortName: 'цене',
    sortType: 'price',
  },
  {
    sortName: 'алфавиту',
    sortType: 'title',
  },
];

const Sort = ({ activeSort, setActiveSort }) => {
  const sortPopup = React.useRef(null);
  const [isPopupOpen, setIsPopunOpen] = React.useState(false);

  const onSortPopupClick = (obj) => {
    setActiveSort(obj);
    setIsPopunOpen(false);
  };

  const onPopupClick = () => {
    setIsPopunOpen(!isPopupOpen);
  };

  React.useEffect(() => {
    const clickOutSide = (e) => {
      let path = e.composedPath().includes(sortPopup.current);
      if (!path) setIsPopunOpen(false);
    };
    document.body.addEventListener('click', clickOutSide);
    return () =>
      document.body.removeEventListener('click', clickOutSide);
  }, []);

  return (
    <div className="sort" ref={sortPopup}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onPopupClick}>{activeSort.sortName}</span>
      </div>
      {isPopupOpen && (
        <div className="sort__popup">
          <ul>
            {sort.map((obj, i) => (
              <li
                key={i}
                className={
                  activeSort.sortName === obj.sortName ? 'active' : ''
                }
                onClick={() => onSortPopupClick(obj)}>
                {obj.sortName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
