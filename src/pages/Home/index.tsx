import React, { useState, useContext } from 'react';
import { Main } from './styles';
import ModalInsert from '../../Components/ModalInsert';
import ModalUpdate from '../../Components/ModalUpdate';
import { VisitorContext } from '../../contexts/VisitorContext';

const Home: React.FC = () => {
  const [isModalInsertOpen, setIsModalInsertOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const { visitorList, handleAddVisitor } = useContext(VisitorContext);

  const openModalInsert = () => {
    setIsModalInsertOpen(true);
  };

  const closeModalInsert = () => {
    setIsModalInsertOpen(false);
  };

  const openModalUpdate = () => {
    setIsModalUpdateOpen(true);
  };

  const closeModalUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  return (
    <Main>
      {isModalInsertOpen && (
        <ModalInsert
          isActive={isModalInsertOpen}
          closeModalCallback={closeModalInsert}
        />
      )}
      {isModalUpdateOpen && (
        <ModalUpdate
          isActive={isModalUpdateOpen}
          closeModalCallback={closeModalUpdate}
        />
      )}
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="buttons is-centered">
              <button className="button is-primary" onClick={openModalInsert}>
                Inserir
              </button>
              <button className="button is-info" onClick={openModalUpdate}>
                Atualizar
              </button>
              <button className="button is-danger">Remover</button>
            </div>
          </div>
        </div>
      </div>
      <table className="table" width={'90%'} align="center">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data da Reserva</th>
          </tr>
        </thead>
        <tbody>
          {visitorList.map(({ name, email, number, reservationDate }) => (
            <tr key={email}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{number}</td>
              <td>{reservationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  );
};

export default Home;
