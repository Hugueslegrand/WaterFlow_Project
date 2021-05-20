const fetch1 = require('node-fetch');
const express = require('express');
const app = express();
const ejs = require('ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('port', 3000);

//Variabel om gevonden gegevens gevonden in de API op te slagen

const alleminifiguren = {
    geordend: 0,
    aantal: 0,
    sets:
    [
        {}
    ]
    ,
    resultaten:
    [
    {}
   ]
} 



const legoFigs = async () => {
    //random nummer voor de pagina van de API zodat het niet steeds dezelfde kiest
    let randomPageNummer = Math.round(Math.random() * (100 - 1 + 1) + 1);
    let figs = await fetch1(`https://rebrickable.com//api/v3/lego/minifigs/?page=${randomPageNummer}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'key 3ef36135e7fda4370a11fd6191fef2af'
        }
    });

    let figuur = await fetch1('https://rebrickable.com/api/v3/lego/minifigs/fig-001799/',{
    headers:{
        'Accept': 'application/json',
        'Authorization': 'key 3ef36135e7fda4370a11fd6191fef2af'
    }
    }).then((response: any) => response.json())
    const hardCodeFig ={
        name:'',
        set_img_url:'',
        set_nummer:''
}
   hardCodeFig.name=figuur.name;
   hardCodeFig.set_img_url=figuur.set_img_url;
   hardCodeFig.set_nummer=figuur.set_num;
  

    let figJson = await figs.json();

    /**
     * Een lus dat een aantal keren itereert afhankelijk van de hoeveelheid de gebruiker in geeft
     * om een willekeurig minifiguur te halen uit de api
     * deze gegevens worden tijdelijke opgeslagen in de variabel minifiguur
     */
     

    for (let index = 0; index < alleminifiguren.aantal; index++) {
        const minifiguur =
        {
            name: '',
            set_img_url: '',
            set_nummer: ''
        };
        //een random nummer dat binnen de scope van resultaten ligt
        let randomMinifigNummer = Math.round(Math.random() * figJson.results.length);

        minifiguur.name = figJson.results[randomMinifigNummer].name;
        minifiguur.set_img_url = figJson.results[randomMinifigNummer].set_img_url;
        minifiguur.set_nummer = figJson.results[randomMinifigNummer].set_num;

        alleminifiguren.resultaten[index] = minifiguur;
        alleminifiguren.resultaten[alleminifiguren.aantal] = hardCodeFig;

        /**
         * Nu gaan we de set gaan halen per gegenereerde minifiguur en hetzelfde doen
         * om het op te slaan als bij de minifiguren
         */

        let sets = await fetch1(`https://rebrickable.com/api/v3/lego/minifigs/${minifiguur.set_nummer}/sets/`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'key 3ef36135e7fda4370a11fd6191fef2af'
            }
        });
        let setJson = await sets.json();
        let setCount = setJson.count;
        for (let setIndex = 0; setIndex < setCount; setIndex++) {
            const set =
            {
                name: '',
                set_img_url: ''
            }
                ;
            set.name = setJson.results[setIndex].name;
            set.set_img_url = setJson.results[setIndex].set_img_url; 
            alleminifiguren.sets[index] = set;
           
        }


    }
    console.log(alleminifiguren);
   
};


app.get('/catalogus', (req: any, res: any) => {
    res.render('catalogus');
});
app.get('/index', (req: any, res: any) => {
    res.render('index');
});
app.get('/minifiguren', (req: any, res: any) => {
    res.render('minifigs',alleminifiguren);
});
app.post('/minifiguren',(req:any,res:any)=>{
    alleminifiguren.aantal = alleminifiguren.aantal + parseInt(req.body.aantal);
    legoFigs();
    res.render('lego',alleminifiguren);
})

app.get('/lego', (req: any, res: any) => {
    res.render('lego',alleminifiguren);
});

app.post('/lego',(req:any,res:any)=>{
    if(parseInt(req.body.aantal) > 10){
        req.body.aantal == 10;
    }
    alleminifiguren.aantal = alleminifiguren.aantal + parseInt(req.body.aantal);
    console.log(alleminifiguren.aantal);
    legoFigs();
    res.render('lego',alleminifiguren);
})

app.get('/minifiguren/:index',(req:any,res:any)=>{
    let index = req.params.index;
    //Aantal te ordenen en geordend dat getoond wordt updaten
    alleminifiguren.aantal = alleminifiguren.aantal - 1;
    alleminifiguren.geordend = alleminifiguren.geordend + 1;
    console.log(alleminifiguren.geordend)
    //De minifiguur weghalen
    alleminifiguren.resultaten.splice(index, 1);
    //De minifiguur weghalen
    alleminifiguren.sets.splice(index,1);
    console.log(alleminifiguren.resultaten);
    res.render('sets', alleminifiguren.sets[index]);
})

app.get('/contact', (req: any, res: any) => {
    res.render('contact');
});


app.listen(app.get('port'),
() => console.log('[server] http://localhost:' + app.get('port')));


