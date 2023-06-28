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
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(
    null
  );
  const [filterName, setFilterName] = useState('');

  const { visitorList, setVisitor, currentVisitor } =
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
  };

  const openModalDelete = () => {
    if (currentVisitor) setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleVisitorClick = (id: string) => {
    setSelectedVisitorId(id);

    setVisitor(visitorList.find((visitor) => visitor.id === id));
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
          selectedVisitor={selectedVisitorId}
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
      <Table>
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
              visitor.name.toLowerCase().includes(filterName.toLowerCase())
            )
            .map(({ name, email, number, reservationDate, id }) => (
              <TableRow
                key={id}
                onClick={() => handleVisitorClick(id)}
                className={selectedVisitorId === id ? 'selected' : ''}
              >
                <td>{name}</td>
                <td>{email}</td>
                <td>{number}</td>
                <td>{reservationDate}</td>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </Main>
  );
};

export default Home;
