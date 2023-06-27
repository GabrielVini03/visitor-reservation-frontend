import React, { useState, useContext } from 'react';
import { Main } from './styles';
import ModalInsert from '../../Components/ModalInsert';
import ModalUpdate from '../../Components/ModalUpdate';
import ModalDelete from '../../Components/ModalDelete';
import { VisitorContext } from '../../contexts/VisitorContext';

const Home: React.FC = () => {
  const [isModalInsertOpen, setIsModalInsertOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(
    null
  );
  const { visitorList } = useContext(VisitorContext);

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

  const openModalDelete = () => {
    setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleVisitorClick = (id: string) => {
    setSelectedVisitorId(id);
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
          selectedVisitor={selectedVisitorId}
        />
      )}
      {isModalDeleteOpen && (
        <ModalDelete
          isActive={isModalDeleteOpen}
          closeModalCallback={closeModalDelete}
          selectedVisitor={selectedVisitorId}
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
              <button className="button is-danger" onClick={openModalDelete}>
                Remover
              </button>
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
          {visitorList.map(({ name, email, number, reservationDate, id }) => (
            <tr key={id} onClick={() => handleVisitorClick(id)}>
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
