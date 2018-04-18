$(document).ready(
    function(){

       $("#HamburgerButton").click(
           function(){

               ToggleSearch();
               reacomodarmenu();
           }
       );
       $("#ElementosPrincipales li").click(
           function () {
               var pos=$("#ElementosPrincipales li").index( this );
               $("#ElementosPrincipales li:eq("+pos+")").addClass("ElementoSeleccionado");
               $("#ElementosPrincipales li:not(:eq("+pos+"))").removeClass("ElementoSeleccionado");
               $(".Indicador:eq("+pos+")").addClass("indicadoractivo");
               $(".Indicador:not(:eq("+pos+"))").removeClass("indicadoractivo");
           }
       );
       $("#SearchInput").focusout(
           function(){
               if($(window).width()<=768) {
                   ToggleSearch();
                   $("#InputSearch").toggleClass("ToggleSearchButton");
               }
           }
       );
        $("#SearchButton").click(
           function(){
               if($(window).width()>=768){
                   reacomodarmenu(); 
               }
               else{
                   $("#InputSearch").toggleClass("ToggleSearchButton");
               }
               ToggleSearch();
               $("#SearchInput").focus();
           }
       );
    }
);

function ToggleSearch(){
    $("#SearchButton").toggleClass("ConvertSearchButton");
}
function reacomodarmenu(){
    if($(window).width()<=768){
        $("#SearchInput").focus();
    }
    $("#HamburgerMenu, #Sidebar").toggleClass("OcultarMenu");
    $("#SearchButton").toggleClass("ToggleSearchButton");
    $("#Contenido").toggleClass("ContentSystem2");
}