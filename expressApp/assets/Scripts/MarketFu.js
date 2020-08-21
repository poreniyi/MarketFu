let table=document.getElementById('itemTable');
let price=document.getElementById('Price');
let LVL=document.getElementById("LVL");
let columns=[...document.querySelectorAll('.column')];
console.log(columns);
console.log(LVL,price);
console.log(table);

makeRequest=async()=>{
    let response= await fetch('/getItems');
    if(response.ok){
        console.log(response);
        let json=await response.json();
        console.log('reponse was ok',json);
        addItemsToTable(json);
    }
}
makeRequest();

makeRequest2=async()=>{
    let response= await fetch();
}

addItemsToTable=(list)=>{
    while (table.rows.length>1){
        table.deleteRow(1); 
    }
    list.forEach(element => {
        let row =table.insertRow(1);
        let name =row.insertCell(0);
        let lvl=row.insertCell(1);
        let price=row.insertCell(2);
        let image=row.insertCell(3);
        name.textContent=element.name;
        lvl.textContent=element.LVL;
        price.textContent=element.price;
        if(element.image){
            image.textContent=element.name;
        }

    });
}

columns.forEach(column=>{
    column.addEventListener('click',(e)=>{
        sortColumns();
    })
    
})

sortColumns=()=>{
    let  rows, switching, i, x, y, shouldSwitch;
     switching=true;
     rows=table.rows;
    while(switching){
        switching=false;
        for( i=1;i< rows.length-1;i++){
            shouldSwitch=false
             x=rows[i].cells[1].textContent;
             y=rows[i+1].cells[1].textContent;
            console.log(`x:${x} y:${y}`);
            if(Number(x)>Number(y)){
                console.log(`${x} is bigger than y ${y}`);
                shouldSwitch=true;
                break;
            }
        }
        if (shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
            switching=true;
        }
    }
}   