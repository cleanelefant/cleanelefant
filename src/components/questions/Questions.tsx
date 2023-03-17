import React from "react";
import { questionsType } from "../../types";
import arrow from "../../images/up-arrow.webp";

interface IQuestions {
  questions: questionsType[];
}

export default function Questions(props: IQuestions) {
  const [state, setState] = React.useState(props.questions);
  const [inter, setInter] = React.useState(false);
  const topRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const clickHandler = (id: number) => {
    setState(
      [...state].map((item) => {
        if (id === item.id) {
          return { ...item, isVisible: !item.isVisible };
        } else {
          return item;
        }
      })
    );
  };

  React.useEffect(() => {
    const top_observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (!inter) {
          setInter(true);
        }
      }
    });
    const bottom_observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (!inter) {
          setInter(true);
        }
      }
    });
    if (topRef.current) {
      top_observer.observe(topRef.current);
    }
    if (bottomRef.current) {
      bottom_observer.observe(bottomRef.current);
    }
  }, []);

  return (
    <div
      className='relative lg:pt-5 lg:pb-10 px-2 lg:mx-[300px]'
      itemScope
      itemType='https://schema.org/FAQPage'
    >
      <div className='absolute top-[-120px] h-px' ref={topRef}></div>
      {state.map((q) => (
        <div
          key={q.id}
          itemScope
          itemProp='mainEntity'
          itemType='https://schema.org/Question'
        >
          <div
            className='font-bold text-2xl hover:underline cursor-pointer flex gap-x-4'
            onClick={() => {
              clickHandler(q.id);
            }}
          >
            <div className='basis-[32px] shrink-0'>
              <img
                className={`${
                  q.isVisible && "rotate-180"
                } transition duration-300`}
                src={inter ? arrow : ""}
                alt='arrow'
                width={32}
                height={32}
              />
            </div>
            <div itemProp='name'>{q.question}</div>
          </div>
          <div
            className={`${q.isVisible ? "block" : "hidden"} w-3/4 mb-5 mt-2`}
            itemScope
            itemProp='acceptedAnswer'
            itemType='https://schema.org/Answer'
          >
            <span itemProp='text'>{q.answer}</span>
          </div>
          <div className='border-b my-5 border-neutral-200'></div>
        </div>
      ))}
      <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
    </div>
  );
}
