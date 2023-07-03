import React, { useContext, useState } from 'react';
import { Label, Main } from './styles';
import { VisitorContext } from '../../contexts/VisitorContext';
import { toast } from 'react-toastify';
import { ICreateVisitor } from '../../interfaces/ICreateVisitor';

interface IModalInsertVisitorProps {
  isActive: boolean;
  closeModalCallback: () => void;
}

const ModalInsert: React.FC<IModalInsertVisitorProps> = ({
  closeModalCallback,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const { handleAddVisitor, applyCommonValidations } =
    useContext(VisitorContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newVisitor: ICreateVisitor = {
      name,
      email,
      number,
      reservationDate,
    };

    const errors = applyCommonValidations(newVisitor);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

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
                <Label className="label">
                  Nome <span className="required-field">*</span>
                </Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o nome do visitante"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <Label className="label">
                  Emai <span className="required-field">*</span>
                </Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o email do visitante"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Label className="label">
                  Telefone <span className="required-field">*</span>
                  <span className="label-description">
                    (Formato: 40998543643)
                  </span>
                </Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o número de telefone do visitante"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <Label className="label">
                  Data e hora <span className="required-field">*</span>
                </Label>
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
