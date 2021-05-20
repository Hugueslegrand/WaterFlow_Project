document.getElementById("set_button").addEventListener("click",()=>{
    document.querySelector(".set_popup").style.display = "flex";
});
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".set_popup").style.display = "none";

});