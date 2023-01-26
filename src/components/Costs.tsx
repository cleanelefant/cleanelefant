import sunrise from "../images/sunrise.webp"
import useIntersection from "../utils/useObserver";
export default function Costs(){
  const { bottomRef, topRef, intersection } = useIntersection();
  return (
    <section className="relative p-5 text-white 2xl:px-40 flex items-center lg:py-20
" style={{ backgroundImage: `url(${intersection?sunrise:''}) `, backgroundRepeat: 'no-repeat', backgroundSize:"cover", backgroundPosition:"50% 50%"}} >
  <div className='absolute top-[-120px] h-px' ref={topRef}></div>
    <div className="">
    <h2 className="pb-10 font-bold text-3xl lg:text-6xl">Sprzątanie Zielona Góra</h2>
    <div className="pb-10 font-bold text-2xl">
      Postaw na profesjonalne sprzątanie mieszkań Zielona Góra. Firma skutecznie zadba o porządek w Twoim mieszkaniu.      
    </div>   
        <a
          href={`/order`}
          className='transition duration-300  text-white text-lg lg:text-xl font-bold'
        >
        <div className='flex justify-center w-80 py-5 lg:py-5 bg-[#2457c6] hover:bg-[#2457c6b9] rounded-xl'>
          Policz koszty<span className='ml-16 text-2xl'>&#8594;</span>
        </div>
        </a>
      </div>
      <div className='absolute bottom-[-120px] h-px ' ref={bottomRef}></div>
</section>
  )

}


