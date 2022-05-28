
const chances = new Map([
    ["Common", 100],
    ["Rare",25], 
	["Epic", 5], 
	["Legendary",0.75], 
	["Mythical",0.03], 
	["Secret",0.0004], 
	["Divine", 6E-06],
]);

const chanceIncreases = new Map([
    ["Common", 0.9],
    ["Rare",1], 
	["Epic", 1.05], 
	["Legendary",1.125], 
	["Mythical",1.15], 
	["Secret",1.1], 
	["Divine", 1.05],
]);

function getTally(rarity, luck){
    var chance = chances.get(rarity);
	chance = chance * Math.pow(chanceIncreases.get(rarity), luck);

	return chance;
}

function getChance(eggLuck, rarity, luck){
    luck = eggLuck + luck;
    var tally = getTally(rarity,luck);
    totalSomething = getTally("Common",14.5) + getTally("Common",14.5) + getTally("Rare",14.5) + getTally("Epic",14.5) + getTally("Legendary",14.5) + getTally("Mythical",14.5) + getTally("Secret",14.5) + getTally("Divine",14.5)
    
    
    return tally/totalSomething
}
