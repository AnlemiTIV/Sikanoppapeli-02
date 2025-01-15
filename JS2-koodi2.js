//Toiminnot mitkä tapahtuvat sivun uudelleenlatautuessa
window.onload = function() {    
    var maara01 = localStorage.getItem('pelaajatMaara');

    if (window.location.href.match('pelaajien_nimet.html') != null) {
        
        if (maara01 == "4"){        
            document.getElementById("pelaajienNimiKentat2").style.display = "block";
            document.getElementById("pelaajienNimiKentat3").style.display = "block";
            document.getElementById("pelaajienNimiKentat4").style.display = "block";
            document.getElementById("kirjNimiID").innerHTML = "Kirjoita pelaajien nimet";
        }
        else if (maara01 == "3"){
            document.getElementById("pelaajienNimiKentat2").style.display = "block";
            document.getElementById("pelaajienNimiKentat3").style.display = "block";
            document.getElementById("pelaajienNimiKentat4").style.display = "none";
            document.getElementById("kirjNimiID").innerHTML = "Kirjoita pelaajien nimet";
        }
        
        else if (maara01 == "2") {
            document.getElementById("pelaajienNimiKentat2").style.display = "block";
            document.getElementById("pelaajienNimiKentat3").style.display = "none";
            document.getElementById("pelaajienNimiKentat4").style.display = "none";
            document.getElementById("kirjNimiID").innerHTML = "Kirjoita pelaajien nimet";
        }
        else if (maara01 == "1") {
            document.getElementById("pelaajienNimiKentat2").style.display = "none";
            document.getElementById("pelaajienNimiKentat3").style.display = "none";
            document.getElementById("pelaajienNimiKentat4").style.display = "none";
            document.getElementById("kirjNimiID").innerHTML = "Kirjoita pelaajan nimi";
        }
    }
}
if (window.location.href.match('index.html') || window.location.href.match('pisteiden_maara.html') != null ){    
    var temp = "2";
    var mySelect = document.getElementById('selector-nollaus');

    for (var i, j = 0; i = mySelect.options[j]; j++) {
        if (i.value == temp);
        mySelect.selectedIndex = j;
        break;
    }
}
//Pisteiden nollaus kun saavutaan sikanoppa sivustoon
if (window.location.href.match('sikanoppa2.html') != null) {
    //tarkoitus siis nollata kierrokset uudelleenlatauksella niin että aloitetaan pelaaja 1:stä. Pisteet nollataan, jotta vältytään turhilta ongelmilta!
    var pisteidenNollaus9000 = JSON.parse(localStorage.getItem('pelaajienPisteet'));
    var kaylapiKaikkiPelaajat = localStorage.getItem('pelaajatMaara');
    
    if (kaylapiKaikkiPelaajat == "4"){
        document.getElementById("pelari3").style.display = "block";
        document.getElementById("pelari4").style.display = "block";
        pisteidenNollaus9000[0] = 0;
        pisteidenNollaus9000[1] = 0;
        pisteidenNollaus9000[2] = 0;
        pisteidenNollaus9000[3] = 0;
    }
    else if (kaylapiKaikkiPelaajat == "3") {
        document.getElementById("pelari3").style.display = "block";
        pisteidenNollaus9000[0] = 0;
        pisteidenNollaus9000[1] = 0;
        pisteidenNollaus9000[2] = 0;
    }
    else if (kaylapiKaikkiPelaajat == "2"){
        pisteidenNollaus9000[0] = 0;
        pisteidenNollaus9000[1] = 0;
    }
    else if (kaylapiKaikkiPelaajat == "1"){
        pisteidenNollaus9000[0] = 0;
        document.getElementById("luovutaPainike").style.display = "none";
    }

    //Globaali muuttujien nollaus myös    
    heittoGlobal = 0;
    heittokerta = 0;
    saitYkkosen = 0;

    //Päivitetään/tallennetaan pelaajien pisteet localstorageen
    localStorage.setItem("pelaajienPisteet", JSON.stringify(pisteidenNollaus9000));

    var nimet20 = JSON.parse(localStorage.getItem('pelaajienNimet'));
    var pisteet20 = JSON.parse(localStorage.getItem('pelaajienPisteet'));

    //Asetetaan sivuston default tiedoiksi pelaajan 1:sen tiedot
    document.getElementById("pelaajanNumero").innerHTML = "Pelaaja 1";
    document.getElementById("pelaajanNimi0").innerHTML = nimet20[0];
    document.getElementById("pisteetJS").innerHTML = pisteet20[0];
}
//**********
//GLOBAL ALUE
var heittoGlobal = 0;
var heittokerta = 0;
var saitYkkosen = 0;
var htmlnNakyvaPiste = document.getElementById("pisteetJS");

