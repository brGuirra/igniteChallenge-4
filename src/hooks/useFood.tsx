import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';

import api from '../services/api';

import { Food } from '../types';

interface FoodContextData {
  foods: Food[];
  editingFood: Food;
  editModalOpen: boolean;
  modalOpen: boolean;
  handleAddFood: (food: Food) => Promise<void>;
  handleUpdateFood: (food: Food) => Promise<void>;
  handleDeleteFood: (id: number) => Promise<void>;
  toggleModal: () => void;
  toggleEditModal: () => void;
  handleEditFood: (food: Food) => void;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

interface FoodProviderProps {
  children: ReactNode;
}

export function FoodProvider({ children }: FoodProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState({} as Food);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/foods').then(({ data }) => data);

      setFoods(response);
    }

    getData();
  }, []);

  async function handleAddFood(food: Food) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: Food) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: Food) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <FoodContext.Provider
      value={{
        foods,
        editingFood,
        modalOpen,
        editModalOpen,
        toggleModal,
        toggleEditModal,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
        handleEditFood,
      }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);

  return context;
}
