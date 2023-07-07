import React, { useContext, useEffect, useState } from 'react';
import { Label, Main } from './styles';
import { VisitorContext } from '../../contexts/VisitorContext';
import { toast } from 'react-toastify';
import { IVisitor } from '../../interfaces/IVisitor';
import { VisitorServiceContext } from '../../service/apiService';

interface IModalVisitorEdit {
  isActive: boolean;
  closeModalCallback: () => void;
}

const ModalEdit: React.FC<IModalVisitorEdit> = ({ closeModalCallback }) => {
  const [id, setId] = useState('');
  const [visitorName, setvisitorName] = useState('');
  const [visitorEmail, setvisitorEmail] = useState('');
  const [visitorPhone, setvisitorPhone] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const { visitorList, currentVisitor, applyCommonValidations } =
    useContext(VisitorContext);
  const { updateVisitorReservation } = useContext(VisitorServiceContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'visitorName') {
      setvisitorName(value);
    } else if (name === 'visitorEmail') {
      setvisitorEmail(value);
    } else if (name === 'reservationDate') {
      setReservationDate(value);
    }
  };

  useEffect(() => {
    if (currentVisitor) {
      setId(currentVisitor.id);
      setvisitorName(currentVisitor.visitorName);
      setvisitorEmail(currentVisitor.visitorEmail);
      setvisitorPhone(currentVisitor.visitorPhone);
      setReservationDate(currentVisitor.reservationDate);
    }
  }, [currentVisitor, visitorList]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedVisitor: IVisitor = {
      ...currentVisitor!,
      visitorName,
      visitorEmail,
      visitorPhone,
      reservationDate,
    };

    const errors = applyCommonValidations(updatedVisitor, currentVisitor);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    try {
      if (currentVisitor) {
        await updateVisitorReservation(currentVisitor.id, updatedVisitor);
        toast.success('Visitante atualizado com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao atualizar visitante', error);
      toast.error('Erro ao atualizar visitante.');
    }

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
                    value={visitorName}
                    onChange={(e) => setvisitorName(e.target.value)}
                  />
                </div>
                <Label className="label">visitorEmail</Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o visitorEmail do visitante"
                    value={visitorEmail}
                    onChange={(e) => setvisitorEmail(e.target.value)}
                  />
                </div>
                <Label className="label">Telefone</Label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Digite o número de telefone do visitante"
                    value={visitorPhone}
                    onChange={(e) => setvisitorPhone(e.target.value)}
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
