export default function Test () {
    const divClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{console.log(e.target)}
    const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{console.log(e.target)}
    return (<div className="flex justify-center items-center p-10 bg-slate-500" onClick={(e)=>{divClickHandler(e)}}>
        <button className="bg-blue-500 text-white p-4" onClick={(e)=>{buttonClickHandler(e)}} >Button</button>
    </div>)
}