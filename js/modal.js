//modal_insert
var modal_insert = document.getElementById('modal_insert');
var modal_insert_btn = document.getElementById("modal_insert_btn");
var span = document.getElementsByClassName("close")[0];

modal_insert_btn.onclick = function() {
    modal_insert.style.display = "block";
}

span.onclick = function() {
    modal_insert.style.display = "none";
}

//modal_edit
var modal_edit = document.getElementById('modal_edit');
var span2 = document.getElementsByClassName("close2")[0];

function modal_edit_btn(id){
    modal_edit.style.display = "block";
    document.getElementById("edit_page").innerHTML = '<p> edit id = '+id+' . </p>';
}

span2.onclick = function() {
    modal_edit.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal_insert) {
    	modal_insert.style.display = "none";
    }
    if (event.target == modal_edit) {
        modal_edit.style.display = "none";
    }
}