var kierroksenPisteet = 0;
var kertyneetPisteet2 = 0;
var tripleScores = 0;

//1. funktio, 1. sivusta (index)
function pelaajienMaara() {
    let maara01 = document.querySelector(".pelaajat").value;
    localStorage.setItem('pelaajatMaara', maara01); //key, value
}

//.2 funktio //2. sivusta (pelaajien_nimet)
function pelaajienNimet() {
    var valuesArray = [];
    var pisteetArray = []; //nollat alussa, lisätään sen mukaan monta pelaajaa on, nested array 

    var errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    var pelaajanNimiPoimi = document.querySelectorAll('input[type="text"]');

    var kierrostenMaara = localStorage.getItem('pelaajatMaara');
    var kierrostenMaara2 = Number(kierrostenMaara);

    for (var i = 0; i < kierrostenMaara2; i++) { 
        var input = pelaajanNimiPoimi[i]; 
        var value2 = input.value.trim(); //trim() //string jonka takia ei toimi

        if (value2 === "") {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Nimet eivät saa jäädä tyhiksi!';
            return; // Lopetetaan funktio, ei siirrytä toiselle sivulle
        }

        valuesArray.push(value2); //nimet lisätään inputtien määrän mukaan
        pisteetArray.push(0); //0 default pisteet lisätään inputtien määrän mukaan

    localStorage.setItem('pelaajienNimet', JSON.stringify(valuesArray));
    localStorage.setItem('pelaajienPisteet', JSON.stringify(pisteetArray)); 
    }
    window.location.href ='pisteiden_maara.html';
    //Window location tänne, koska jos se on html:n painikkeessa, vie väkisin seuraavalle sivulle
}

function maksimiPisteet() { 

    let p_maara20 = document.querySelector(".max-pisteet").value; //string
    localStorage.setItem('maxPisteet', p_maara20); //key, value
}

