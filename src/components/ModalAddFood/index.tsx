import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { useFood } from '../../hooks/useFood';
import { Food } from '../../types';
import Input from '../Input';
import Modal from '../Modal';

import { Form } from './styles';

function ModalAddFood() {
  const formRef = useRef(null);
  const { modalOpen, toggleModal, handleAddFood } = useFood();

  async function handleSubmit(data: Food) {
    handleAddFood(data);
    toggleModal();
  }

  return (
    <Modal isOpen={modalOpen} setIsOpen={toggleModal}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
