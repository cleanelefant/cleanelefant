import React from "react";


export default function Description(props:{name?:string}) {
    const [state, setState] = React.useState(true);
   
    const myRef = React.useRef<HTMLDivElement>(null);
   
 
    return <section>
        <div style={{height:"1px",backgroundColor:"transparent"}} ref={myRef}></div>
        <h1>Hello</h1>
        <p>Lorem ...</p>
        <img style={{width:"100%",height:"auto"}} src={state?"https://res.cloudinary.com/du9w3xgvx/image/upload/v1664722539/table_grpmdl.webp":""} alt="law office"  height={576} width={1053} />
    </section>;
  }