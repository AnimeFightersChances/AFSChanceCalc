$(function() {
  $("p").hide()
  const BaseText = $("p").html();
  const SPELL_MULT = 119
  

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
    totalSomething = getTally("Common",luck) + getTally("Common",luck) + getTally("Rare",luck) + getTally("Epic",luck) + getTally("Legendary",luck) + getTally("Mythical",luck) + getTally("Secret",luck) + getTally("Divine",luck)
    
    
    return tally/totalSomething
}
  
  function commarize(num) {
    // Alter numbers larger than 1k
    if (num >= 1e3) {
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
  console.log(BaseText)
  $("form button").click(function() {
    console.log("Clicc!");
    
    
    let luck = $("#luck").val().replaceAll(',', '');

    const chance = 1/getChance(0,"Divine",14.5);
    
    console.log(chance);

    let chanceArray = [];

    //No Inner
    chanceArray.push(chance);
    chanceArray.push(chance);
    

   

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

  });
});
