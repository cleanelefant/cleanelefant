import React, { createContext } from "react";
import Store from "./mobx/store";
import Component from "./Component";

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
      <Component />
    </Context.Provider>
  );
}
