import React from 'react';
import Action from './Action';
import { numStore } from './store/num';
import { useMapperSelector, useSelector } from '../src/index';
import { mapperNumStore } from './store/mapperDemo';


const MainPage: React.FC = () => {
  const numStoreValue = useSelector(numStore,state => state);
  const numStoreValue2 = useMapperSelector<number,number>(mapperNumStore,1,state => state);
  console.log('numStoreValue',numStoreValue);
  console.log('numStoreValue2',numStoreValue2);
  return (
    <>
      <div>xxx</div>
      <Action />
      {numStoreValue}
      {numStoreValue2}
    </>
  );
};

export default MainPage;