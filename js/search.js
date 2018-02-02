$("#search_btn").click(function(){
    $("#search_bar").fadeIn();
    $("#option").val("")
});

$("#all_btn").click(function(){
    $("#search_bar").fadeOut();
    $("#search_for").fadeOut();
    $("#option").val("")
});

$("#option").on("change", function() {
    console.log("option:  "+this.value);
    if(this.value == ""){
        $("#search_for").fadeOut();
        $("#search_for_btn").fadeOut();
    }
    else if(this.value == "value"){
        var output = '<div id="search_for">'+
        '<input class="w3-input w3-border w3-round" id="search_for_num1" type="text" placeholder="Max..">'+
        '<input class="w3-input w3-border w3-round" id="search_for_num2" type="text" placeholder="Min.."></div>';
        $("#search_for").html(output).fadeIn();
        $("#search_for_btn").fadeIn();
    }
    else{
        var output = '<div id="search_for"><input class="w3-input w3-border w3-round" id="search_for_str" type="text" placeholder="Search.."></div>';
        $("#search_for").html(output).fadeIn();
        $("#search_for_btn").fadeIn();
    }
})


$("#search_func").click(function(){
    data_update();

    var option = $("#option").val();

    if(option == 'value'){
        var option = $("#option").val();
        var num1 = $("#search_for_num1").val();
        var num2 = $("#search_for_num2").val();
        if(num1 > num2){
            var tmp = num1;
            num1 = num2;
            num2 = tmp;
        }
        console.log("option:  "+option);
        console.log("searchfor:  "+num1+", "+num2);
        var out_data = [];
        if(num1 != "" && num2 != ""){
            if(option == "value"){
                for(var i = 0; i < sql_data.length; i++){
                    var obj = sql_data[ i ];
                    console.log(num1+" <= "+obj['value']+" <= "+num2);
                    if( num1 <= obj['value'] && obj['value'] <= num2 ){
                        out_data.push( obj );
                    }
                }
                sql_data = out_data;
                sort_id(0);
            }
        }
    }
    else{
        var search_for_str = $("#search_for_str").val();
        //console.log("option:  "+option);
        //console.log("searchfor:  "+search_for_str);
        var out_data = [];
        if(search_for_str != ""){
            if(option == "name"){
                for(var i = 0; i < sql_data.length; i++){
                    var obj = sql_data[ i ];
                    if( obj['name'].indexOf(search_for_str) !== -1 ){
                        out_data.push( obj );
                    }
                }
                sql_data = out_data;
                sort_id(0);
            }
        }
    }

});