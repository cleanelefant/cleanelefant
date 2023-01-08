import React from "react";
import { setWordInRightWay } from "../utils/word";


export default function OrderButton(props:{min:number, title:string, foo: (state:number) => void}) {
    const [state, setState] = React.useState(props.min);
   
     const increase = ()=>{setState(s=>s+1)}
     const decrease = ()=>{setState(s=>{if(s>props.min){return s-1} else {return s}} )}

     React.useEffect(()=>{     
        props.foo(state) // send value to upper level
     },[state])
     

 
    return <div className="border-black border-2">
        <button onClick={increase}>plus</button>
        <div className="flex"><p>{state}</p><p>{setWordInRightWay(props.title,state)}</p></div>
        <button onClick={decrease}>minus</button>        
    </div>;
  }