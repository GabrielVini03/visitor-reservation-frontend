import React, { ReactNode, createContext, useState } from 'react';
import { ICreateVisitor } from '../Components/ModalInsert';
import { v4 as uuid } from 'uuid';

export interface IVisitor {
  id: string;
  name: string;
  email: string;
  number: string;
  reservationDate: string;
}

interface IVisitorContext {
  visitorList: IVisitor[];
  currentVisitor: IVisitor | undefined;
  setCurrentVisitor(visitor: IVisitor | undefined): void;
  setVisitor: (visitor: IVisitor | undefined) => void;
  handleAddVisitor: (newVisitor: ICreateVisitor) => void;
  handleUpdateVisitor: (updateVisitor: IVisitor) => void;
  handleDeleteVisitor: (deleteVisitorId: string) => void;
}

interface IVisitorProviderProps {
  children: ReactNode;
}

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
    setCurrentVisitor(undefined);
  };

  const handleDeleteVisitor = (deleteVisitorId: string) => {
    const deleteVisitorList = visitorList.filter(
      (visitor) => visitor.id !== deleteVisitorId
    );
    setVisitorList(deleteVisitorList);
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
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
