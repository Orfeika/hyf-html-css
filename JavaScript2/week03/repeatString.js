
//1
function repeatStringNumTimesFor(str, num) {
    let nStr= "";
    for(let i = 0; i<num; i++){
      nStr+=str;
    }
    console.log(nStr);
    return nStr;
  }
  
  repeatStringNumTimesFor("abc", 3);

  //2
  function repeatStringNumTimesWhile(str, num) {
    let nStr= "";
    let i = 0;
    while(i<num){
      nStr+=str;
      i++;
    }
    console.log(nStr);
    return nStr;
  }
  
  repeatStringNumTimesWhile("abc", 3);

    //3
    function repeatStringNumTimesDoWhile(str, num) {
        let nStr= "";
        let i = 0;
        do{
          if(num>0){
          nStr+=str;
          i++;
          }else{
        i=num;
          }
        }while(i<num)
        console.log(nStr);
        return nStr;
      }
      
      repeatStringNumTimesWhile("abc", 3);