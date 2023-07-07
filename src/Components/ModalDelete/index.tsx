import React, { useContext } from 'react';
import { Main } from './styled';
import { toast } from 'react-toastify';
import { VisitorServiceContext } from '../../service/apiService';

interface IModalVisitorDelete {
  selectedVisitor: string | null;
  isActive: boolean;
  closeModalCallback: () => void;
}

const ModalDelete: React.FC<IModalVisitorDelete> = ({
  selectedVisitor,
  isActive,
  closeModalCallback,
}) => {
  const { deleteVisitorReservation } = useContext(VisitorServiceContext);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (selectedVisitor) {
        await deleteVisitorReservation(selectedVisitor);
        toast.success('Reserva do visitante excluída com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao excluir reserva do visitante', error);
      toast.error('Erro ao excluir reserva do visitante.');
    }

    closeModalCallback();
  };

  return (
    <Main>
      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h2 className="title">Remover visitante</h2>
            <form onSubmit={handleSubmit}>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Remover
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

export default ModalDelete;
