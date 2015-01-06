document.addEventListener( "DOMContentLoaded", function(){
    document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
    var max = document.querySelectorAll("input[type='radio']").length;
    var radios = document.querySelectorAll("input[type='radio']");
    var $rumbleSnap = document.querySelector(".rumble-snap");
    var $rumbleSnapUrl = $rumbleSnap.src.substr(0, $rumbleSnap.src.lastIndexOf("/"));
    var $snapUrl = document.querySelector(".rumble-snap-url");
    for(var i=0; i<max; i++){
        radios[i].onclick = function(){
            $rumbleSnap.src = $rumbleSnapUrl + "/" + this.value;
            $snapUrl.innerHTML = this.attributes["data-page-url"].value;

        }
    }
}, false );