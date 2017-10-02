/// checking localstorage if not null drawing what inside of it. else initializing an array.
if(localStorage.getItem("notes") != null){
        myArray = JSON.parse(localStorage.getItem("notes"));
        draw()
    }
    else {
        myArray = [];
    }

/// Collecting the inputs, validate, sending to function constructor.
function stick(){
    var input = document.getElementById("InputText").value; /// text input
    if (input == ""){
        document.getElementById("error").style.display = "block";
    }
    else{
        document.getElementById("error").style.display = "none";
        
        var date = document.getElementById("date").value; /// date input 
        var DateValid = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

        if (DateValid.test(date) == false){
            alert('Wrong Date input. Empty input or wrong format.');
        }

        else{
            var time = document.getElementById("time").value;/// time input 
            var id = generateId("number");
    
            var note = new item(input, id, time, date, true); /// sends to  function constructor. 
            myArray.push(note);
            save();
            draw();
        }
        
    }
}



// generate the id of an object
function generateId(elem) {
    return elem + Math.floor(Math.random() * 999999) + 9999;
}



// saves object in localstorage
function save(){
    localStorage.setItem("notes",JSON.stringify(myArray));

}


// drawing lists
function draw(){
    var listDiv = document.getElementById("MyList");
    listDiv.innerHTML = "";
        for (j=0; j < myArray.length; j++){
            var NoteItem = document.createElement("div");
            NoteItem.id = myArray[j].ID;
        

            if(myArray[j].isNew == true){ //applay design on the note + fade in effect.
                NoteItem.className = "ItemDesigan";
                myArray[j]['isNew'] = false;
            }
            else{
                NoteItem.className = "ItemDesiganaAter";
         
            }
    

            var noteText = document.createElement("div");
            noteText.className += "NoteDesign";
            noteText.innerText = myArray[j].input;
        
            var noteDate = document.createElement("span");
            noteDate.className += "DateDesign";
            noteDate.innerText = myArray[j].date + " " + myArray[j].time;

            var deleteBtn = document.createElement("span");
            deleteBtn.className = "glyphicon glyphicon-remove clearicon";

            deleteBtn.addEventListener("click", function (){
                removeNote(this.parentNode.id);
                save();
                draw();
                })

            listDiv.appendChild(NoteItem);
            NoteItem.appendChild(noteText);
            NoteItem.appendChild(noteDate);
            NoteItem.appendChild(deleteBtn);

    }
        init();
    
}

// recives a div id, compare it with obj id and remove it from array.
function removeNote(id) {
    for (var i = 0; i < myArray.length; i++){
        if (myArray[i].ID == id) {
            myArray.splice(i, 1);
        }
    }
}


/// initializing the form and saves to localstorage
function init() {
    document.getElementById("InputText").value = "";
    document.getElementById("date").value = "";
    localStorage.setItem("notes",JSON.stringify(myArray));
    
}