import React from 'react';

const catArray = ['Все', 'Велосипеды', 'Экипировка', 'Самокаты'];

const Categories = ({ activeCategory, setActiveCategory }) => {
  const onClickCategory = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {catArray.map((category, i) => (
          <li
            key={category}
            className={activeCategory === i ? 'active' : ''}
            onClick={() => onClickCategory(i)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
