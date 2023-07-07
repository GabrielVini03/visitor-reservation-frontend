import React, { useState, useContext } from 'react';
import { Main, Table, TableHeaderCell, TableRow, FilterInput } from './styles';
import ModalInsert from '../../Components/ModalInsert';
import ModalUpdate from '../../Components/ModalUpdate';
import ModalDelete from '../../Components/ModalDelete';
import { VisitorContext } from '../../contexts/VisitorContext';

const Home: React.FC = () => {
  const [isModalInsertOpen, setIsModalInsertOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [filterName, setFilterName] = useState('');

  const { visitorList, setVisitor, currentVisitor, setCurrentVisitor } =
    useContext(VisitorContext);

  const openModalInsert = () => {
    setIsModalInsertOpen(true);
  };

  const closeModalInsert = () => {
    setIsModalInsertOpen(false);
  };

  const openModalUpdate = () => {
    if (currentVisitor) setIsModalUpdateOpen(true);
  };

  const closeModalUpdate = () => {
    setIsModalUpdateOpen(false);
    setCurrentVisitor(undefined);
  };

  const openModalDelete = () => {
    if (currentVisitor) setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleVisitorClick = (id: string) => {
    if (id) {
      const visitor = visitorList.find((v) => v.id === id);
      setCurrentVisitor(visitor);
    }

    setVisitor(visitorList.find((v) => v.id === id));
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
      {isModalDeleteOpen && (
        <ModalDelete
          isActive={isModalDeleteOpen}
          closeModalCallback={closeModalDelete}
          currentVisitor={currentVisitor}
        />
      )}
      <div className="buttons" style={{ marginLeft: '5%' }}>
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
      <div className="filter">
        <FilterInput
          className="input"
          type="text"
          placeholder="Filtrar por nome"
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
        />
      </div>
      <Table id="table">
        <thead>
          <tr>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Telefone</TableHeaderCell>
            <TableHeaderCell>Data da Reserva</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {visitorList
            .filter((visitor) =>
              visitor.visitorName
                .toLowerCase()
                .includes(filterName.toLowerCase())
            )
            .map(
              ({
                id,
                visitorName,
                visitorEmail,
                visitorPhone,
                reservationDate,
              }) => (
                <TableRow
                  key={id}
                  onClick={() => handleVisitorClick(id)}
                  className={currentVisitor?.id === id ? 'selected' : ''}
                >
                  <td>{visitorName}</td>
                  <td>{visitorEmail}</td>
                  <td>{visitorPhone}</td>
                  <td>{reservationDate}</td>
                </TableRow>
              )
            )}
        </tbody>
      </Table>
    </Main>
  );
};

export default Home;
