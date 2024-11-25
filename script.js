function findCard(card) {
    for(let i=0; i < allCards.length; i++) {
        if(allCards[i].name ==card) {
            return allCards[i]
        }
    }
}

function addToDeck(card) {
    element = document.getElementById("deck");
    if(!deck.has(card)) {
        if(deckSize < 40) {
            //sets up deckSize, deck, and new elements
            let thisCard = findCard(card)
            if(thisCard.hero != "none" && thisCard.hero != hero) {
                return;
            }
            deckSize++;
            deck.set(card, 1);
            child = document.createElement("div");
            p = document.createElement("p");
            p2 = document.createElement("p");
            p.innerHTML=card;
            p2.innerHTML = "1X";
            child.id = card;
            child.classList.add("deckSlot");
            p.classList.add("slotName");
            p2.classList.add("slotAmount")
            if(thisCard.type == "tower") {
                child.classList.add("tower")
            } else if(thisCard.type == "bloon") {
                child.classList.add("bloon")
            } else if(thisCard.type == "power") {
                child.classList.add("power");
            }
            add = document.createElement("button");
            minus = document.createElement("button");
            add.innerHTML = "+";
            minus.innerHTML = "-";
            add.setAttribute("onClick", "addToDeckFromButton(this)")
            add.classList.add("plus");
            minus.classList.add("minus");
            minus.setAttribute("onClick", "subtractFromDeck(this)")
            child.appendChild(p);
            child.appendChild(add);
            child.appendChild(p2)
            child.appendChild(minus);
            
            //sets up card pics
            picSlot = document.createElement("div");
            picSlot.id = card;
            img = document.createElement("img");
            img.crossOrgin = "anonymous";
            img.src = "Images/Cards/bcs-" + card + ".png";
            img.classList.add("cardPicture");
            picSlot.appendChild(img);
            picSlot.classList.add("cardPictureSlot");
            console.log(img.crossOrigin);

            //sorts new card in deck
            let deckSlots = document.getElementsByClassName("deckSlot");
            let cardPics = document.getElementsByClassName("cardPictureSlot");
            if(deckSlots.length == 0) {
                element.appendChild(child);
                document.getElementById("cardPics").appendChild(picSlot);
            } else {
                let firstCard = findCard(deckSlots[0].id);
                if (thisCard.cost < firstCard.cost || thisCard.cost == firstCard.cost && thisCard.name < firstCard.name){
                    element.insertBefore(child, deckSlots[0]);
                    document.getElementById("cardPics").insertBefore(picSlot, cardPics[0])
                } else {
                    let earlier = deckSlots[0]
                    //let earlierPic = cardPics[0]
                    for(let i=0; i < deckSlots.length; i++) {
                        let lesser;
                        a = thisCard;
                        b = findCard(deckSlots[i].id);
                        if(a.cost - b.cost != 0) {
                            lesser = a.cost-b.cost > 0;
                        } else {
                            lesser = a.name > b.name;
                        }
                        if(lesser) {
                            earlier = deckSlots[i];
                            //earlierPic = cardPics[i];
                        }
                    }
                    let earlierPic = cardPics[0]
                    for(let i=0; i < cardPics.length; i++) {
                        let lesser;
                        a = thisCard;
                        b = findCard(cardPics[i].id);
                        if(a.cost - b.cost != 0) {
                            lesser = a.cost-b.cost > 0;
                        } else {
                            lesser = a.name > b.name;
                        }
                        if(lesser) {
                            earlierPic = cardPics[i];
                        }
                    }
                    element.insertBefore(child, earlier.nextSibling);
                    document.getElementById("cardPics").insertBefore(picSlot, earlierPic.nextSibling);
                }
            }
        }
    } else {
        if(deck.get(card) < 3 && deckSize < 40) {
            deck.set(card, deck.get(card)+1);
            document.getElementById(card).getElementsByClassName("slotAmount")[0].innerHTML = deck.get(card) + "X";
            deckSize++;

            picSlot = document.createElement("div");
            picSlot.id = card;
            img = document.createElement("img");
            img.src = "Images/Cards/bcs-" + card + ".png";
            img.crossOrgin = "anonymous";
            img.classList.add("cardPicture");
            picSlot.appendChild(img);
            picSlot.classList.add("cardPictureSlot");
            
            let cardPics = document.getElementsByClassName("cardPictureSlot");
            for(let i=0; i < cardPics.length; i++) {
                if(picSlot.id == cardPics[i].id) {
                    document.getElementById("cardPics").insertBefore(picSlot, cardPics[i]);
                    break;
                }
            }
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
        document.getElementById(card).getElementsByClassName("slotAmount")[0].innerHTML = deck.get(card) + "X";
    } else {
        elem.parentElement.remove();
        deck.delete(card);
    }
    deckSize--;

    let cardPics = document.getElementsByClassName("cardPictureSlot");
    for(let i=0; i < cardPics.length; i++) {
        if(cardPics[i].id == card) {
            cardPics[i].remove();
            break;
        }
    }
}

function updateCardImages() {
    
}

function changePage(direction) {
    if(direction == "left") {
        page--;
        if(page <= -1) {
            page = Math.floor(currentCards.length / 10)
        }
    } else if(direction == "right"){
        page++;
        if(page > Math.floor(currentCards.length / 10)) {
            page = 0
        }
    } else if(direction == "") {
        if(page > Math.floor(currentCards.length / 10)) {
            page = Math.floor(currentCards.length / 10)
        }
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
            type = ["primary", "military", "magic", "support", "bloonbasic", "bloonadvanced", "large", "powerbasic", "poweradvanced", "exotic"]
            if(type.indexOf(a.cardClass) != type.indexOf(b.cardClass)) {
                return type.indexOf(a.cardClass) - type.indexOf(b.cardClass);
            } else {
                if(a.cost - b.cost != 0) {
                    return a.cost-b.cost;
                } else {
                    return a.name.localeCompare(b.name);
                }
            }
        })
    }
    if(document.getElementById("way").value == "Descending") {
        currentCards.reverse();
    }
}

