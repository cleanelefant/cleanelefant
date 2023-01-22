import React from "react";
import { questionsType } from "../../types";

interface IQuestions{
    questions:questionsType[]
}

export default function Questions(props:IQuestions) { 
   
    const[state, setState] = React.useState(props.questions)

    const clickHandler = (id:number)=>{
        setState([...state].map((item) => {
            if (id===item.id) {return {...item,isVisible:!item.isVisible}} 
            else {return item}
        }))
    }

    return <div className="lg:pt-5 lg:pb-10 px-2 lg:mx-28 ">
        {state.map(q=><div key={q.id}>
            <div className="font-bold text-2xl hover:underline cursor-pointer"  onClick={()=>{clickHandler(q.id)}}>{q.question}</div>
            <div className={`${q.isVisible?"block":"hidden"}`}>{q.answer}</div>
        </div>)}
    </div>
}