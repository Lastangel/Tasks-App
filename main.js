// Clifton Abraham
// Project 1
// 08/10/12, VFW, 1308

window.addEventListener("DOMContentLoaded",function(){
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
  var id                = Math.floor(Math.random() * 1000001);
  var item              ={};
      item.group        =["Group", $("groups").value ];
      item.fname        =["First Name", $("fname").value ];
      item.lname        =["Last Name", $("lname").value ];
      item.pword        =["Password:", $("pword").value];
      item.email        =["Email:", $("email").value ];
      item.everyday     =["EveryDay:", answerValue ];
      item.location     =["Location:" , $('location').value];
      item.vaccum       = ["Vaccum:", vaccum];
      item.sweep        = ["Sweep:", sweep];
      item.wDishes      = ["Wash Dishes:", wDishes ];
      item.store        = ["Store:", store];
      item.mop          = ["Mop:", mop];
      item.comments     =["Comments:", $("comments").value ];
      localStorage.setItem( id , JSON.stringify(item)); 
    alert("Tasks Saved");
 }
  function showData (){
    toggleControls("on");
 if(localStorage.length === 0){
  alert("No Data In Local Storage.")
 }
    var makeDiv = document.createElement("div");
    makeDiv.setAttribute("id" , "items");
    var makeList = document.createElement("ul");
    makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    for(var i=0, len=localStorage.length; i<len; i++){
      var makeli = document.createElement("li");
      var linksLi = document.createElement("li");
      makeList.appendChild(makeli);
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var obj = JSON.parse(value);
      var makeSubList = document.createElement("ul");
      makeli.appendChild(makeSubList);
      for(var n in obj){
        var makeSubli = document.createElement("li");
        makeSubList.appendChild(makeSubli);
        var optSubText = obj[n] [0]+ " "  + obj[n] [1];
        makeSubli.innerHTML = optSubText;
        makeSubList.appendChild(linksLi);
      }
       makeItemsLinks(localStorage.key(i), linksLi);
    }
  }
    // edit and delete Link function
    function makeItemsLinks(key, linksLi){
      var editLink = document.createElement("a");
          editLink.href = "#"
          editLink.key = key;
      var editText = "Edit Task";
          editLink.addEventListener("click", editTask); 
          editLink.innerHTML = editText;
      linksLi.appendChild(editLink);
      
      var breakTag = document.createElement("br");
      linksLi.appendChild(breakTag);
      
      
      var deleteLink = document.createElement("a");
          deleteLink.href = "#";
          deleteLink.key = key;
      var deleteText = "Delete Task";
         // deleteLink.addEventListener("click", deleteTask); future function
          deleteLink.innerHTML = deleteText
      linksLi.appendChild(deleteLink);
      
      
      
    } // end of edit/delete link function
    // editTask function
    function editTask(){
      var value = localStorage.getItem(this.key);
      var item = JSON.parse(value);
      
      toggleControls("off");
      
      $("groups").value = item.group[1];
      $("fname").value = item.fname[1];
      $("lname").value = item.lname[1];
      $("pword").value = item.pword[1];
      $("email").value = item.email[1];
      $("location").value = item.location[1];
      var radios = document.forms[0].everyday;
      for(var i=0, j=radios.length;i<j; i++){
        if(radios[i].value == "yes" && item.everyday[1] == "yes"){
          radios[i].setAttribute("checked", "checked");
        }else if(radios[i].value == "no" && item.everyday[1] == "no"){
          radios[i].setAttribute("checked", "checked");
        }
      }
         // make check boxes watch rest of video thats up
    if(item.vaccum[1] == "Vacuum"){
      $('vaccum').setAttribute("checked", "checked");
    }else if(item.sweep[1] == "Sweep"){
      $('sweep').setAttribute("checked", "checked");
    } else if(item.wDishes[1] == "Wash Dishes"){
      $('wDishes').setAttribute("checked", "checked");
    } else if(item.store[1] == "Go to Store"){
      $('store').setAttribute("checked", "checked");
    }else if(item.mop[1] == "Mop"){
      $('mop').setAttribute("checked", "checked");
    }
    $('comments').value = item.comments[1];
 } // end of editTask function
    
  
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
    // saveData();
     var 
     answerValue,
      save = $('complete'),
     clearLink = $('clear'),
     radios;
     
  
 
  // Make Links and Click Events
   
 
  displayLink = $('displayLink');
  displayLink.addEventListener("click" ,showData);
  save.addEventListener("click", saveData);
  clearLink.addEventListener("click", clearStorage);
  
  
  
  
  
  
  
});