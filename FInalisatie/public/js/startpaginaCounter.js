
/*POP UP LATEN VERSCHIJNEN EN VERDIJWEN STARTPAGINA BIJ HET KLIKKEN 
AANTAL TE ORDEREN MINIFIGS TOEVOEGEN*/
document.getElementById("button1").addEventListener("click",()=>{
    document.querySelector(".popup").style.display = "flex";

});

document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".popup").style.display = "none";

});

document.querySelector(".button2").addEventListener("click",()=>{
    document.querySelector(".popup").style.display = "none";
});
