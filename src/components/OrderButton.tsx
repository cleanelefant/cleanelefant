import React from "react";


export default function OrderButton(props:{min:number, title:string, foo: (state:number) => void}) {
    const [state, setState] = React.useState(props.min);
   
     const increase = ()=>{setState(s=>s+1)}
     const decrease = ()=>{setState(s=>{if(s>props.min){return s-1} else {return s}} )}

     React.useEffect(()=>{
        console.log(props.title)
        props.foo(state)
     },[state])
     

 
    return <div className="border-black border-2">
        <button onClick={increase}>plus</button>
        <div><p>{state}</p><p>{props.title}</p></div>
        <button onClick={decrease}>minus</button>        
    </div>;
  }