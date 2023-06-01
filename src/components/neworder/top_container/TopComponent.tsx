import React from "react";
import { observer } from "mobx-react-lite";
//Context
import { Context } from "./index";
// Components
import Steps from "../../common_components/steps/Steps";
import { steps } from "../../../utils/data/steps";
import { toJS } from "mobx";

function TopComponent() {
  const { store } = React.useContext(Context);
  React.useEffect(() => {
    store.setSteps(steps);
  }, []);

  console.log("steps", toJS(store.steps));
  const stepProps = {
    steps: store.steps,
    setActualStep: function (id: number) {
      store.setActualStep(id);
    },
  };

  return <Steps {...stepProps} />;
}
export default observer(TopComponent);
