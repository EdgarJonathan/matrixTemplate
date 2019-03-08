$(document).ready(function () {

    document.getElementById('carga-catedratico')
        .addEventListener('change', obtenerCatedratico, false);


    function obtenerCatedratico(evt) {

            var archivo = evt.target.files[0];
            if (!archivo) {
              return;
            }

            var lector = new FileReader();
            lector.onload = function(e) {
                const lines = lector.result.split('\n').map(
                    function (line) {
                        return line.split(',');   
                    }
             );

             console.log(lines);
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
         }
  
         var TmpPath = URL.createObjectURL(evt.target.files[0]);

        console.log(TmpPath);
        console.log(evt.target.files[0].mozFullPath);

         /*
         var reader  = new FileReader();
         reader.readAsText(file);  
         console.log(reader.result);

         const lines = reader.result.split('\n').map(
                function (line) {
                    return line.split(',');   
                }
         );

        
         console.log(lines);*/
      
    }

    function mostrarContenido(contenido) {
        var elemento = document.getElementById('contenido');
        elemento.innerHTML = contenido;
      }
    


});