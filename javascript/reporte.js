$(window).on('load', function () {
    init();

  });
  

function init() {


    
  $.get("http://localhost:9098/backend/graficar",
  function (data) {

      if(data.result =="true")
      {
          toastr.info('se generaron la graficas', 'Informacion');
      }else
      {
        toastr.info('se generan las graficas', 'Informacion');
      }
  });
    
}