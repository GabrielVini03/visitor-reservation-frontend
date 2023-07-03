import axios, { AxiosResponse } from 'axios';
import { IVisitor } from '../interfaces/IVisitor';
import { IReservation } from '../interfaces/IReservation';
const API_URL = 'http://localhost:8081';

const IVisitorService = {
  getAllIVisitors: async (): Promise<IVisitor[]> => {
    const response: AxiosResponse<IVisitor[]> = await axios.get(
      `${API_URL}/IVisitors`
    );
    return response.data;
  },

  getIVisitorById: async (id: string): Promise<IVisitor> => {
    const response: AxiosResponse<IVisitor> = await axios.get(
      `${API_URL}/IVisitors/${id}`
    );
    return response.data;
  },

  createIVisitor: async (IVisitor: IVisitor): Promise<IVisitor> => {
    const response: AxiosResponse<IVisitor> = await axios.post(
      `${API_URL}/IVisitors`,
      IVisitor
    );
    return response.data;
  },

  updateIVisitor: async (id: string, IVisitor: IVisitor): Promise<IVisitor> => {
    const response: AxiosResponse<IVisitor> = await axios.put(
      `${API_URL}/IVisitors/${id}`,
      IVisitor
    );
    return response.data;
  },

  deleteIVisitor: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/IVisitors/${id}`);
  },
};

const IReservationService = {
  getAllIReservations: async (): Promise<IReservation[]> => {
    const response: AxiosResponse<IReservation[]> = await axios.get(
      `${API_URL}/IReservations`
    );
    return response.data;
  },

  getIReservationById: async (id: string): Promise<IReservation> => {
    const response: AxiosResponse<IReservation> = await axios.get(
      `${API_URL}/IReservations/${id}`
    );
    return response.data;
  },

  createIReservation: async (
    reservation: IReservation
  ): Promise<IReservation> => {
    const response: AxiosResponse<IReservation> = await axios.post(
      `${API_URL}/IReservations`,
      reservation
    );
    return response.data;
  },

  updateIReservation: async (
    id: string,
    IReservation: IReservation
  ): Promise<IReservation> => {
    const response: AxiosResponse<IReservation> = await axios.put(
      `${API_URL}/IReservations/${id}`,
      IReservation
    );
    return response.data;
  },

  deleteIReservation: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/IReservations/${id}`);
  },
};

export { IVisitorService, IReservationService };
