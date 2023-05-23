import React, { createContext } from "react";
import Store from "../mobx/store";
import TopComponent from "./TopComponent";
import { store } from "../context";

interface State {
  store: Store;
}
// export const store = new Store();

export const Context = createContext<State>({
  store,
});

export default function TopContainer() {
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
