let table=document.getElementById('itemTable');
let price=document.getElementById('Price');
let LVL=document.getElementById("LVL");
let columns=[...document.querySelectorAll('.column')];
const search= document.querySelector('#search');
let pageButtons=[...document.querySelectorAll('.PageButtons')];
let pageText=document.getElementById('pageText');
let page=document.getElementById('pageNumber');
let totalPages=document.getElementById('totalPages');
page.textContent=1;
let tableRows=[];
let itemsPerPage=3;

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
        tableRows.push(row);
        if(element.image){
            image.textContent=element.name;
        }
        let imageObject=document.createElement('IMG');
        let imgSrc1='https://cdn.discordapp.com/attachments/744256656837312592/746091636630618152/unknown.png'
        let imgSrc2='https://cdn.discordapp.com/attachments/527875131360673793/746786387323519017/unknown.png'
        imageObject.src=imgSrc1;
        imageObject.class='tabileImages';
        imageObject.style.height='100%';
        //imageObject.style.width='100%';
        image.appendChild(imageObject);
        image.classList.add('imageCells');
    });
    let totalPageLength=Math.ceil(tableRows.length/itemsPerPage);
    totalPages.textContent=totalPageLength;
    for (let i=0;i<tableRows.length;i++){
        if(i<=itemsPerPage-1){
            continue;
        }else{
            tableRows[i].style.display='none';
        }
    }
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
search.addEventListener('input', (e)=>{
    let filter=search.value.toLowerCase();
    let rows=table.rows;
    let td;
    for(let i=1 ;i<rows.length;i++){
        let tableRow=rows[i];
        td=tableRow.cells[0];
        if(td){
            let textValue=td.textContent.toLowerCase();
            if(textValue.indexOf(filter)>-1){
                tableRow.style.display='';
            }else{
                tableRow.style.display='none';
            }
        }
    }
})

pageButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        let pageNumber=Number(page.textContent);
        let newPageNumber;
        let increment= button.textContent=='Previous' ? -1:1;
        newPageNumber=increment+pageNumber;
        console.log(`New page number is ${newPageNumber}`);
        let maxPage=Math.ceil(tableRows.length/itemsPerPage);
        if(newPageNumber<=maxPage && newPageNumber>0){
            console.log(`Maximum Page  number is ${maxPage}`);
            pageNumber+=increment;
            let lowerLimit=((pageNumber-1)*itemsPerPage)-1;
            let upperLimit=lowerLimit+itemsPerPage;
            console.log(lowerLimit,upperLimit);
            for(let i=0;i<tableRows.length;i++){
                if(i>lowerLimit&&i<=upperLimit){
                    tableRows[i].style.display='';
                }else{
                    tableRows[i].style.display='none';
                }
            }
            page.textContent=pageNumber;
        }
    })
})