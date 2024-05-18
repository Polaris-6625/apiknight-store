import React, { useState, useEffect } from 'react';
import { store } from './store';
import Action from './Action';


const MainPage: React.FC = () => {
  store.subscribe(() => console.log(store.getState()));
  return (
    <>
      <div>xxx</div>
      <Action />
    </>
  );
};

export default MainPage;