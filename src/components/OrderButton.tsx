import React from "react";
import { setWordInRightWay } from "../utils/word";


export default function OrderButton(props:{min:number, title:string, foo: (state:number) => void}) {
    const [state, setState] = React.useState(props.min);
   
     const increase = ()=>{setState(s=>s+1)}
     const decrease = ()=>{setState(s=>{if(s>props.min){return s-1} else {return s}} )}

     React.useEffect(()=>{     
        props.foo(state) // send value to upper level
     },[state])
     

 
    return <div className="flex items-center gap-x-16 bg-white text-2xl font-bold px-5 py-2 rounded-xl">
         <button className="text-3xl rounded-md hover:bg-slate-100 transition duration-300  py-5 px-5" onClick={decrease}>-</button> 
         <div className="flex gap-x-5"><p>{state}</p><p>{setWordInRightWay(props.title,state)}</p></div>        
         <button className="text-3xl rounded-md hover:bg-slate-100 transition duration-300  py-5 px-5"  onClick={increase}>+</button>      
    </div>;
  }