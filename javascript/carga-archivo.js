$(document).ready(function () {

    document.getElementById('carga-catedratico')
        .addEventListener('change', obtenerCatedratico, false);


    function obtenerCatedratico(evt) {
        var file = evt.target.files[0];

        console.log(evt.target.files);

         var archivoRuta  = evt.target.value;
         var extPermitidas= /(.csv)$/i;
 
         if(!extPermitidas.exec(archivoRuta)){
             alert('Asegurate de haber seleccionado un csv');
             archivo.value="";
             return false;
         }
  
         
         var reader  = new FileReader();
         reader.readAsText(file);  
         console.log(reader.result);

         const lines = reader.result.split('\n').map(
                function (line) {
                    return line.split(',');   
                }
         );

          console.log(lines);


     





        
      
    }


});