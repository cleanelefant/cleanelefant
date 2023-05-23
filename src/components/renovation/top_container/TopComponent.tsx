import React from "react";
import { observer } from "mobx-react-lite";
//Context
import { Context } from "./index";
// Components
import Steps from "../../common_components/steps/Steps";
import { steps } from "../../../utils/data/steps";
import { IStep } from "../../../types";

function TopComponent() {
  const { store } = React.useContext(Context);

  const stepProps = {
    steps,
    setSteps: function (steps: IStep[]) {
      store.setSteps(steps);
    },
    setActualStep: function (id: number) {
      store.setActualStep(id);
    },
  };

  return <Steps {...stepProps} />;
}
export default observer(TopComponent);
