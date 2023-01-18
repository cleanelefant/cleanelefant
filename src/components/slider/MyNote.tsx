interface IMyNote {
  slide: number;
  id: number;
  text: string;
  x: string;
  y: string;
  isLeft: boolean;
}

export default function MyNote(props: IMyNote) {
  const { id, slide, text, x, y, isLeft } = props;
  if (slide === id) {
    return (
      <div
        className={`absolute ${x} ${y} 
        bg-slate-100 opacity-80 px-4 py-2 rounded-md font-bold`}
      >
        <div
          className={`flex ${
            isLeft ? "flex-row" : "flex-row-reverse"
          } justify-center items-center gap-x-2 `}
        >
          <div className='w-5 h-5 bg-sky-700 rounded-full'></div>
          <div className='max-w-[250px]'>{text}</div>
        </div>
      </div>
    );
  } else return null;
}
