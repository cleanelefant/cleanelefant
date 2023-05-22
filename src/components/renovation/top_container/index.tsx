import React, { createContext } from "react";
import Store from "../mobx/store";
import TopComponent from "./TopComponent";

interface State {
  store: Store;
}
export const store = new Store();

export const Context = createContext<State>({
  store,
});

export default function Container() {
  return (
    <Context.Provider
      value={{
        store,
      }}
    >
      <TopComponent />
    </Context.Provider>
  );
}
