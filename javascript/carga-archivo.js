$(document).ready(function () {


    window.catedraticoJson;
    window.cursoJson;
    window.salonJson;

    //-----------------------------------Catedraticos----------------------------------
    document
        .getElementById('carga-catedratico')
        .addEventListener('change', obtenerCatedratico, false);
    function obtenerCatedratico(evt) {

        var archivo = evt.target.files[0];
        if (!archivo) {

            toastr.warning('Asegurate de tener archivos cargados', 'Advertencia');
            return;
        }

        var archivoRuta = evt.target.value;
        var extPermitidas = /(.csv)$/i;

        if (!extPermitidas.exec(archivoRuta)) {
            toastr.warning('Asegurate de haber seleccionado un archivo csv', 'Advertencia');
            archivo.value = "";
            return false;
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

            catedraticoJson = '{"lista":' + JSON.stringify(lista) + '}'
        };
        lector.readAsText(archivo);
    }

    //-----------------------------------Curso------------------------------------------
    document
        .getElementById('carga-curso')
        .addEventListener('change', obtenerCurso, false);
    function obtenerCurso(evt) {
        var archivo = evt.target.files[0];
        if (!archivo) {

            toastr.warning('Asegurate de tener archivos cargados', 'Advertencia');
            return;
        }

        var archivoRuta = evt.target.value;
        var extPermitidas = /(.csv)$/i;

        if (!extPermitidas.exec(archivoRuta)) {
            toastr.warning('Asegurate de haber seleccionado un archivo csv', 'Advertencia');
            archivo.value = "";
            return false;
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
                jsonArg1.idCatedratico = obj[2];
                return jsonArg1;
            });

            cursoJson = '{"lista":' + JSON.stringify(lista) + '}'
        };
        lector.readAsText(archivo);
    }

    //-----------------------------------Salon------------------------------------------
    document
        .getElementById('carga-salon')
        .addEventListener('change', obtenerSalon, false);
    function obtenerSalon(evt) {

        var archivo = evt.target.files[0];
        if (!archivo) {

            toastr.warning('Asegurate de tener archivos cargados', 'Advertencia');
            return;
        }

        var archivoRuta = evt.target.value;
        var extPermitidas = /(.csv)$/i;

        if (!extPermitidas.exec(archivoRuta)) {
            toastr.warning('Asegurate de haber seleccionado un archivo csv', 'Advertencia');
            archivo.value = "";
            return false;
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
                jsonArg1.edificio = obj[0];
                jsonArg1.no_salon = obj[1];
                jsonArg1.capacidad = obj[2];
                return jsonArg1;
            });

            salonJson = '{"lista":' + JSON.stringify(lista) + '}'
        };
        lector.readAsText(archivo);

    }

    //-----------------------------------Cancelar--------------------------------------
    document
        .getElementById('btnCancelar')
        .addEventListener('click', eventCancelar, false);
    function eventCancelar() {
        $("#add-new-event").hide();
    }

    //-----------------------------------Completar--------------------------------------
    document
        .getElementById('btnCompletar')
        .addEventListener('click', eventCompletar, false);
    function eventCompletar() {

        $("#add-new-event").hide();

        if (typeof catedraticoJson === 'undefined') {
            toastr.warning('No se cargaron los archivos de catedratico', 'Advertencia');
        } else {
            enviarCatedraticos(catedraticoJson);

            if (typeof cursoJson === 'undefined') {
                toastr.warning('No se cargaron los archivos de Curso', 'Advertencia');
            } else {
                
                
                enviarCursos(cursoJson);
            }

        }

        if (typeof salonJson === 'undefined') {
            toastr.warning('No se cargaron los archivos de Salon', 'Advertencia');
        } else {
           
            enviarSalon(salonJson);
        }

    }

    //-----------------------------------btnCatedratico--------------------------------------
    $("#btnCatedratico").on("click", function () {
        var url = "catedratico.html";
        $(location).attr('href', url);
    })
    //-----------------------------------btnEdificios--------------------------------------
    $("#btnEdificios").on("click", function () {
        var url = "edificios.html";
        $(location).attr('href', url);
    })
    //-----------------------------------btnCursos--------------------------------------
    $("#btnCursos").on("click", function () {
        var url = "cursos.html";
        $(location).attr('href', url);
    })
    //-----------------------------------btnCalendario--------------------------------------
    $("#btnCalendar").on("click", function () {
        var url = "calendar.html";
        $(location).attr('href', url);
    })

    //---------------------------enviar catedraticos------------------------------
    function enviarCatedraticos(enviar) {


        jQuery.ajax({
            url: "http://localhost:9098/backend/insertarCatedraticos",
            type: "POST",
            data: enviar,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data.result == "true") {
                    // Success Type

                    toastr.success('se cargaron todos los archivos de catedratico', 'Action completada');
                  


                } else {
                    // Success Type

                    toastr.error('No se cargaron los archivos de catedratico', 'Erro');
                   


                }
            }
        });

    }

    //---------------------------enviar cursos------------------------------------
    function enviarCursos(enviar) {
        jQuery.ajax({
            url: "http://localhost:9098/backend/insertarCursos",
            type: "POST",
            data: enviar,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data.result == "true") {
                    // Success Type

                    toastr.success('se cargaron todos los archivos de curso', 'Action completada');
                  


                } else {
                    // Success Type

                    toastr.error('No se cargaron los archivos de curso', 'Erro');
                 


                }
            }
        });

    }

    //---------------------------enviar salones-----------------------------------

    function enviarSalon(enviar) {

        jQuery.ajax({
            url: "http://localhost:9098/backend/insertarEdificios",
            type: "POST",
            data: enviar,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                if (data.result == "true") {
                    // Success Type

                    toastr.success('se cargaron todos los archivos de Salon', 'Action completada');
                  


                } else {
                    // Success Type

                    toastr.error('No se cargaron los archivos de catedratico', 'Erro');
                   


                }
            }
        });
        
    }

});