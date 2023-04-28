import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

function AreaCounter() {
  const { store } = useContext(Context);
  return (
    <div className='flex-1 flex gap-x-2 items-stretch justify-between text-lg lg:text-2xl font-bold bg-slate-50 drop-shadow-xl  max-w-lg '>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          store.decreaseArea();
        }}
      >
        -
      </button>
      <div className='flex gap-x-2 justify-center items-center py-6'>
        <div>
          <input
            value={store.area ? store.area : "Powierzchnia"}
            style={{
              width:
                store.area === 0
                  ? "120px"
                  : `${(store.area.toString().length + 1) * 14}px`,
            }}
            maxLength={255}
            className={`focus:outline-none text-center ${
              store.area === 0 ? "text-lg" : "text-2xl"
            }`}
            onChange={(e) => {
              store.setArea(e);
            }}
          />
        </div>
        <p>m2</p>
      </div>
      <button
        className='py-6 px-8 hover:bg-slate-100 transition-transform lg:text-4xl'
        onClick={() => {
          store.increaseArea();
        }}
      >
        +
      </button>
    </div>
  );
}
export default observer(AreaCounter);
