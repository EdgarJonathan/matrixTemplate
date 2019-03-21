$(document).ready(function () {

    document.getElementById("enviar").addEventListener("click", peticion, false);

function peticion() {


    var nombre = $("#nombre").val();
    var contra = $("#contra").val();


    if ((nombre == "201602633") && (contra == "201602633")) {

        var url = "principal.html";
        $(location).attr('href', url);
        

    } else {

        toastr.error('Sus Credenciales no son validas', 'Error');
    }
}

    
});

