import React from "react";
import { OrderStateType } from "../../types";

export default function Order() {
  const [state, setState] = React.useState<OrderStateType>({
    room: 1,
    bedroom: 1,
  });

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const rooms = queryParams.get("rooms");
    const bedrooms = queryParams.get("bedrooms");
    setState({ room: Number(rooms), bedroom: Number(bedrooms) });
  }, []);

  return (
    <div className='border-black border-2 '>
      <div>
        <p>{state.room}</p>
        <p>{state.bedroom}</p>
      </div>
    </div>
  );
}
