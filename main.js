// Clifton Abraham
// Project 1
// 08/10/12, VFW, 1308

window.addEventListener("DOMContentLoaded",function( ){
  // getElementById shortcut
  function $(x){
    var theElement = document.getElementById(x)
    return theElement;
  
  }
 function makeGroups(){
  var formTag = document.getElementsByTagName('form'),
  selectLi = $('select'),
  makeSelect = document.createElement('select');
  makeSelect.setAttribute("id", "groups");
  for(var i=0, j=areaGroup.length; i<j; i++){
    var makeOption = document.createElement('option');
    var optText = areaGroup[i];
    makeOption.setAttribute("value", optText);
    makeOption.innerHTML = optText;
    makeSelect.appendChild(makeOption);
  }
  selectLi.appendChild(makeSelect);
 }
 function getRadio(){
  var radios = document.forms[0].answer;
  for(i=0; i<radios.length; i++){
    answerValue = radios[i].value
    if(radios[i].checked){
      answerValue = radios[i].value
    }
  }
 }
 // put check boxes here...
  getCheckBoxValue = function(){ 
   if($("vaccum").checked){
   vaccum = $("vaccum").value;
   } else{
    vaccum = "No"
   }
   if($("sweep").checked){
    sweep = $("sweep").value;
   } else{
    sweep = "No"
   } if($("wDishes").checked){
    wDishes = $("wDishes").value;
   } else{
    wDishes = "No" 
   }
   if($("store").checked){
   store = $("store").value;
   } else{
    store = "No"
   }
   if($("mop").checked){
    mop = $("mop").value;
   } else{
    mop = "No"
   }
 }
   // Toggle controls
function toggleControls(n){
   switch(n){
        case "on":
            $("myForm").style.display = "none";
             $("clear").style.display = "inline";
             $("displayLink").style.display = "none";
             $("addNew").style.display = "inline";
            break;
        case "off":
             $("myForm").style.display = "block";
              $("clear").style.display = "inline";
             $("displayLink").style.display = "inline";
             $("addNew").style.display = "none";
            $("items").style.display = "none"; // correct 
            break;
        default:
            return false;
    }
  }
 
 function saveData(){
  getRadio();
  getCheckBoxValue();
  var id                = Math.floor(Math.random()*1000001);
  var item              ={};
      item.group        =["Group", $("groups").value];
      item.fname        =["First Name", $("fname").value];
      item.lname        =["Last Name", $("lname").value];
      item.email        =["Email:", $("email").value];
      item.everyday     =["EveryDay:", answerValue ];
      item.vaccum       = ["Vaccum:", vaccum];
      item.sweep        = ["Sweep:", sweep];
      item.wDishes      = ["Wash Dishes:", wDishes];
      item.store        = ["Store:", store];
      item.mop          = ["Mop:", mop];
      item.comments     =["Comments:", $("comments").value];
      localStorage.setItem( id , JSON.stringify(item)); 
    alert("Tasks Saved");
 }
  function showData (){
    toggleControls('on');
 if(localStorage.length === 0){
  alert("No Data In Local Storage.")
 }
    var makeDiv = document.createElement('div');
    makeDiv.setAttribute('id' , 'items');
    var makeList = document.createElement('ul');
    makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    for(var i=0, len=localStorage.length; i<len; i++){
      var makeli = document.createElement('li');
      makeList.appendChild(makeli);
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var obj = JSON.parse(value);
      var makeSubList = document.createElement('ul');
      makeli.appendChild(makeSubList);
      for(var n in obj){
        var makeSubli = document.createElement('li');
        makeSubList.appendChild(makeSubli);
        var optSubText = obj[n][0] + " "  +obj[n][1];
        makeSubli.innerHTML = optSubText;
      }
      
    }
  }

      clearStorage = function(){
     if(localStorage.length === 0){
        alert("There is no Data to Clear")
     }else{
        localStorage.clear();
        alert("All the Tasks are Deleted!");
        window.location.reload();
        return false; 
     }
    } // end of clear function
  var clearData = $("clear");
  clearData.addEventListener("click", clearStorage);
  
  // Varibles
  var areaGroup = ["--Choose A Area--", "Home",  "Work", "Car"];
  
     makeGroups();
     saveData();
     answerValue,
      save = $('complete'),
     clearLink = $('clear');
     
  
 
  // Make Links and Click Events
   
 
  displayLink = $('displayLink');
  displayLink.addEventListener("click" ,showData);
  save.addEventListener("click", "saveData");
  clearLink.addEventListener("click", clearStorage);
  
  
  
  
  
  
  
});
