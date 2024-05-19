import React, { useState, useEffect } from 'react';
import { store } from './store/store';
import Action from './Action';
import { numStore } from './store/num';
import { useSelector } from '../src/index';


const MainPage: React.FC = () => {
  // store.subscribe(() => console.log(store.getState()));
  // numStore.subscribe(() => console.log(numStore.getState()));
  const numStoreValue = useSelector(numStore,state => state);

  console.log('numStoreValue',numStoreValue);
  return (
    <>
      <div>xxx</div>
      <Action />
    </>
  );
};

export default MainPage;