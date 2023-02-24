/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
// import axios from "axios";

const inputGroupStyles = {
  div: " px-3 mb-4 ",
  label: "block uppercase tracking-wide text-gray-700 text-xs font-bold py-2",
  input:
    "appearance-none block w-full focus:outline-none focus:bg-gray-700 bg-gray-100 text-gray-700 rounded p-5 mb-3  text-3xl border-2  focus:border-blue-500 hover:border-slate-400 rounded-lg focus:text-white ",
  errorParagraf: "text-red-500 text-xs italic",
};

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    {...props}
    onFocus={(e) => {
      console.log(e.target.id);
      if (e.target.id === "zip") {
        console.log(e.target.selectionStart, e.target.selectionEnd);
        e.target.setSelectionRange(0, 0);
        e.target.value = "__ : ___";
      }
    }}
    onChange={(e) => {
      if (e.target.id === "zip") {
      }
    }}
  />
));

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, ...props }, ref) => (
    <div className='inline-block relative w-full'>
      <select
        className='block appearance-none w-full
        bg-gray-100   hover:border-white
          px-5 py-5 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        ref={ref}
        {...props}
      >
        {options.map(({ label, value }, index) => (
          <option className='' key={index} value={value}>
            <div className='pb-10'>{label}</div>
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        <svg
          className='fill-current h-4 w-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </div>
    </div>
  )
);

interface IFormInput {
  street: string;
  zip: string;
  house: string;
  local: string;
  level: string;
  intercome: string;
}

const AdressForm = () => {
  const { store } = useContext(Context);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);

    reset();
  };

  return (
    <div className='bg-white my-5'>
      <div className='text-3xl text-center font-bold p-5'>
        WPROWADŹ SWÓJ ADRES
      </div>
      <form id='myform' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid-cols-1 lg:grid lg:grid-cols-4 gap-4'>
          {/* Ulica */}
          <div className={inputGroupStyles.div + " " + "col-span-2 "}>
            <label className={inputGroupStyles.label} htmlFor='name'>
              Ulica
            </label>
            <Input
              className={inputGroupStyles.input}
              id='street'
              type='text'
              {...register("street", { required: true })}
            />
            {errors?.street?.type === "required" && (
              <p className={inputGroupStyles.errorParagraf}>
                Please fill out this field.
              </p>
            )}
          </div>
          <div className={inputGroupStyles.div}>
            <label className={inputGroupStyles.label} htmlFor='name'>
              Kod pocztowy
            </label>
            <Controller
              name={"zip"}
              control={control}
              defaultValue=''
              render={({ field }) => (
                <InputMask
                  className={inputGroupStyles.input}
                  mask='99-999'
                  {...field}
                />
              )}
            />
          </div>

          <div className={inputGroupStyles.div}>
            <label className={inputGroupStyles.label} htmlFor='name'>
              Dom
            </label>
            <Input
              className={inputGroupStyles.input}
              id='house'
              type='text'
              {...register("street", { required: true })}
            />
            {errors?.house?.type === "required" && (
              <p className={inputGroupStyles.errorParagraf}>
                Please fill out this field.
              </p>
            )}
          </div>
          <div className={inputGroupStyles.div}>
            <label className={inputGroupStyles.label} htmlFor='name'>
              Numer mieszkania
            </label>
            <Input
              className={inputGroupStyles.input}
              id='local'
              type='text'
              {...register("street", { required: true })}
            />
            {errors?.local?.type === "required" && (
              <p className={inputGroupStyles.errorParagraf}>
                Please fill out this field.
              </p>
            )}
          </div>
          <div className={inputGroupStyles.div}>
            <label className={inputGroupStyles.label} htmlFor='name'>
              Piętro
            </label>
            <Input
              className={inputGroupStyles.input}
              id='level'
              type='text'
              {...register("street", { required: true })}
            />
            {errors?.level?.type === "required" && (
              <p className={inputGroupStyles.errorParagraf}>
                Please fill out this field.
              </p>
            )}
          </div>
          {/* Kod od domofonu */}
          <div className={inputGroupStyles.div}>
            <label className={inputGroupStyles.label} htmlFor='name'>
              Kod od domofonu
            </label>
            <Input
              className={inputGroupStyles.input}
              id='level'
              type='text'
              {...register("intercome", { required: true })}
            />
            {errors?.intercome?.type === "required" && (
              <p className={inputGroupStyles.errorParagraf}>
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdressForm;
