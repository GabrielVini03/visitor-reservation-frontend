import React, { ReactNode, createContext, useState } from 'react';

interface IVisitor {
  id: string;
  name: string;
  email: string;
  number: string;
  reservationDate: string;
}

interface IVisitorContext {
  visitorList: IVisitor[];
  handleAddVisitor: (newVisitor: IVisitor) => void;
  handleUpdateVisitor: (updateVisitor: IVisitor) => void;
}

interface IVisitorProviderProps {
  children: ReactNode;
}

export const VisitorContext = createContext<IVisitorContext>({
  visitorList: [],
  handleAddVisitor: () => {
    // Implementação vazia
  },
  handleUpdateVisitor: () => {
    // Implementação vazia
  },
});

export const VisitorProvider: React.FC<IVisitorProviderProps> = ({
  children,
}) => {
  const [visitorList, setVisitorList] = useState<IVisitor[]>([]);

  const handleAddVisitor = (newVisitor: IVisitor) => {
    setVisitorList((oldVisitorList) => [...oldVisitorList, newVisitor]);
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

  return (
    <VisitorContext.Provider
      value={{ visitorList, handleAddVisitor, handleUpdateVisitor }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
