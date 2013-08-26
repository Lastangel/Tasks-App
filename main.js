// Clifton Abraham
// Project 1
// 08/26/12, VFW, 1308

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
 
 function saveData(key){
   if(!!key){
   var id                = Math.floor(Math.random() * 1000000001);
   }else{
    id = key;
   }
  getRadio();
  getCheckBoxValue();
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
  alert("No Data In Local Storage, Defualt data was added.");
  autoFill();
 }
    var makeDiv = document.createElement("div");
    makeDiv.setAttribute("id" , "items");
    var makeList = document.createElement("ul");
    makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    $('items').style.display = "block";
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
          deleteLink.addEventListener("click", deleteTask);
          deleteLink.innerHTML = deleteText
      linksLi.appendChild(deleteLink);
      
      
      
    } // end of edit/delete link function
    // editTask function
    function editTask(){
      var value = localStorage.getItem(this.key);
      var item = JSON.parse(value);
      
      toggleControls("off");
      
      $("groups").value = item.groups[1];
      $("fname").value  = item.fname[1];
      $("lname").value  = item.lname[1];
      $("pword").value  = item.pword[1];
      $("email").value  = item.email[1];
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
    // remove listener
    save.removeEventListener("click", saveData);
    // add edit Task button
      $("complete").value = "Edit Task";
  var editComplete = $("complete");
  editComplete.addEventListener("click", validate); // validate function the next video to see 
  editComplete.key = this.key;
 } // end of editTask function

  // delete Task function
   function deleteTask(){
    var ask = confirm("Are you sure you want to delete Task?");
    if(ask){
      localStorage.removeItem(this.key);
      window.location.reload();
    }else{
      alert("Task was NOT Deleted");
    }
   } // end of delete function
 
   // validate function
   function validate(e){
     var getGroup   = $("groups");
     var getFname   = $("fname");
     var getLname   = $("lname");
     var getEmail   = $("email");
     
     errMsg.innerHTML = " ";
      getGroup.style.border = "1px solid black";
      getFname.style.border = "1px solid black";
      getLname.style.border = "1px solid black";
      getEmail.style.border = "1px solid black";
      
     var messageAry = [ ];
   
    if(getGroup.value === "--Choose A Area--"){
      var groupError = "Please choose a Group.";
      getGroup.style.border = "1px solid red";
      messageAry.push(groupError);
      
      if(getFname.value === ""){
        var fNameError = "Please enter First name"
        getFname.style.border = "1px solid red";
        messageAry.push(fNameError);
      }
    } if(getLname.value === ""){
      var lNameError = "Please enter Last name"
      getLname.style.border = "1px solid red";
      messageAry.push(lNameError);
    } 
   
    // email validate
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!(re.exec(getEmail.value))){
      var emailError = "please enter a valid Email address.";
      getEmail.style.border = "1px solid red";
      messageAry.push(emailError);
    }
    if(messageAry.length >= 1){
      for(var i=0, j=messageAry.length; i<j; i++){
          var txt = document.createElement('li');
          txt.innerHTML = messageAry[i];
          errMsg.appendChild(txt);
      }
         e.preventDefault();
    return false;
    } else{
     saveData(this.key);
      }
  

 } // emd of validate function
  
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
  
  // JSON Data function 
  function autoFill(){
    for(var n in json){
      var id      = Math.floor(Math.random() * 1000000001);
      localStorage.setItem(id, JSON.stringify(json[n]))
    }
  }
  
  
  // Varibles
  var areaGroup = ["--Choose A Area--", "Home",  "Work", "Car"];
  
     makeGroups();
    // saveData();
     var 
     answerValue,
      save = $('complete'),
     clearLink = $('clear'),
     radios,
     errMsg = $('errors'),
    
     
     
     
  
 
  // Make Links and Click Events
   
 
  displayLink = $('displayLink');
  displayLink.addEventListener("click" ,showData);
  save.addEventListener("click", saveData);
  clearLink.addEventListener("click", clearStorage);
  
  
  
  
  
  
  
}); 