class Card {
    constructor(name, cost, attack, rarity, type, cardClass, hero) {
        this.name = name;
        this.url = "Images/Cards/bcs-" + name + ".png";
        this.cost = cost;
        this.attack = attack;
        this.rarity = rarity;
        this.type = type;
        if(cardClass != "basic" && cardClass != "advanced") {
            this.cardClass = cardClass;
        } else {
            this.cardClass = type + cardClass
        }
        this.hero = hero
    }
}

function makeCards() {
    makeCard("dart-monkey", 0, 20, 0, "tower", "primary");
    makeCard("mortar-monkey", 2, 40, 0, "tower", "military");
    makeCard("tack-shooter", 2, 25, 0, "tower", "primary");
    makeCard("boomerang-monkey", 3, 25, 1, "tower", "primary");
    makeCard("sniper-monkey", 3, 75, 0, "tower", "military");
    makeCard("triple-shot", 3, 20, 0, "tower", "primary");
    makeCard("banana-farm", 4, 0, 0, "tower", "support");
    makeCard("burny-stuff-mortar", 4, 40, 1, "tower", "military");
    makeCard("crossbow-monkey", 4, 35, 1, "tower", "primary");
    makeCard("spikeopult", 4, 50, 2, "tower", "primary");
    makeCard("monkey-village", 4, 0, 1, "tower", "support");
    makeCard("banana-plantation", 3, 0, 1, "tower", "support");
    makeCard("druid", 4, 50, 0, "tower", "magic");
    makeCard("tack-sprayer", 4, 20, 1, "tower", "primary");
    makeCard("wizard-monkey", 4, 25, 1, "tower", "magic");
    makeCard("cash-drop sniper", 5, 65, 1, "tower", "military");
    makeCard("heart-of vengeance druid", 5, 15, 2, "tower", "magic");
    makeCard("jungles-bounty-druid", 7, 15, 2, "tower", "magic");
    makeCard("wall-of fire monkey", 5, 40, 1, "tower", "magic");
    makeCard("bionic-boomerang", 6, 40, 2, "tower", "primary");
    makeCard("arcane-master", 9, 50, 3, "tower", "magic");
    makeCard("blade-maelstrom", 8, 20, 4, "tower", "primary");
    makeCard("bouncing-bullet", 8, 65, 4, "tower", "military");
    makeCard("crippling-sniper", 7, 150, 4, "tower", "military");
    makeCard("dark-champion", 12, 90, 4, "tower", "magic");
    makeCard("elite-defender", 7, 50, 2, "tower", "military");
    makeCard("glaive-ricochet", 12, 30, 4, "tower", "primary");
    makeCard("marketplace", 6, 0, 4, "tower", "support");
    makeCard("necromancer", 7, 0, 2, "tower", "magic");
    makeCard("prince-of darkness", 10, 0, 4, "tower", "magic");
    makeCard("sharp-shooter", 9, 40, 4, "tower", "primary");
    makeCard("sun-temple", 18, 100, 4, "tower", "magic");
    makeCard("super-monkey fan club", 6, 30, 1, "tower", "primary");
    makeCard("super-monkey", 8, 90, 2, "tower", "magic");
    makeCard("the-big one", 11, 140, 4, "tower", "military");
    makeCard("thunder-druid", 7, 25, 2, "tower", "magic");
    makeCard("red-bloon", 0, 40, 0, "bloon", "basic");
    makeCard("swarm-red bloon", 0, 20, 1, "bloon", "basic");
    makeCard("blue-bloon", 1, 60, 0, "bloon", "basic");
    makeCard("nested-blue", 1, 60, 2, "bloon", "basic");
    makeCard("swarm-blue bloon", 1, 50, 1, "bloon", "basic");
    makeCard("double-red bloon", 2, 40, 1, "bloon", "basic");
    makeCard("golden-bloon", 2, 70, 2, "bloon", "advanced");
    makeCard("green-bloon", 2, 100, 0, "bloon", "basic");
    makeCard("nested-green", 2, 100, 2, "bloon", "basic");
    makeCard("setup-bloon", 2, 20, 3, "bloon", "basic");
    makeCard("strengthenator", 2, 150, 4, "bloon", "large");
    makeCard("swarm-green bloon", 2, 80, 1, "bloon", "basic");
    makeCard("aura-of strength bloon", 3, 100, 2, "bloon", "basic");
    makeCard("bloontonium-gas bloon", 3, 150, 2, "bloon", "advanced");
    makeCard("double-blue bloon", 3, 60, 1, "bloon", "basic");
    makeCard("nested-yellow", 3, 140, 2, "bloon", "basic");
    makeCard("steady-growth bloon", 3, 100, 2, "bloon", "advanced");
    makeCard("stun-gas bloon", 3, 100, 0, "bloon", "basic");
    makeCard("swarm-yellow bloon", 3, 115, 1, "bloon", "basic");
    makeCard("volatile-bloon", 3, 200, 1, "bloon", "advanced");
    makeCard("yellow-bloon", 3, 140, 0, "bloon", "basic");
    makeCard("bolstered-bloon", 4, 50, 2, "bloon", "advanced");
    makeCard("buddy-bloon", 4, 50, 1, "bloon", "advanced");
    makeCard("damaged-moab", 4, 500, 1, "bloon", "large");
    makeCard("double-green bloon", 4, 80, 1, "bloon", "basic");
    makeCard("pink-bloon", 4, 100, 2, "bloon", "basic");
    makeCard("shield-gas bloon", 4, 150, 1, "bloon", "advanced");
    makeCard("toxic-bloon", 4, 100, 2, "bloon", "advanced");
    makeCard("black-bloon", 5, 130, 2, "bloon", "advanced");
    makeCard("ceramic-bloon", 5, 250, 1, "bloon", "advanced");
    makeCard("discount-bloon", 5, 100, 3, "bloon", "advanced");
    makeCard("double-yellow bloon", 5, 110, 1, "bloon", "basic");
    makeCard("draining-bloon", 5, 200, 2, "bloon", "advanced");
    makeCard("growth-gas-bloon", 5, 200, 3, "bloon", "advanced");
    makeCard("white-bloon", 5, 100, 2, "bloon", "advanced");
    makeCard("hastening-bloon", 6, 150, 2, "bloon", "advanced");
    makeCard("healing-bloon", 6, 200, 1, "bloon", "advanced");
    makeCard("moab", 6, 500, 2, "bloon", "large");
    makeCard("bfb", 7, 600, 3, "bloon", "large");
    makeCard("double-ceramic bloon", 7, 220, 1, "bloon", "advanced");
    makeCard("weakening-gas bloon", 7, 300, 2, "bloon", "large");
    makeCard("emboldened-bloon", 8, 300, 2, "bloon", "large");
    makeCard("rainbow-bloon", 8, 400, 1, "bloon", "advanced");
    makeCard("zebra-bloon", 8, 150, 1, "bloon", "advanced");
    makeCard("double-rainbow bloon", 10, 350, 3, "bloon", "advanced");
    makeCard("zomg", 10, 800, 2, "bloon", "large");
    makeCard("bloontonium-cache", 0, 0, 0, "power", "basic");
    makeCard("cash-drop", 0, 0, 0, "power", "basic");
    makeCard("favored-trade", 0, 0, 2, "power", "basic");
    makeCard("its-all on fire now", 1, 0, 0, "power", "basic", "Gwendolin");
    makeCard("mana-shield", 1, 0, 0, "power", "exotic");
    makeCard("whoops", 1, 0, 1, "power", "advanced");
    makeCard("archers-instinct", 2, 0, 3, "power", "exotic", "Quincy");
    makeCard("fortify", 2, 0, 0, "power", "basic");
    makeCard("storm-of arrows", 2, 0, 2, "power", "advanced", "Quincy");
    makeCard("stunned", 2, 0, 0, "power", "basic");
    makeCard("bed-time", 3, 0, 1, "power", "advanced");
    makeCard("bloon-strike", 3, 0, 0, "power", "basic");
    makeCard("firestorm", 3, 0, 2, "power", "advanced", "Gwendolin");
    makeCard("hero-protection", 3, 0, 2, "power", "basic");
    makeCard("improved-fortification", 3, 0, 1, "power", "basic");
    makeCard("natures-clarity", 3, 0, 3, "power", "advanced", "Obyn");
    makeCard("pack-protection", 3, 0, 2, "power", "advanced", "Amelia");
    makeCard("quick-break", 3, 0, 0, "power", "basic");
    makeCard("rapid-shot", 3, 0, 1, "power", "basic", "Quincy");
    makeCard("sticky-bomb", 3, 0, 2, "power", "exotic");
    makeCard("supply-drop", 3, 0, 0, "power", "basic");
    makeCard("wall-of trees", 3, 0, 2, "power", "advanced", "Obyn");
    makeCard("bloon-embiggen", 4, 0, 1, "power", "basic");
    makeCard("extreme-heat", 4, 0, 3, "power", "exotic", "Gwendolin");
    makeCard("for-my next trick", 4, 0, 0, "power", "exotic", "Amelia");
    makeCard("quick-reload", 4, 0, 1, "power", "advanced");
    makeCard("reinflated", 4, 0, 2, "power", "advanced");
    makeCard("return-to sender", 4, 0, 2, "power", "advanced");
    makeCard("parting-gift", 5, 0, 2, "power", "exotic");
    makeCard("restock", 5, 0, 0, "power", "basic");
    makeCard("shrink", 5, 0, 2, "power", "basic");
    makeCard("glue-storm", 6, 0, 2, "power", "basic");
    makeCard("quick-ready", 6, 0, 2, "power", "exotic");
    makeCard("red-bloon storm", 6, 0, 0, "power", "basic");
    makeCard("ceasefire", 7, 0, 3, "power", "basic");
    makeCard("moab-strike", 7, 0, 3, "power", "basic");
    makeCard("powerful-slowing totem", 7, 0, 1, "power", "basic", "Obyn");
    makeCard("expert-negotiator", 8, 0, 2, "power", "advanced");
    makeCard("super-monkey storm", 8, 0, 2, "power", "exotic");
    makeCard("double-trouble", 10, 0, 2, "power", "exotic");
    makeCard("the-prestige", 10, 0, 4, "power", "exotic", "Amelia");
}

