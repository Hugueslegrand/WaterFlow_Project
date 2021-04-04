
/*POP UP LATEN VERSCHIJNEN EN VERDIJWEN STARTPAGINA BIJ HET KLIKKEN 
AANTAL TE ORDEREN MINIFIGS TOEVOEGEN*/
document.getElementById("button1").addEventListener("click",()=>{
    document.querySelector(".popup").style.display = "flex";

});

document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".popup").style.display = "none";

});


var nummerOmToeTeVoegen= 0;


var fieldNameElement = document.getElementById('field_name');



document.querySelector(".button2").addEventListener("click",()=>{
    document.querySelector(".popup").style.display = "none";
    nummerOmToeTeVoegen = document.getElementById("toegevoegdeNummer").value;
    console.log(nummerOmToeTeVoegen);


    fieldNameElement.textContent= parseInt(fieldNameElement.textContent) + parseInt(nummerOmToeTeVoegen);
    
    

    /*var target = counters.innerText;
    
    
        var count = target + nummerOmToeTeVoegen;
        var inc = target / speed;
        counters.innerText = count +inc;
        
            counters.innerText = target;
        
    */
});






