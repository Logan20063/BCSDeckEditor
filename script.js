function addToDeck(card) {
    //element = document.getElementById("deck");
    if(!deck.has(card)) {
        deck.set(card, 1);
        // child = document.createElement("div");
        // p = document.createElement("p");
        // p.innerHTML="1X" + card;
        // child.appendChild(p);
    } else {
        deck.set(card, deck.get(card)+1);
    }



    formatDeck = "";
    for(key of deck.keys()) {
        formatDeck += deck.get(key) + "X " + key + "<br>";
    }
    document.getElementById("test").innerHTML = formatDeck;
}

function changePage(direction) {
    if(direction == "left") {
        page--
    } else if(direction == "right"){
        page++
    }
    for(let i=1; i <= 10; i++) {
        if(cards.length < (page * 10 + i)) {
            document.getElementById("card" + i).style.visibility = "hidden";
        } else {
            document.getElementById("card" + i).style.visibility = "visible";
            document.getElementById("card" + i).src = cards[page*10 + i-1].url;
            document.getElementById("card" + i).alt=cards[page*10+i-1].name;
        }
    }
}

function sortCards(type) {
    if(type == "Gold") {
        cards.sort(function(a, b) {
            if(a.cost - b.cost != 0) {
                return a.cost-b.cost;
            } else {
                return a.name.localeCompare(b.name);
            }
        })
    } else if(type == "Name") {
        cards.sort(function(a,b) {return a.name.localeCompare(b.name)});
    } else if(type == "Attack") {
        cards.sort(function(a,b){
            if(a.attack - b.attack != 0) {
                return a.attack - b.attack;
            } else {
                if(a.cost - b.cost != 0) {
                    return a.cost - b.cost;
                } else {
                    return a.name.localeCompare(b.name);
                }
            }
        });
    } else if(type == "Rarity") {
        cards.sort(function(a,b) {
            if(a.rarity - b.rarity != 0) {
                return a.rarity - b.rarity;
            } else {
                if(a.cost - b.cost != 0) {
                    return a.cost - b.cost;
                } else {
                    return a.name.localeCompare(b.name);
                }
            }
        })
    }
}

class Card {
    constructor(name, cost, attack, rarity) {
        this.name = name;
        this.url = "Images/Cards/bcs-" + name + ".png";
        this.cost = cost;
        this.attack = attack;
        this.rarity = rarity;
    }
}

function makeCards() {
    makeCard("dart-monkey", 0, 20, 0)
    makeCard("mortar-monkey", 2, 40, 0)
    makeCard("tack-shooter", 2, 25, 0)
    makeCard("boomerang-monkey", 3, 25, 1)
    makeCard("sniper-monkey", 3, 75, 0)
    makeCard("triple-shot", 3, 20, 0)
    makeCard("banana-farm", 4, 0, 0)
    makeCard("burny-stuff-mortar", 4, 40, 1)
    makeCard("crossbow-monkey", 4, 35, 1)
    makeCard("spikeopult", 4, 50, 2)
    makeCard("monkey-village", 4, 0, 1)
}

function makeCard(name, cost, attack, rarity) {
    cards.push(new Card(name, cost, attack, rarity))
}

let deck = new Map();
let page = 0;
let cards = []
makeCards();
sortCards("Gold");
changePage("");