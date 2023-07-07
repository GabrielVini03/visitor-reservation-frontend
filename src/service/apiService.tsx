import axios, { AxiosResponse } from 'axios';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { ICreateVisitor } from '../interfaces/ICreateVisitor';
import { IVisitor } from '../interfaces/IVisitor';
import React from 'react';
import { VisitorContext } from '../contexts/VisitorContext';

const API_URL = 'http://localhost:8080';

interface IVisitorService {
  createVisitorReservation(visitor: ICreateVisitor): Promise<IVisitor>;
  updateVisitorReservation(
    visitorReservationId: string,
    updateVisitorReservation: IVisitor
  ): Promise<IVisitor>;
  findVisitorReservation(
    visitorReservationId: string
  ): Promise<IVisitor | null>;
  listVisitorReservations(): Promise<IVisitor[]>;
  deleteVisitorReservation(
    visitorReservationId: string
  ): Promise<AxiosResponse>;
}

interface IVisitorServiceContextProviderProps {
  children: ReactNode;
}

export const VisitorServiceContext = createContext<IVisitorService>(
  {} as IVisitorService
);

export const VisitorServiceContextProvider: React.FC<
  IVisitorServiceContextProviderProps
> = ({ children }) => {
  const {
    handleAddVisitor,
    handleDeleteVisitor,
    handleUpdateVisitor,
    setVisitorList,
  } = useContext(VisitorContext);

  useEffect(() => {
    const fetchVisitorReservations = async () => {
      try {
        const reservations = await listVisitorReservations();
        setVisitorList(reservations);
      } catch (error) {
        console.error('Erro ao obter reservas de visitantes', error);
      }
    };

    fetchVisitorReservations();
  }, [setVisitorList]);

  const createVisitorReservation = async (
    visitor: ICreateVisitor
  ): Promise<IVisitor> => {
    try {
      const url = `${API_URL}/api/visitorReservations`;
      const requestBody = {
        visitorName: visitor.visitorName,
        visitorEmail: visitor.visitorEmail,
        visitorPhone: visitor.visitorPhone,
        reservationDate: visitor.reservationDate,
      };

      const response = await axios.post(url, requestBody);
      const reservationId = response.data.id;

      const visitorReservation: IVisitor = {
        id: reservationId,
        visitorName: visitor.visitorName,
        visitorEmail: visitor.visitorEmail,
        visitorPhone: visitor.visitorPhone,
        reservationDate: visitor.reservationDate,
      };

      handleAddVisitor(visitor, visitorReservation.id);

      return visitorReservation;
    } catch (error) {
      console.error('Não foi possível criar a reserva do visitante', error);
      throw error;
    }
  };

  const updateVisitorReservation = async (
    visitorReservationId: string,
    updateVisitorReservation: IVisitor
  ): Promise<IVisitor> => {
    try {
      const url = `${API_URL}/api/visitorReservations/${visitorReservationId}`;
      const requestBody = {
        visitorName: updateVisitorReservation.visitorName,
        visitorEmail: updateVisitorReservation.visitorEmail,
        visitorPhone: updateVisitorReservation.visitorPhone,
        reservationDate: updateVisitorReservation.reservationDate,
      };

      const response = await axios.put(url, requestBody);

      const updatedVisitorReservation: IVisitor = {
        id: response.data.id,
        visitorName: response.data.visitorName,
        visitorEmail: response.data.visitorEmail,
        visitorPhone: response.data.visitorPhone,
        reservationDate: response.data.reservationDate,
      };

      handleUpdateVisitor(updatedVisitorReservation);

      return updatedVisitorReservation;
    } catch (error) {
      console.error('Não foi possível atualizar a reserva do visitante', error);
      throw error;
    }
  };

  const findVisitorReservation = async (
    visitorReservationId: string
  ): Promise<IVisitor | null> => {
    try {
      const url = `${API_URL}/api/visitorReservations/${visitorReservationId}`;
      const response = await axios.get(url);
      return response.data as IVisitor;
    } catch (error) {
      console.error('Erro ao buscar reserva do visitante', error);
      return null;
    }
  };

  const listVisitorReservations = async (): Promise<IVisitor[]> => {
    try {
      const url = `${API_URL}/api/visitorReservations`;
      const response = await axios.get(url);
      return response.data as IVisitor[];
    } catch (error) {
      console.error('Erro ao obter reservas de visitantes', error);
      throw error;
    }
  };

  const deleteVisitorReservation = async (
    visitorReservationId: string
  ): Promise<AxiosResponse> => {
    try {
      const url = `${API_URL}/api/visitorReservations/${visitorReservationId}`;
      handleDeleteVisitor(visitorReservationId);
      return await axios.delete(url);
    } catch (error) {
      console.error('Não foi possível excluir a reserva do visitante', error);
      throw error;
    }
  };

  return (
    <VisitorServiceContext.Provider
      value={{
        createVisitorReservation,
        updateVisitorReservation,
        findVisitorReservation,
        listVisitorReservations,
        deleteVisitorReservation,
      }}
    >
      {children}
    </VisitorServiceContext.Provider>
  );
};
