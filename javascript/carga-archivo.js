$(document).ready(function () {


    var catedraticoJson;
    var cursoJson;
    var salonJson;

    //-----------------------------------Catedraticos----------------------------------
    document
        .getElementById('carga-catedratico')
        .addEventListener('change', obtenerCatedratico, false);
    function obtenerCatedratico(evt) {

        var archivo = evt.target.files[0];
        if (!archivo) {
            return;
        }

        var lector = new FileReader();
        lector.onload = function (e) {
            const lines = lector.result.split('\n').map(
                function (line) {
                    return line.split(',');
                }
            );

            const lista = lines.map(function (obj) {
                var jsonArg1 = new Object();
                jsonArg1.id = obj[0];
                jsonArg1.nombre = obj[1];
                return jsonArg1;
            });

            catedraticoJson = '{\n\t"result":[\n\t' + JSON.stringify(lista) + '\n\t]\n}'
            console.log(catedraticoJson);
        };
        lector.readAsText(archivo);

        /*
       console.log(evt.target.files);

        var archivoRuta  = evt.target.value;
        var extPermitidas= /(.csv)$/i;
 
        if(!extPermitidas.exec(archivoRuta)){
            alert('Asegurate de haber seleccionado un csv');
            archivo.value="";
            return false;
        }*/

    }

    //-----------------------------------Curso------------------------------------------
    document
        .getElementById('carga-curso')
        .addEventListener('change',obtenerCurso,false);
    function obtenerCurso(evt) {
    }

    //-----------------------------------Curso------------------------------------------
    document
        .getElementById('carga-salon')
        .addEventListener('change',obtenerSalon,false);
    function obtenerSalon(evt) {
    }

    //-----------------------------------Completar--------------------------------------
    //cancelar-----------------------
    document
        .getElementById('btnCancelar')
        .addEventListener('click',eventCancelar,false);
    function eventCancelar() {
        $("#add-new-event").hide();
    }

    //completar----------------------
    document
        .getElementById('btnCompletar')
        .addEventListener('click',eventCompletar,false);
    function eventCompletar() {
    }

});