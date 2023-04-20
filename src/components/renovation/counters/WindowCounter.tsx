import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function setPoland(windows: number) {
  if (!windows) {
    return "okien";
  }
  if (windows === 1) {
    return "okno";
  }
  if (windows > 1 && windows < 5) {
    return "okna";
  }
  if (windows > 4) {
    return "okien";
  }
}

function WindowsCounter() {
  const { store } = useContext(Context);
  return (
    <div className='flex-1 flex gap-x-4 items-stretch justify-between text-lg lg:text-2xl font-bold bg-slate-50 drop-shadow-xl min-w-[350px] max-w-lg '>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          store.decreaseWindows();
        }}
      >
        -
      </button>
      <div className='flex gap-x-4 justify-center items-center py-6'>
        {store.windows} {setPoland(store.windows)}
      </div>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          store.increaseWindows();
        }}
      >
        +
      </button>
    </div>
  );
}
export default observer(WindowsCounter);
