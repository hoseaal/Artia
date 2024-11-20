const icon = document.getElementById("icon");
const sub_menu = document.getElementById("men");

icon.addEventListener("click", function(){
    if(sub_menu.style.display=== "none"){

        sub_menu.style.display= "block";

    }else{

        sub_menu.style.display= "none";
    }
    
})