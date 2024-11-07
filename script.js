function addToDeck(card) {
    element = document.getElementById("deck");
    if(!deck.has(card)) {
        deck.set(card, 1);
        child = document.createElement("div");
        p = document.createElement("p");
        p.innerHTML="1X" + card;
        child.id = card;
        child.classList.add("deckSlot");
        p.classList.add("slotName");
        for(let i=0; i < cards.length; i++) {
            if(cards[i].name == card && cards[i].type == "tower") {
                child.classList.add("tower")
            } else if(cards[i].name == card && cards[i].type == "bloon") {
                child.classList.add("bloon")
            } else if(cards[i].name == card && cards[i].type == "power") {
                child.classList.add("power");
            }
        }
        add = document.createElement("button");
        minus = document.createElement("button");
        add.innerHTML = "+";
        minus.innerHTML = "-";
        add.setAttribute("onClick", "addToDeckFromButton(this)")
        add.classList.add("plus");
        minus.classList.add("minus");
        minus.setAttribute("onClick", "subtractFromDeck(this)")
        element.appendChild(child);
        child.appendChild(p);
        child.appendChild(add);
        child.appendChild(minus);
    } else {
        deck.set(card, deck.get(card)+1);
        document.getElementById(card).firstChild.innerHTML = deck.get(card) + "X" + card;
    }
}

function addToDeckFromButton(elem) {
    addToDeck(elem.parentElement.id);
}

function subtractFromDeck(elem) {
    card = elem.parentElement.id;
    if(deck.get(card) > 1) {
        deck.set(card, deck.get(card) - 1)
        document.getElementById(card).firstChild.innerHTML = deck.get(card) + "X" + card;
    } else {
        elem.parentElement.remove();
        deck.delete(card);
    }
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
    constructor(name, cost, attack, rarity, type) {
        this.name = name;
        this.url = "Images/Cards/bcs-" + name + ".png";
        this.cost = cost;
        this.attack = attack;
        this.rarity = rarity;
        this.type = type;
    }
}

function makeCards() {
    makeCard("dart-monkey", 0, 20, 0, "tower")
    makeCard("mortar-monkey", 2, 40, 0, "tower")
    makeCard("tack-shooter", 2, 25, 0, "tower")
    makeCard("boomerang-monkey", 3, 25, 1, "tower")
    makeCard("sniper-monkey", 3, 75, 0, "tower")
    makeCard("triple-shot", 3, 20, 0, "tower")
    makeCard("banana-farm", 4, 0, 0, "tower")
    makeCard("burny-stuff-mortar", 4, 40, 1, "tower")
    makeCard("crossbow-monkey", 4, 35, 1, "tower")
    makeCard("spikeopult", 4, 50, 2, "tower")
    makeCard("monkey-village", 4, 0, 1, "tower")
}

function makeCard(name, cost, attack, rarity, type) {
    cards.push(new Card(name, cost, attack, rarity, type))
}

let deck = new Map();
let page = 0;
let cards = []
makeCards();
sortCards("Gold");
changePage("");