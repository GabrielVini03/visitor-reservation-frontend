import axios, { AxiosResponse } from 'axios';
import { ICreateVisitor } from '../interfaces/ICreateVisitor';

const API_URL = 'http://localhost:8080';

export const createVisitorReservation = async (
  visitor: ICreateVisitor
): Promise<AxiosResponse> => {
  try {
    const url = `${API_URL}/api/visitorReservations`;
    const requestBody = {
      visitorName: visitor.name,
      visitorEmail: visitor.email,
      visitorPhone: visitor.number,
      reservationDate: visitor.reservationDate,
    };

    return await axios.post(url, requestBody);
  } catch (error) {
    console.error('Não foi possível criar a reserva do visitante', error);
    throw error;
  }
};
