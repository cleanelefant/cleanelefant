import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../renovation/index";

interface ILauncher {
  setVat(value: number): void;
}

interface IVatData {
  rate: number;
}

function Launcher({ setVat }: ILauncher) {
  const [error, setError] = React.useState(null);
  const [is_vata_data, setVataData] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [vat, setLauncherVat] = React.useState<null | number>(null);
  // const { store } = useContext(Context);
  const privateClickHandler = () => {
    setIsActive(false);
    setVat(1);
  };
  const companyClickHandler = () => {
    setIsActive(true);
    setVat(vat);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Imitation data fetching
        const imitationData = await new Promise<IVatData>((resolve) => {
          setTimeout(() => {
            resolve({ rate: 1.23 });
          }, 2000); // Wait for 2 seconds
        });
        setLauncherVat(imitationData.rate);
        setVataData(true);
      } catch (err) {
        // Catch any errors and set the error state
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (!is_vata_data) {
    return <div>LOADING...</div>;
  }
  if (error) {
    return <div>Something happened wrong</div>;
  }
  return (
    <div className='flex gap-x-4 text-lg lg:text-3xl font-bold '>
      <button
        className={`py-6 px-8  transition-transform drop-shadow-xl rounded ${
          isActive ? "bg-slate-200" : "bg-blue-700 text-white"
        }`}
        onClick={privateClickHandler}
      >
        Osoba prywatna
      </button>
      <button
        className={`py-6 px-8  transition-transform drop-shadow-xl rounded ${
          !isActive ? "bg-slate-200" : "bg-blue-700 text-white"
        }`}
        onClick={companyClickHandler}
      >
        Firma
      </button>
    </div>
  );
}

export default observer(Launcher);
