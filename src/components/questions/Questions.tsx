import React from "react";
import { questionsType } from "../../types";

interface IQuestions {
  questions: questionsType[];
}

export default function Questions(props: IQuestions) {
  const [state, setState] = React.useState(props.questions);

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

  return (
    <div
      className="lg:pt-5 lg:pb-10 px-2 lg:mx-60 mb-3"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {state.map((q) => (
        <div
          key={q.id}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <div
            className="font-bold text-2xl hover:underline cursor-pointer"
            onClick={() => {
              clickHandler(q.id);
            }}
          >
            <span itemProp="name">{q.question}</span>
          </div>
          <div
            className={`${q.isVisible ? "block" : "hidden"} w-3/4 mb-5`}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <span itemProp="text">{q.answer}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
