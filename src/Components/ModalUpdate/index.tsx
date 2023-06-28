import React, { Context, useContext, useEffect, useState } from 'react';
import { Label, Main } from './styles';
import { VisitorContext } from '../../contexts/VisitorContext';
import { toast } from 'react-toastify';

interface IModalVisitorEdit {
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

const ModalEdit: React.FC<IModalVisitorEdit> = ({ closeModalCallback }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const { visitorList, handleUpdateVisitor, currentVisitor } =
    useContext(VisitorContext);

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
    if (currentVisitor) {
      setId(currentVisitor.id);
      setName(currentVisitor.name);
      setEmail(currentVisitor.email);
      setNumber(currentVisitor.number);
      setReservationDate(currentVisitor.reservationDate);
    }
  }, [currentVisitor, visitorList]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const existingVisitorByReservationDate = visitorList.find(
      (visitor: IVisitor) => visitor.reservationDate === reservationDate
    );

    if (
      !(currentVisitor && currentVisitor.reservationDate === reservationDate) &&
      existingVisitorByReservationDate
    ) {
      toast.error('Já existe uma reserva com o mesmo horário.');
      return;
    }

    const existingVisitorByNumber = visitorList.find(
      (visitor) => visitor.number === number
    );

    if (
      !(currentVisitor && currentVisitor.number === number) &&
      existingVisitorByNumber
    ) {
      toast.error('Esse número já está cadastrado por outro visitante.');
      return;
    }

    const existingVisitorByEmail = visitorList.find(
      (visitor) => visitor.email === email
    );

    if (
      !(currentVisitor && currentVisitor.email === email) &&
      existingVisitorByEmail
    ) {
      toast.error('Esse email já está cadastrado por outro visitante.');
      return;
    }

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
    <Main>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h2 className="title">Editar dados da reserva</h2>
            <form>
              <div className="field">
                <Label className="label">Nome</Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o nome do visitante"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <Label className="label">Email</Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o email do visitante"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Label className="label">Telefone</Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o número de telefone do visitante"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <Label className="label">Data e hora</Label>
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
      </div>
    </Main>
  );
};

export default ModalEdit;
