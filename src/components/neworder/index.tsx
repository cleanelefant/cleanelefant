import React, { createContext } from "react";
import Store from "./mobx/store";
import OrderStore from "./mobx/order_store";

import Component from "./Component";
import { store, orderStore } from "./context";

interface State {
  store: Store;
  orderStore: OrderStore;
}
// export const store = new Store();

export const Context = createContext<State>({
  store,
  orderStore,
});

export default function Container() {
  return (
    <Context.Provider
      value={{
        store,
        orderStore,
      }}
    >
      <Component />
    </Context.Provider>
  );
}