function nopanHeitto() {

    var noppakerranpisteet = JSON.parse(localStorage.getItem("pelaajienPisteet"));

    if (heittokerta != 1){
        kertyneetPisteet2 += Number(noppakerranpisteet[heittoGlobal]); //pisteiden määrän tarkistusta varten
    }

    var pelaajaMaaraTarkista = localStorage.getItem('pelaajatMaara');

    if (saitYkkosen === 1 && pelaajaMaaraTarkista != "1"){
        return;
    }
    if (tripleScores === 3 && pelaajaMaaraTarkista != "1"){
        return
    }

    var peliLoppuu = JSON.parse(localStorage.getItem("maxPisteet"));
    
    const firstRandomNum = Math.floor(Math.random() *6) +1; //+1 koska muuten suurin on vain 5
    const secondRandomNum = Math.floor(Math.random() *6) +1; //2. noppa
    /*image/noppa1 to image/noppa6 (generates number between 1 and 6*/
    const firstDiceImage = "Kuvat/noppa" + firstRandomNum + ".png";
    const secondDiceImage = "Kuvat/noppa" + secondRandomNum + ".png";

    //Ehdot tulisi toimia oikein, ja pisteet näkyä oikein, vuoro vaihdetaan luovuttamalla vuoro, 3 tuplakertymät vie kaikki pisteet jne
    if (firstRandomNum != "1" && secondRandomNum != "1"){        
        if (firstRandomNum == secondRandomNum){
            
            tripleScores += 1;
            heittokerta = 1;

            document.getElementById("noppaKuvaVaihda").src = firstDiceImage;
            document.getElementById("noppaKuvaVaihda2").src = secondDiceImage;

            if (tripleScores === 3){

                document.getElementById("pisteetJS").innerHTML = 0; //tai htmlnNakyvaPiste.innerHTML = 0;
                kierroksenPisteet = 0; //nolla pistettä koska heitettiin 1
                kertyneetPisteet2 = 0; //jotta ei virhettä maksimipisteiden vertauksessa, koska pisteet menetettiin
                saitYkkosen = 1;  

                htmlnNakyvaPiste.innerHTML = kertyneetPisteet2;
                return;
            }
            console.log("pääsit tuplapiste ehtoon! Molemmat luvut samat")
            var kertyma = (Number(firstRandomNum) + Number(secondRandomNum)) * 2;
            kierroksenPisteet += kertyma;
            kertyneetPisteet2 += kertyma;
            htmlnNakyvaPiste.innerHTML = kertyneetPisteet2;
        }
        else {
            //localStorage.setItem("maxPisteet", JSON.stringify(noppakerranpisteet));
            document.getElementById("noppaKuvaVaihda").src = firstDiceImage;
            document.getElementById("noppaKuvaVaihda2").src = secondDiceImage;
            kierroksenPisteet += Number(firstRandomNum); 
            kertyneetPisteet2 += Number(firstRandomNum);
            kierroksenPisteet += Number(secondRandomNum);
            kertyneetPisteet2 += Number(secondRandomNum);

            htmlnNakyvaPiste.innerHTML = kertyneetPisteet2; //number?
            heittokerta = 1; //NYT saatiin html:ssä oleva piste määrä vaihdettua oikein! Vielä tosin koodattava vuorojenvaihdot! <<<<<<<<<<<<
        }
    }
    else {
        if (firstRandomNum == "1" && secondRandomNum == "1"){
            tripleScores += 1;
            heittokerta = 1;

            document.getElementById("noppaKuvaVaihda").src = firstDiceImage;
            document.getElementById("noppaKuvaVaihda2").src = secondDiceImage;

            if (tripleScores === 3){
                document.getElementById("pisteetJS").innerHTML = 0; //tai htmlnNakyvaPiste.innerHTML = 0;
                kierroksenPisteet = 0; //nolla pistettä koska heitettiin 1
                kertyneetPisteet2 = 0; //jotta ei virhettä maksimipisteiden vertauksessa, koska pisteet menetettiin
                saitYkkosen = 1;  

                htmlnNakyvaPiste.innerHTML = kertyneetPisteet2;
                return;
            }
            kierroksenPisteet += 25;
            kertyneetPisteet2 += 25;
            htmlnNakyvaPiste.innerHTML = kertyneetPisteet2;
        }
        else {
            document.getElementById("noppaKuvaVaihda").src = firstDiceImage;
            document.getElementById("noppaKuvaVaihda2").src = secondDiceImage; //is null, nopanHeitto
            saitYkkosen = 1;
            document.getElementById("pisteetJS").innerHTML = 0; //tai htmlnNakyvaPiste.innerHTML = 0;
            heittokerta = 1;
            kierroksenPisteet = 0; //nolla pistettä koska heitettiin 1
            kertyneetPisteet2 = 0; //jotta ei virhettä maksimipisteiden vertauksessa, koska pisteet menetettiin  
        }
    }
    /*tarkistaa onko heittäjä voittanut pelin nopanheitollaan*/
    if (Number(kertyneetPisteet2) >= Number(peliLoppuu)){        
        var nimet201 = JSON.parse(localStorage.getItem('pelaajienNimet'))

        document.getElementById("pelaajanNumero").innerHTML = "Onnittelut voittamisesta! Pisteitä yht" + ": " + kertyneetPisteet2;
        document.getElementById("pelaajanNimi0").innerHTML = nimet201[heittoGlobal] + " Voitti pelin";
        document.getElementById("noppaHeita").style.display = "none";
        document.getElementById("pelaaUudelleen").style.display = "block";
        document.getElementById("pelaaUudelleenAlku").style.display = "block";

        if (pelaajaMaaraTarkista != "1"){
            document.getElementById("luovutaPainike").style.display = "none";
        }
        
        if (heittoGlobal == 3){
            document.getElementById("pel4-Score").innerHTML = kertyneetPisteet2;
        }
        else if (heittoGlobal == 2){
            document.getElementById("pel3-Score").innerHTML = kertyneetPisteet2;
        }
        else if (heittoGlobal == 1){
            document.getElementById("pel2-Score").innerHTML = kertyneetPisteet2;
        }
        else {
            document.getElementById("pel1-Score").innerHTML = kertyneetPisteet2;
        }
    }
}

