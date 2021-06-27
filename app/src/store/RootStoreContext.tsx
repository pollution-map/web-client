import { makeAutoObservable } from "mobx";
import React from "react";
import { RootStore } from "./RootStore";

const RootStoreContext = React.createContext<RootStore>({} as RootStore);

export const RootStoreProvider: React.FC<React.ReactNode> = ({ children }) => {
  const rootStore = makeAutoObservable(new RootStore());
  return (
    <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>
  );
};

export const useStore = () => React.useContext(RootStoreContext);