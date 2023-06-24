import React, { ReactNode, createContext, useState } from 'react';

interface IVisitor {
  name: string;
  email: string;
  number: string;
  reservationDate: string;
}

interface IVisitorContext {
  visitorList: IVisitor[];
  handleAddVisitor: (newVisitor: IVisitor) => void;
}

interface IVisitorProviderProps {
  children: ReactNode;
}

export const VisitorContext = createContext<IVisitorContext>({
  visitorList: [],
  handleAddVisitor: () => {
    // Implementação vazia
  },
});

export const VisitorProvider: React.FC<IVisitorProviderProps> = ({
  children,
}) => {
  const [visitorList, setVisitorList] = useState<IVisitor[]>([]);

  const handleAddVisitor = (newVisitor: IVisitor) => {
    setVisitorList((prevVisitorList) => [...prevVisitorList, newVisitor]);
  };

  return (
    <VisitorContext.Provider value={{ visitorList, handleAddVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
};
