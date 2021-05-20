var noti = document.querySelector('h1');
var select = document.querySelector('.select');
var button = document.getElementsByClassName('button');
var ordenen = document.querySelector('.buy-2');
var displa
for (but of button) {
    var geordenendeAantal = 0;
    var elementenTeVerwijderen = 0;
    but.addEventListener('click', (e) => {
        geordenendeAantal = geordenendeAantal + 1;
        var add = Number(noti.getAttribute('data-count') || 0);
        noti.setAttribute('data-count', add + 1);
        noti.classList.add('zero');
        elementenTeVerwijderen = elementenTeVerwijderen + 1;


        // copy and paste elementen
        var parent = e.target.parentNode;
        var clone = parent.cloneNode(true);
        select.appendChild(clone);
        clone.lastElementChild.innerText = "Verwijder";
        if (clone) {
            noti.onclick = () => {
                select.classList.toggle('display');
            }
        }
        if (clone) {
            clone.lastElementChild.onclick = () => {
                select.removeChild(clone)
                add = Number(noti.getAttribute('data-count') || 0);
                noti.setAttribute('data-count', add - 1);
                geordenendeAantal = geordenendeAantal - 1;
                elementenTeVerwijderen = elementenTeVerwijderen - 1;
            }
        }
        //Als je ordenen click wordt de basket geleegd
        ordenen.onclick = () => {
            const confirmatie = confirm("Wil je deze items ordenen?");
            if (confirmatie == true) {
                const afTeTrekkenVanTotaal = 0;
                while (elementenTeVerwijderen >= 1) {
                    select.removeChild(select.lastElementChild);
                    elementenTeVerwijderen = elementenTeVerwijderen - 1;
                    add = Number(noti.getAttribute('data-count') || 0);
                    noti.setAttribute('data-count', add - 1);
                    geordenendeAantal = geordenendeAantal - 1;
                }
                select.classList.toggle('display');
            } else {
            }
        }
    });
}