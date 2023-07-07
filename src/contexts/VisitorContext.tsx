import React, { ReactNode, createContext, useState } from 'react';
import { ICreateVisitor } from '../interfaces/ICreateVisitor';
import { IVisitor } from '../interfaces/IVisitor';
import * as Yup from 'yup';

interface IVisitorContext {
  visitorList: IVisitor[];
  currentVisitor: IVisitor | undefined;
  setVisitorList(visitorList: IVisitor[]): void;
  setCurrentVisitor(visitor: IVisitor | undefined): void;
  setVisitor: (visitor: IVisitor | undefined) => void;
  handleAddVisitor: (newVisitor: ICreateVisitor, reservationId: string) => void;
  handleUpdateVisitor: (updateVisitor: IVisitor) => void;
  handleDeleteVisitor: (deleteVisitorId: string) => void;
  applyCommonValidations: (
    visitor: IVisitor | ICreateVisitor,
    currentVisitor?: IVisitor
  ) => string[];
}

interface IVisitorProviderProps {
  children: ReactNode;
}

const visitorSchema = Yup.object().shape({
  visitorName: Yup.string().required('O campo nome é obrigatório'),
  visitorEmail: Yup.string()
    .required('O campo visitorEmail é obrigatório')
    .email('Digite um visitorEmail válido'),
  visitorPhone: Yup.string()
    .required('O campo número é obrigatório')
    .matches(/^[0-9]{10,11}$/, 'Digite um número de telefone válido'),
  reservationDate: Yup.string().required(
    'O campo data de reserva é obrigatório'
  ),
});

export const VisitorContext = createContext<IVisitorContext>(
  {} as IVisitorContext
);

export const VisitorProvider: React.FC<IVisitorProviderProps> = ({
  children,
}) => {
  const [visitorList, setVisitorList] = useState<IVisitor[]>([]);
  const [currentVisitor, setCurrentVisitor] = useState<IVisitor | undefined>(
    undefined
  );

  const setVisitor = (visitor: IVisitor | undefined) => {
    setCurrentVisitor(visitor);
  };

  const handleAddVisitor = (
    newVisitor: ICreateVisitor,
    reservationId: string
  ) => {
    setVisitorList((oldVisitorList) => [
      ...oldVisitorList,
      { id: reservationId, ...newVisitor },
    ]);
  };

  const handleUpdateVisitor = (updateVisitor: IVisitor) => {
    const updatedVisitorList = visitorList.map((visitor) => {
      if (visitor.id === updateVisitor.id) {
        return updateVisitor;
      } else {
        return visitor;
      }
    });
    setVisitorList(updatedVisitorList);
  };

  const handleDeleteVisitor = (deleteVisitorId: string) => {
    const deleteVisitorList = visitorList.filter(
      (visitor) => visitor.id !== deleteVisitorId
    );
    setVisitorList(deleteVisitorList);
  };

  const applyCommonValidations = (
    visitor: IVisitor | ICreateVisitor,
    currentVisitor?: IVisitor
  ): string[] => {
    const errors: string[] = [];

    const existingVisitorByReservationDate = visitorList.find(
      (v) => v.reservationDate === visitor.reservationDate
    );

    if (
      !(
        currentVisitor &&
        currentVisitor.reservationDate === visitor.reservationDate
      ) &&
      existingVisitorByReservationDate
    ) {
      errors.push('Já existe uma reserva com o mesmo horário.');
    }

    const existingVisitorByvisitorPhone = visitorList.find(
      (v) => v.visitorPhone === visitor.visitorPhone
    );

    if (
      !(
        currentVisitor && currentVisitor.visitorPhone === visitor.visitorPhone
      ) &&
      existingVisitorByvisitorPhone
    ) {
      errors.push('Esse número já está cadastrado por outro visitante.');
    }

    const existingVisitorByvisitorEmail = visitorList.find(
      (v) => v.visitorEmail === visitor.visitorEmail
    );

    if (
      !(
        currentVisitor && currentVisitor.visitorName === visitor.visitorEmail
      ) &&
      existingVisitorByvisitorEmail
    ) {
      errors.push('Esse visitorEmail já está cadastrado por outro visitante.');
    }

    try {
      visitorSchema.validateSync(visitor, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const validationErrors = validationError.errors as string[];
        errors.push(...validationErrors);
      }
    }

    return errors;
  };

  return (
    <VisitorContext.Provider
      value={{
        visitorList,
        currentVisitor,
        setVisitorList,
        setCurrentVisitor,
        setVisitor,
        handleAddVisitor,
        handleUpdateVisitor,
        handleDeleteVisitor,
        applyCommonValidations,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
