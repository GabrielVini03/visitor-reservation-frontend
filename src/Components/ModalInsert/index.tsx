import React, { useContext, useState } from 'react';
import { Label, Main } from './styles';
import { VisitorContext } from '../../contexts/VisitorContext';
import { toast } from 'react-toastify';
import { ICreateVisitor } from '../../interfaces/ICreateVisitor';
import { VisitorServiceContext } from '../../service/apiService';

interface IModalInsertVisitorProps {
  isActive: boolean;
  closeModalCallback: () => void;
}

const ModalInsert: React.FC<IModalInsertVisitorProps> = ({
  closeModalCallback,
}) => {
  const [visitorName, setvisitorName] = useState('');
  const [visitorEmail, setvisitorEmail] = useState('');
  const [visitorPhone, setvisitorPhone] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const { applyCommonValidations } = useContext(VisitorContext);
  const { createVisitorReservation } = useContext(VisitorServiceContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newVisitor: ICreateVisitor = {
      visitorName,
      visitorEmail,
      visitorPhone,
      reservationDate,
    };

    const errors = applyCommonValidations(newVisitor);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }
    try {
      const response = await createVisitorReservation(newVisitor);
      if (response.id) {
        toast.success('Reserva criada com sucesso!');
        closeModalCallback();
      } else {
        toast.error('Não foi possível criar a reserva do visitante.');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao criar a reserva do visitante.');
    }
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
                    value={visitorName}
                    onChange={(e) => setvisitorName(e.target.value)}
                  />
                </div>
                <Label className="label">
                  Emai <span className="required-field">*</span>
                </Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o visitorEmail do visitante"
                    value={visitorEmail}
                    onChange={(e) => setvisitorEmail(e.target.value)}
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
                    value={visitorPhone}
                    onChange={(e) => setvisitorPhone(e.target.value)}
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
