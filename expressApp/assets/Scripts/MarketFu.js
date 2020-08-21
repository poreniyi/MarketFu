let table=document.getElementById('itemTable');
let price=document.getElementById('Price');
let LVL=document.getElementById("LVL");
let columns=[...document.querySelectorAll('.column')];

makeRequest=async()=>{
    let response= await fetch('/getItems');
    if(response.ok){
        let json=await response.json();
        console.log('reponse was ok');
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
    let changed=false;
    let upArrow='\u25B2';
    let downArrow='\u25BC';
    column.addEventListener('click',(e)=>{
        if(changed==false){
            column.textContent+=upArrow;
            changed=true;
        }
        if(column.textContent.endsWith(upArrow)){
            column.textContent=column.textContent.slice(0,-1)+downArrow;
        }
        else{
            column.textContent=column.textContent.slice(0,-1)+upArrow;
        }
        let isAscending=column.textContent.endsWith(upArrow) ? false: true;
        let value = column.id=='LVL' ? 1:2;
        console.log(value);
        sortColumns(isAscending,value);
    })
    
})

sortColumns=(sign,place)=>{
    let  rows, switching, i, x, y, shouldSwitch;
     switching=true;
     rows=table.rows;
    while(switching){
        switching=false;
        for( i=1;i< rows.length-1;i++){
            shouldSwitch=false
             x=rows[i].cells[place].textContent;
             y=rows[i+1].cells[place].textContent;
            if (sign){
                if(Number(x)<Number(y)){
                    shouldSwitch=true;
                    break;
                }
            }else{
                if(Number(x)>Number(y)){
                    shouldSwitch=true;
                    break;
                }
            }  
        }
        if (shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
            switching=true;
        }
    }
}   