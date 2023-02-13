import React, { createContext } from "react";
import Store from "./mobx/store";
import Order from "./Order";

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
      <Order />
    </Context.Provider>
  );
}
