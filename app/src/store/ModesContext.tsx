import { makeAutoObservable } from 'mobx';
import React from 'react';
import ModesStore from './ModesStore';

const ModesContext = React.createContext<ModesStore>({} as ModesStore);

export const ModesProvider: React.FC<React.ReactNode> = ({ children }) => {
  const modesStore = makeAutoObservable(new ModesStore());
  return (
    <ModesContext.Provider value={modesStore}>{children}</ModesContext.Provider>
  );
};

export const useModesContext = () => React.useContext(ModesContext);
