function addToDeck(card) {
    element = document.getElementById("deck");
    if(!deck.has(card)) {
        if(deckSize < 40) {
            deckSize++;
            deck.set(card, 1);
            child = document.createElement("div");
            p = document.createElement("p");
            p.innerHTML="1X" + card;
            child.id = card;
            child.classList.add("deckSlot");
            p.classList.add("slotName");
            for(let i=0; i < allCards.length; i++) {
                if(allCards[i].name == card && allCards[i].type == "tower") {
                    child.classList.add("tower")
                } else if(allCards[i].name == card && allCards[i].type == "bloon") {
                    child.classList.add("bloon")
                } else if(allCards[i].name == card && allCards[i].type == "power") {
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
        }
    } else {
        if(deck.get(card) < 3 && deckSize < 40) {
            deck.set(card, deck.get(card)+1);
            document.getElementById(card).firstChild.innerHTML = deck.get(card) + "X" + card;
            deckSize++;
        }
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
    deckSize--;
}

function changePage(direction) {
    if(direction == "left") {
        page--;
        if(page == -1) {
            page++;
        }
    } else if(direction == "right"){
        page++;
    }
    for(let i=1; i <= 10; i++) {
        if(currentCards.length < (page * 10 + i)) {
            document.getElementById("card" + i).style.visibility = "hidden";
        } else {
            document.getElementById("card" + i).style.visibility = "visible";
            document.getElementById("card" + i).src = currentCards[page*10 + i-1].url;
            document.getElementById("card" + i).alt=currentCards[page*10+i-1].name;
        }
    }
}

function sortCards(type) {
    if(type == "Gold") {
        currentCards.sort(function(a, b) {
            if(a.cost - b.cost != 0) {
                return a.cost-b.cost;
            } else {
                return a.name.localeCompare(b.name);
            }
        })
    } else if(type == "Name") {
        currentCards.sort(function(a,b) {return a.name.localeCompare(b.name)});
    } else if(type == "Attack") {
        currentCards.sort(function(a,b){
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
        currentCards.sort(function(a,b) {
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
    } else if(type == "Type") {
        currentCards.sort(function(a,b) {
            if(a.type != b.type) {
                if(a.type == "tower" && b.type == "bloon" || a.type == "tower" && b.type == "power" || a.type == "bloon" && b.type == "power") {
                    return -1
                } else {
                    return 1
                }
            } else {
                if(a.cost - b.cost != 0) {
                    return a.cost-b.cost;
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
    makeCard("dart-monkey", 0, 20, 0, "tower");
    makeCard("mortar-monkey", 2, 40, 0, "tower");
    makeCard("tack-shooter", 2, 25, 0, "tower");
    makeCard("boomerang-monkey", 3, 25, 1, "tower");
    makeCard("sniper-monkey", 3, 75, 0, "tower");
    makeCard("triple-shot", 3, 20, 0, "tower");
    makeCard("banana-farm", 4, 0, 0, "tower");
    makeCard("burny-stuff-mortar", 4, 40, 1, "tower");
    makeCard("crossbow-monkey", 4, 35, 1, "tower");
    makeCard("spikeopult", 4, 50, 2, "tower");
    makeCard("monkey-village", 4, 0, 1, "tower");
    makeCard("banana-plantation", 3, 0, 1, "tower");
    makeCard("druid", 4, 50, 0, "tower");
    makeCard("tack-sprayer", 4, 20, 1, "tower");
    makeCard("wizard-monkey", 4, 25, 1, "tower");
    makeCard("cash-drop sniper", 5, 65, 1, "tower");
    makeCard("heart-of vengeance druid", 5, 15, 2, "tower");
    makeCard("jungles-bounty druid", 5, 15, 2, "tower");
    makeCard("wall-of fire monkey", 5, 40, 1, "tower");
    makeCard("bionic-boomerang", 6, 40, 2, "tower");
    makeCard("arcane-master", 9, 50, 3, "tower");
    makeCard("blade-maelstrom", 8, 20, 4, "tower");
    makeCard("bouncing-bullet", 8, 65, 4, "tower");
    makeCard("crippling-sniper", 7, 150, 4, "tower");
    makeCard("dark-champion", 12, 90, 4, "tower");
    makeCard("elite-defender", 7, 50, 2, "tower");
    makeCard("glaive-ricochet", 12, 30, 4, "tower");
    makeCard("marketplace", 6, 0, 4, "tower");
    makeCard("necromancer", 7, 0, 2, "tower");
    makeCard("prince-of darkness", 10, 0, 4, "tower");
    makeCard("sharp-shooter", 9, 40, 4, "tower");
    makeCard("sun-temple", 18, 100, 4, "tower");
    makeCard("super-monkey fan club", 6, 30, 1, "tower");
    makeCard("super-monkey", 8, 90, 2, "tower");
    makeCard("the-big one", 11, 140, 4, "tower");
    makeCard("thunder-druid", 7, 25, 2, "tower");
    makeCard("red-bloon", 0, 40, 0, "bloon");
    makeCard("swarm-red bloon", 0, 20, 1, "bloon");
    makeCard("blue-bloon", 1, 60, 0, "bloon");
    makeCard("nested-blue", 1, 60, 2, "bloon");
    makeCard("swarm-blue bloon", 1, 50, 1, "bloon");
    makeCard("double-red bloon", 2, 40, 1, "bloon");
    makeCard("golden-bloon", 2, 70, 2, "bloon");
    makeCard("green-bloon", 2, 100, 0, "bloon");
    makeCard("nested-green", 2, 100, 2, "bloon");
    makeCard("setup-bloon", 2, 20, 3, "bloon");
    makeCard("strengthenator", 2, 150, 4, "bloon");
    makeCard("swarm-green bloon", 2, 80, 1, "bloon");
    makeCard("aura-of strength bloon", 3, 100, 2, "bloon");
    makeCard("bloontonium-gas bloon", 3, 150, 2, "bloon");
    makeCard("double-blue bloon", 3, 60, 1, "bloon");
    makeCard("nested-yellow", 3, 140, 2, "bloon");
    makeCard("steady-growth bloon", 3, 100, 2, "bloon");
    makeCard("stun-gas bloon", 3, 100, 0, "bloon");
    makeCard("swarm-yellow bloon", 3, 115, 1, "bloon");
    makeCard("volatile-bloon", 3, 200, 1, "bloon");
    makeCard("yellow-bloon", 3, 140, 0, "bloon");
    makeCard("bolstered-bloon", 4, 50, 2, "bloon");
    makeCard("buddy-bloon", 4, 50, 1, "bloon");
    makeCard("damaged-moab", 4, 500, 1, "bloon");
    makeCard("double-green bloon", 4, 80, 1, "bloon");
    makeCard("pink-bloon", 4, 100, 2, "bloon");
    makeCard("shield-gas bloon", 4, 150, 1, "bloon");
    makeCard("toxic-bloon", 4, 100, 2, "bloon");
    makeCard("black-bloon", 5, 130, 2, "bloon");
    makeCard("ceramic-bloon", 5, 250, 1, "bloon");
    makeCard("discount-bloon", 5, 100, 3, "bloon");
    makeCard("double-yellow bloon", 5, 110, 1, "bloon");
    makeCard("draining-bloon", 5, 200, 2, "bloon");
    makeCard("growth-gas bloon", 5, 200, 3, "bloon");
    makeCard("white-bloon", 5, 100, 2, "bloon");
    makeCard("hastening-bloon", 6, 150, 2, "bloon");
    makeCard("healing-bloon", 6, 200, 1, "bloon");
    makeCard("moab", 6, 500, 2, "bloon");
    makeCard("bfb", 7, 600, 3, "bloon");
    makeCard("double-ceramic bloon", 7, 220, 1, "bloon");
    makeCard("weakening-gas bloon", 7, 300, 2, "bloon");
    makeCard("emboldened-bloon", 8, 300, 2, "bloon");
    makeCard("rainbow-bloon", 8, 400, 1, "bloon");
    makeCard("zebra-bloon", 8, 150, 1, "bloon");
    makeCard("double-rainbow bloon", 10, 350, 3, "bloon");
    makeCard("zomg", 10, 800, 2, "bloon");
    makeCard("bloontonium-cache", 0, 0, 0, "power");
    makeCard("cash-drop", 0, 0, 0, "power");
    makeCard("favored-trade", 0, 0, 2, "power");
    makeCard("its-all on fire now", 1, 0, 0, "power");
    makeCard("mana-shield", 1, 0, 0, "power");
    makeCard("whoops", 1, 0, 1, "power");
    makeCard("archers-instinct", 2, 0, 3, "power");
    makeCard("fortify", 2, 0, 0, "power");
    makeCard("storm-of arrows", 2, 0, 2, "power");
    makeCard("stunned", 2, 0, 0, "power");
    makeCard("bed-time", 3, 0, 1, "power");
    makeCard("bloon-strike", 3, 0, 0, "power");
    makeCard("firestorm", 3, 0, 2, "power");
    makeCard("hero-protection", 3, 0, 2, "power");
    makeCard("improved-fortification", 3, 0, 1, "power");
    makeCard("natures-clarity", 3, 0, 3, "power");
    makeCard("pack-protection", 3, 0, 2, "power");
    makeCard("quick-break", 3, 0, 0, "power");
    makeCard("rapid-shot", 3, 0, 1, "power");
    makeCard("sticky-bomb", 3, 0, 2, "power");
    makeCard("supply-drop", 3, 0, 0, "power");
    makeCard("wall-of trees", 3, 0, 2, "power");
    makeCard("bloon-embiggen", 4, 0, 1, "power");
    makeCard("extreme-heat", 4, 0, 3, "power");
    makeCard("for-my next trick", 4, 0, 0, "power");
    makeCard("quick-reload", 4, 0, 1, "power");
    makeCard("reinflated", 4, 0, 2, "power");
    makeCard("return-to sender", 4, 0, 2, "power");
    makeCard("parting-gift", 5, 0, 2, "power");
    makeCard("restock", 5, 0, 0, "power");
    makeCard("shrink", 5, 0, 2, "power");
    makeCard("glue-storm", 6, 0, 2, "power");
    makeCard("quick-ready", 6, 0, 2, "power");
    makeCard("red-bloon storm", 6, 0, 0, "power");
    makeCard("ceasefire", 7, 0, 3, "power");
    makeCard("moab-strike", 7, 0, 3, "power");
    makeCard("powerful-slowing totem", 7, 0, 1, "power");
    makeCard("expert-negotiator", 8, 0, 2, "power");
    makeCard("super-monkey storm", 8, 0, 2, "power");
    makeCard("double-trouble", 10, 0, 2, "power");
    makeCard("the-prestige", 10, 0, 4, "power");
}

function makeCard(name, cost, attack, rarity, type) {
    allCards.push(new Card(name, cost, attack, rarity, type))
}

document.getElementById("import").addEventListener('click', () => {
    document.getElementById("fileInput").click()
});

document.getElementById("fileInput").addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        // Define what happens once the file is read
        reader.onload = function(event) {
            cardsInDeck = document.getElementsByClassName("deckSlot");
            for(let i=0; 0 != cardsInDeck.length;) {
                deck.delete(cardsInDeck[i].id);
                cardsInDeck[i].remove();           
            }
            deckSize = 0;
            const fileContents = event.target.result;
            input = fileContents.split(',');
            deckName = input[0];
            document.getElementById("deckName").value = deckName;
            hero = input[1]
            document.getElementById("heroSelect").value = hero
            document.getElementById("heroPicture").src = "Images/Other/" + hero + ".webp"
            for(let i=2; i < input.length; i += 2) {
                for(let j = 0; j < input[i]; j++) {
                    addToDeck(input[i+1]);                }
            }
        };
      
        // Read the file as text
        reader.readAsText(file);
        document.getElementById("fileInput").value = "";
    }
  });

document.getElementById('export').addEventListener('click', () => {
    // Content you want to write to the file
    fileContent = "";
    fileContent += deckName + "," + hero + ","
    for(const [key,value] of deck) {
        fileContent += value;
        fileContent += ",";
        fileContent += key;
        fileContent += ",";
    }

    // Create a Blob with the content and specify the MIME type
    const blob = new Blob([fileContent], { type: 'text/plain' });

    // Generate a unique file name
    const fileName = deckName + ".txt";

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object to release memory
    URL.revokeObjectURL(link.href);
});

document.getElementById("deckName").addEventListener('change', (e) => {
    deckName = document.getElementById("deckName").value
})

document.getElementById("sort").addEventListener("change", function() {
    value = document.getElementById("sort").value;
    sortCards(value);
    changePage("");
});

function current(type) {
    if(type == "all") {
        currentCards = allCards;
    } else {
        currentCards = [];
        for(let i=0; i < allCards.length; i++) {
            if(allCards[i].type == type) {
                currentCards.push(allCards[i]);
            }
        }
    }
}

document.getElementById("type").addEventListener("change", function() {
    value = document.getElementById("type").value
    current(value)
    value = document.getElementById("sort").value;
    sortCards(value);
    changePage("");
});

document.getElementById("heroSelect").addEventListener("change", function() {
    document.getElementById("heroPicture").src = "Images/Other/" + document.getElementById("heroSelect").value + ".webp"
    hero = document.getElementById("heroSelect").value
})

let deck = new Map();
let page = 0;
let allCards = []
let currentCards = []
let deckName = "New Deck"
let deckSize = 0;
let hero = "Quincy"
makeCards();
current("all")
sortCards("Gold");
changePage("");