function vaihdaVuorosi(){ 

    var noppakerranpisteet20 = JSON.parse(localStorage.getItem("pelaajienPisteet"));
    noppakerranpisteet20[heittoGlobal] += kierroksenPisteet;

    localStorage.setItem("pelaajienPisteet", JSON.stringify(noppakerranpisteet20));

    var nimet200 = JSON.parse(localStorage.getItem('pelaajienNimet'))
    var pelaajaMaaraTarkista2 = localStorage.getItem('pelaajatMaara');
    var viimEkaan = 0;
    kierroksenPisteet = 0; //nollataan kertyneet pisteet uudella pelaajakierroksella
    kertyneetPisteet2 = 0; //sama idea

    if (heittokerta == 1){

        if (heittoGlobal == 3){
            /*4. pelaaja vuoro loppui*/
            document.getElementById("pisteetJS").innerHTML = Number(noppakerranpisteet20[0]); //vuoro 1. pelaajalle eli [0]
            document.getElementById("pel4-Score").innerHTML = Number(noppakerranpisteet20[3]);
            document.getElementById("pelaajanNumero").innerHTML = "Pelaaja 1";
            document.getElementById("pelaajanNimi0").innerHTML = nimet200[0];
            viimEkaan = 1;
            saitYkkosen = 0;
        }
        else if (heittoGlobal == 2){
            /*3. pelaaja vuoro loppui*/
            if (pelaajaMaaraTarkista2 == "3"){
                document.getElementById("pisteetJS").innerHTML = Number(noppakerranpisteet20[0]);
                document.getElementById("pel3-Score").innerHTML = Number(noppakerranpisteet20[2]);
                document.getElementById("pelaajanNumero").innerHTML = "Pelaaja 1";
                document.getElementById("pelaajanNimi0").innerHTML = nimet200[0];
                viimEkaan = 1;
            }
            else {
                document.getElementById("pisteetJS").innerHTML = Number(noppakerranpisteet20[3]);
                document.getElementById("pel3-Score").innerHTML = Number(noppakerranpisteet20[2]);
                document.getElementById("pelaajanNumero").innerHTML = "Pelaaja 4";
                document.getElementById("pelaajanNimi0").innerHTML = nimet200[3];
            }
            saitYkkosen = 0;
        }
        else if (heittoGlobal == 1){
            /*2. pelaajan vuoro loppui*/
            if (pelaajaMaaraTarkista2 == "2"){
                
                document.getElementById("pisteetJS").innerHTML = Number(noppakerranpisteet20[0]);
                document.getElementById("pel2-Score").innerHTML = Number(noppakerranpisteet20[1]);
                document.getElementById("pelaajanNumero").innerHTML = "Pelaaja 1";
                document.getElementById("pelaajanNimi0").innerHTML = nimet200[0];
                viimEkaan = 1;
            }
            else {
                document.getElementById("pisteetJS").innerHTML = Number(noppakerranpisteet20[2]); //vuoro 3. pelaajalle eli [2]
                document.getElementById("pel2-Score").innerHTML = Number(noppakerranpisteet20[1]);
                document.getElementById("pelaajanNumero").innerHTML = "Pelaaja 3";
                document.getElementById("pelaajanNimi0").innerHTML = nimet200[2];
            }
            saitYkkosen = 0;
        }
        else if (heittoGlobal == 0 && pelaajaMaaraTarkista2 != "1"){
            /*1. pelaaja vuoro loppui*/
            document.getElementById("pisteetJS").innerHTML = Number(noppakerranpisteet20[1]); //vuoro 2. pelaajalle eli [1]
            document.getElementById("pel1-Score").innerHTML = Number(noppakerranpisteet20[0]);
            document.getElementById("pelaajanNumero").innerHTML = "Pelaaja 2";
            document.getElementById("pelaajanNimi0").innerHTML = nimet200[1];
            saitYkkosen = 0;
        }

        if (pelaajaMaaraTarkista2 != "1"){
            heittoGlobal += 1;
        }
        
        if (viimEkaan == 1){
            heittoGlobal = 0;
            viimEkaan = 0;
        }
        heittokerta = 0; //reset jotta seuraava pelaaja voi heittää noppaa
        tripleScores = 0; //triplet nollautuu uudella pelaaja kierroksella
    }
}