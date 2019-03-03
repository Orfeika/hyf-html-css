let data = [
    {"text":"buy milk","tagText":"grocery store","listID":1,"itemID":1},
    {"text":"buy cat food ","tagText":"grocery store","listID":1,"itemID":2},
    {"text":"buy milk","tagText":"I am tag","listID":1,"itemID":1},
    {"text":"buy cat food ","tagText":"I am tag","listID":1,"itemID":2}]

let output = [];

    data.forEach((item) => {
        let existing = output.filter((v,i)=>{
            return v.itemID == item.itemID;
        });
        if(existing.length){
            let existingIndex = output.indexOf(existing[0]);
            output[existingIndex].tagText = output[existingIndex].tagText.concat(item.tagText);
        } else {
            if(typeof item.tagText == 'string'){
                item.tagText = [item.tagText];
                output.push(item);
            }

        }
    })
 
    console.dir(output);
  

  
  
