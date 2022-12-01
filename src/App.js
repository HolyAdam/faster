import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import BikePage from './pages/BikePage/BikePage';
import Cart from './pages/Cart';
import Form from './pages/FormPage/FormPage';
import Home from './pages/Home';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/bike/:id" element={<BikePage />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
