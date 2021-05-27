var minifigCounter = document.querySelector(".startPaginaCounter");


/*POP UP LATEN VERSCHIJNEN EN VERDIJWEN MINIFIGUREN PAGINA ALS
ER MINIFIGUREN WEL OF NIET AANWEZIG ZIJN
*/
if (minifigCounter.innerText==0)
{
    document.querySelector(".popupAlt").style.display = "flex";
}else{
    document.querySelector(".popupAlt").style.display = "none";
}

