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
    }

    //-----------------------------------Curso------------------------------------------
    document
        .getElementById('carga-salon')
        .addEventListener('change', obtenerSalon, false);
    function obtenerSalon(evt) {
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
        if( typeof catedraticoJson === 'undefined'){
            toastr.warning('Asegurate de tener archivos cargados', 'Advertencia');
        }else{
            var enviar = catedraticoJson;
        }

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
                
                        toastr.success('se cargaron todos los archivos', 'Action completada');
                        console.log("si paso por true");
                  

                } else {
                    // Success Type
                    
                        toastr.error('No se cargaron los archivos', 'Erro');
                        console.log("si paso por false");
                

                }
            }
        });

        /*  var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://localhost:9098/backend/insertarCatedraticos", true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                  var result = JSON.parse(xhr.responseText);
  
                  if (result.result == 'true') {
                      alert("contrasena correcta");
  
                  } else {
                      alert("contrasena incorrecta");
  
                  }
              }
          }
          xhr.send(enviar);*/
    }

    //-----------------------------------btnCatedratico--------------------------------------
    $("#btnCatedratico").on("click", function () {
        var url = "http://192.168.1.8:8080/catedratico.html";
        $(location).attr('href', url);
    })



});