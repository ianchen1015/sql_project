//get data by ajax
get_data();

function get_data(){
    $.ajax({
        type: "GET",
        url: "php/get-data.php",
        dataType: "json",
        success: function(phpdata) {
            sql_data = phpdata;
            sort_id(0);
        },
        error: function(jqXHR) {
            alert("Error: " + jqXHR.status);
        }
    })
}

function view_update(index){
    var complete = 0;
    $.ajax({
        type: "GET",
        url: "php/get-data.php",
        dataType: "json",
        success: function(phpdata) {
            sql_data = phpdata;
            sort_id(0);
            modal_view(index);
            view_modal_open();
        },
        error: function(jqXHR) {
            alert("Error: " + jqXHR.status);
            complete = 0;
        }
    })
    return complete;
}

function data_update(){
    $.ajax({
        type: "GET",
        url: "php/get-data.php",
        dataType: "json",
        success: function(phpdata) {
            sql_data = phpdata;
        },
        error: function(jqXHR) {
            alert("Error: " + jqXHR.status);
        }
    })
}