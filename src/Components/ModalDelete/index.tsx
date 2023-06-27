import React, { Context, useContext, useEffect, useState } from 'react';
import { Main } from '../../pages/Home/styles';
import { VisitorContext } from '../../contexts/VisitorContext';

interface IModalVisitorDelete {
  selectedVisitor: string | null;
  isActive: boolean;
  closeModalCallback: () => void;
}

interface IVisitor {
  id: string;
  name: string;
  email: string;
  number: string;
  reservationDate: string;
}

const ModalDelete: React.FC<IModalVisitorDelete> = ({
  selectedVisitor,
  isActive,
  closeModalCallback,
}) => {
  const { handleDeleteVisitor } = useContext(VisitorContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedVisitor) handleDeleteVisitor(selectedVisitor);
    closeModalCallback();
  };

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title">Remover visitante</h2>
          <form onSubmit={handleSubmit}>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary" type="submit">
                  Remover
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-danger"
                  onClick={closeModalCallback}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