function makeCard(name, cost, attack, rarity, type, cardClass, hero = "none") {
    allCards.push(new Card(name, cost, attack, rarity, type, cardClass, hero))
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

function current(type, search) {
    if(type == "all") {
        currentCards = [...allCards];
    } else {
        currentCards = [];
        for(let i=0; i < allCards.length; i++) {
            if(allCards[i].type == type) {
                currentCards.push(allCards[i]);
            }
        }
    }
    for(let i=0; i < currentCards.length; i++) {
        let name = currentCards[i].name.replaceAll("-", " ").toLowerCase();
        search = search.toLowerCase()
        if(search != "" && !name.includes(search)) {
            currentCards.splice(i,1);
            i--;
        }
    }
}

document.getElementById("type").addEventListener("change", function() {
    value = document.getElementById("type").value;
    value2 = document.getElementById("search").value;
    current(value, value2)
    value = document.getElementById("sort").value;
    sortCards(value);
    changePage("");
});

document.getElementById("heroSelect").addEventListener("change", function() {
    document.getElementById("heroPicture").src = "Images/Other/" + document.getElementById("heroSelect").value + ".webp"
    hero = document.getElementById("heroSelect").value
    cardsInDeck = document.getElementsByClassName("deckSlot");
    for(let i=0; i < cardsInDeck.length; i++) {
        let card = findCard(cardsInDeck[i].id);
        if(card.hero != "none" && card.hero != hero) {
            deck.delete(cardsInDeck[i].id);
            cardsInDeck[i].remove();  
        }
    }
})

document.getElementById("search").addEventListener("change", function() {
    value = document.getElementById("type").value;
    value2 = document.getElementById("search").value;
    current(value, value2)
    value = document.getElementById("sort").value;
    sortCards(value);
    changePage("");
})

document.getElementById("way").addEventListener("change", function() {
    value = document.getElementById("sort").value;
    sortCards(value);
    changePage("");
})

document.getElementById("downloadDeckImg").addEventListener("click", function () {
    const content = document.getElementById("cardPics");
    content.style.backgroundImage = 'url("Images/Other/back.png")';
    
    // Use html2canvas to capture the div
    html2canvas(content).then(canvas => {
      // Convert the canvas to a data URL
      const imageData = canvas.toDataURL("image/png");
      
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = imageData;
      link.download = deckName + ".png";
      
      // Trigger the download
      link.click();
    });
    content.style.backgroundImage = null;
});

let deck = new Map();
let page = 0;
let allCards = []
let currentCards = []
let deckName = "New Deck"
let deckSize = 0;
let hero = "Quincy"
makeCards();
current("all", "")
sortCards("Gold");
changePage("");