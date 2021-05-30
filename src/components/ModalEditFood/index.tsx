import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { useFood } from '../../hooks/useFood';
import { Food } from '../../types';

import Modal from '../Modal';
import Input from '../Input';

import { Form } from './styles';

function ModalEditFood() {
  const formRef = useRef(null);
  const { editModalOpen, toggleEditModal, editingFood, handleUpdateFood } =
    useFood();

  async function handleSubmit(data: Food) {
    handleUpdateFood(data);
    toggleEditModal();
  }

  return (
    <Modal isOpen={editModalOpen} setIsOpen={toggleEditModal}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;
