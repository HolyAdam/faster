import React from 'react';

import BikeBlock from '../components/BikeBlock';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort';

import { SearchContext } from '../App';
import Loader from '../components/Loader';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const [bikes, setBikes] = React.useState([]);

  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState({
    sortName: 'популярности',
    sortType: 'rating',
  });

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const categories =
      activeCategory > 0 ? `&category=${activeCategory}` : '';

    setIsLoading(true);
    fetch(
      `https://63669f9bf5f549f052c9fd91.mockapi.io/bikes?sortBy=${activeSort.sortType}${categories}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setBikes(data);
        setIsLoading(false);
      });
  }, [activeCategory, activeSort.sortType]);

  const renderBikes = bikes
    .filter((bike) =>
      bike.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .map((bike) => <BikeBlock key={bike.id} {...bike} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
      </div>
      <h2 className="content__title">Вся техника</h2>
      <div className={`content__items ${isLoading ? 'pb-70' : ''}`}>
        {isLoading ? <Loader /> : renderBikes}
      </div>
    </div>
  );
};

export default Home;
