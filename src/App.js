import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrdersPage from './Ord';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;