// import { useState, useEffect } from 'react';

import { useFood } from '../../hooks/useFood';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

function Dashboard() {
  const { foods } = useFood();
  return (
    <>
      <Header />
      <ModalAddFood />
      <ModalEditFood />

      <FoodsContainer data-testid="foods-list">
        {foods && foods.map((food) => <Food key={food.id} food={food} />)}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
