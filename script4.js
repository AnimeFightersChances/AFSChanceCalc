$(function() {
  $("p").hide()
  const BaseText = $("p").html();
  

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
	
const eggBonus = new Map([
	["Z Star(World 1)" ,1.5], ["Ninja Star(World 2)" ,0.75], ["Crazy Star(World 3)" ,0.4],["Pirate Star(World 4)" ,0],
	["Hero Star(World 5)" ,-0.5],["Attack Star(World 6)" ,-1],["Demon Star(World 7)" ,-1.75],["Ghoul Star(World 8)" ,-2.5],
	["Hunter Star(World 9)" ,-3],["Swordsman Star(World 10)" ,-3.5],["Empty Star(World 11)" ,-4],["Cursed Star(World 12)" ,-4.5],
	["Power Star(World 13)" ,-5],["Sins Star(World 14)" ,-5.5],["Destiny Star(World 15)" ,-6],["Luck Star(World 16)" ,-6.5],
	["Alchemy Star(World 17)" ,-7],["Slime Star(World 18)" ,-7.5],["Flame Star(World 19)" ,-8],["Champion Star(World 20)" ,-8.5],
	["Wizard Star(World 21)" ,-9],["Icy Star(World 22)" ,-9.5],["Saw Star(World 23)" ,-10],["Esper Star(World 24)" ,-10],
	["Violent Star(World 25)" ,-10.5],["Young Ninja Star(World 26)" ,-10.5],["Gangster Star(World 27)" ,-11],["Inmate Star(World 28)" ,-11],
	["Card Star(World 29)" ,-11],["Academy Star(World 30)" ,-11]
]);


function getTally(rarity, luck){
    var chance = chances.get(rarity);
	chance = chance * Math.pow(chanceIncreases.get(rarity), luck);

	return chance;
}

function getChance(eggLuck, rarity, luck){
    luck = eggLuck + luck;
    var tally = getTally(rarity,luck);
    totalSomething = getTally("Common",luck) + getTally("Common",luck) + getTally("Rare",luck) + getTally("Epic",luck) + getTally("Legendary",luck) + getTally("Mythical",luck) + getTally("Secret",luck) + getTally("Divine",luck)
    
    
    return tally/totalSomething;
}
	
function floorToSF(num, sfs){
    let places = Math.pow(10, sfs - Math.floor(Math.log10(num)) - 1)
    
    return Math.floor(num * places) / places
}
  function commarize(num) {
    // Alter numbers larger than 1k
    if (typeof(num) === 'number' && num >= 1e3) {
      var units = ["k", "M", "B", "T", "qd", "Qn", "sx", "Sp", "O", "N", "de"];

      // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
      let unit = Math.floor((num.toFixed(0).length - 1) / 3) * 3
      // Calculate the remainder
      var num = (num / ('1e'+unit)).toFixed(2)
      var unitname = units[Math.floor(unit / 3) - 1]

      // output number remainder + unitname
      return num + unitname
    }
    
    return num.toLocaleString()
  }
  
  $( document ).ready( function() {
    let settings = {
      digitGroupSeparator: ',',
      maximumValue: '99999999999999999999999999',
      unformatOnSubmit: true,
      allowDecimalPadding: false,
      decimalPlaces: 2
    };
    
    new AutoNumeric('#luck', settings);
    
  });


  console.log($("p").text())
  $("form button").click(function() {
    console.log("Clicked!");
    
    
    let luck = parseFloat($("#luck").val().replaceAll(',', ''));
    let rarity = $("#rarity").val();
    let eggLuck = parseFloat(eggBonus.get($("#stars").val()));
	
    console.log(eggLuck,rarity,luck);
    let chance = getChance(eggLuck,rarity,luck);
    
    console.log(chance);

    let chanceArray = [];

   
    chanceArray.push(floorToSF(100 * chance,2) + "%");
    chanceArray.push(1/chance);
    

   

    const regExp = /\((\d)\)/g;
    let text = BaseText;
    const matches = text.matchAll(regExp);
    
    console.log(text)
    console.log("Checking matches");
    for (const match of matches) {
      let toChange = commarize(chanceArray[match[1]]);
      text = text.replace(match[0], toChange);
    };
    console.log("Done matches");
    

    $("p").html(text);
    $("p").fadeIn();
    if(rarity === "Divine" || rarity === "Common"){
	    $(".footer").fadeIn();
    }

  });
});
