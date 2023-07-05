import React, { ReactNode, createContext, useState } from 'react';
import { ICreateVisitor } from '../interfaces/ICreateVisitor';
import { v4 as uuid } from 'uuid';
import { IVisitor } from '../interfaces/IVisitor';
import * as Yup from 'yup';

interface IVisitorContext {
  visitorList: IVisitor[];
  currentVisitor: IVisitor | undefined;
  setCurrentVisitor(visitor: IVisitor | undefined): void;
  setVisitor: (visitor: IVisitor | undefined) => void;
  handleAddVisitor: (newVisitor: ICreateVisitor) => void;
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
  name: Yup.string().required('O campo nome é obrigatório'),
  email: Yup.string()
    .required('O campo email é obrigatório')
    .email('Digite um email válido'),
  number: Yup.string()
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

  const handleAddVisitor = (newVisitor: ICreateVisitor) => {
    setVisitorList((oldVisitorList) => [
      ...oldVisitorList,
      { id: uuid(), ...newVisitor },
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

    const existingVisitorByNumber = visitorList.find(
      (v) => v.number === visitor.number
    );

    if (
      !(currentVisitor && currentVisitor.number === visitor.number) &&
      existingVisitorByNumber
    ) {
      errors.push('Esse número já está cadastrado por outro visitante.');
    }

    const existingVisitorByEmail = visitorList.find(
      (v) => v.email === visitor.email
    );

    if (
      !(currentVisitor && currentVisitor.email === visitor.email) &&
      existingVisitorByEmail
    ) {
      errors.push('Esse email já está cadastrado por outro visitante.');
    }

    console.log('Name: ' + visitor.name);
    console.log('Email: ' + visitor.email);
    console.log('Number: ' + visitor.number);
    console.log('Reservation date: ' + visitor.reservationDate);

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
