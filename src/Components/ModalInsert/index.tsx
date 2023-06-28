import React, { useContext, useState } from 'react';
import { Label, Main } from './styles';
import { VisitorContext } from '../../contexts/VisitorContext';
import { toast } from 'react-toastify';

interface IModalInsertVisitorProps {
  isActive: boolean;
  closeModalCallback: () => void;
}

export interface ICreateVisitor {
  name: string;
  email: string;
  number: string;
  reservationDate: string;
}

const ModalInsert: React.FC<IModalInsertVisitorProps> = ({
  closeModalCallback,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const { visitorList, handleAddVisitor, currentVisitor } =
    useContext(VisitorContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const existingVisitorByReservationDate = visitorList.find(
      (visitor: ICreateVisitor) => visitor.reservationDate === reservationDate
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

    const newVisitor: ICreateVisitor = {
      name,
      email,
      number,
      reservationDate,
    };

    handleAddVisitor(newVisitor);
    closeModalCallback();
  };

  return (
    <Main>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h2 className="title">Inserir dados da reserva</h2>
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
                    Inserir
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

export default ModalInsert;
