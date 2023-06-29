import React, { useContext, useState } from 'react';
import { Label, Main } from './styles';
import { VisitorContext } from '../../contexts/VisitorContext';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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

const visitorSchema = Yup.object().shape({
  name: Yup.string().required('O campo nome é obrigatório'),
  email: Yup.string()
    .email('Digite um email válido')
    .required('O campo email é obrigatório'),
  number: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Digite um número de telefone válido')
    .required('O campo número é obrigatório'),
  reservationDate: Yup.string().required(
    'O campo data de reserva é obrigatório'
  ),
});

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

    try {
      visitorSchema.validateSync({
        name,
        email,
        number,
        reservationDate,
      });

      const newVisitor: ICreateVisitor = {
        name,
        email,
        number,
        reservationDate,
      };

      handleAddVisitor(newVisitor);
      closeModalCallback();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
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
