import React from 'react';
import { SearchContext } from '../../App';

import searchIcon from '../../assets/img/search_icon.svg';

const HeaderSearch = () => {
  const { searchValue, setSearchValue } =
    React.useContext(SearchContext);

  return (
    <div className="header__search">
      <img src={searchIcon} alt="Поиск" />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Поиск..."
      />
    </div>
  );
};

export default HeaderSearch;
