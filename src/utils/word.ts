export function setWordInRightWay(word:string,num:number){
    if(num===1){return word}
    if (word==="pokój"){        
           if(num>1&&num<5) {return "pokoje"}
           if(num>4) {return "pokoi"}
    }
    if (word==="łazienka"){        
        if(num>1&&num<5) {return "łazienki"}
        if(num>4) {return "łazienek"}
 }

}