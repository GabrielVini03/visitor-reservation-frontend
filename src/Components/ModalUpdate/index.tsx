import React, { Context, useContext, useEffect, useState } from 'react';
import { Main } from '../../pages/Home/styles';
import { VisitorContext } from '../../contexts/VisitorContext';

interface IModalVisitorEdit {
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

const ModalEdit: React.FC<IModalVisitorEdit> = ({
  selectedVisitor,
  isActive,
  closeModalCallback,
}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const { visitorList, handleUpdateVisitor } = useContext(VisitorContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'reservationDate') {
      setReservationDate(value);
    }
  };

  useEffect(() => {
    if (selectedVisitor) {
      const visitorData = visitorList.find(
        (visitor) => visitor.id === selectedVisitor
      );
      if (visitorData) {
        setId(visitorData.id);
        setName(visitorData.name);
        setEmail(visitorData.email);
        setNumber(visitorData.number);
        setReservationDate(visitorData.reservationDate);
      }
    }
  }, [selectedVisitor, visitorList]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newVisitor: IVisitor = {
      id,
      name,
      email,
      number,
      reservationDate,
    };

    handleUpdateVisitor(newVisitor);
    closeModalCallback();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title">Editar dados do visitante</h2>
          <form>
            <div className="field">
              <label className="label">Nome</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Digite o nome do visitante"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Digite o email do visitante"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label className="label">Telefone</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Digite o número de telefone do visitante"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <label className="label">Data e hora</label>
              <div className="control">
                <input
                  className="input"
                  type="datetime-local"
                  placeholder="Digite a data e a hora da reserva"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  onClick={handleSubmit}
                  className="button is-primary"
                  type="submit"
                >
                  Atualizar
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
      <button
        className="modal-close is-large"
        aria-label="Fechar"
        onClick={closeModalCallback}
      ></button>
    </div>
  );
};

export default ModalEdit;
