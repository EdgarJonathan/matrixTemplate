

window.dia;
window.contenido;

//initializing CalendarApp
$(window).on('load', function () {
  init();
  cargarCatedraticos();
  cargarCursos();
});


function init() {


  var Calendar = FullCalendar.Calendar;
  var Draggable = FullCalendarInteraction.Draggable;

  /* initialize the external events
  -----------------------------------------------------------------*/

  var containerEl = document.getElementById('calendar-events');
  new Draggable(containerEl, {
    itemSelector: '.calendar-events',
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText.trim()
      }
    }
  });

  /* initialize the calendar
  -----------------------------------------------------------------*/

  var calendarEl = document.getElementById('calendar');
  var calendar = new Calendar(calendarEl, {

    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    slotDuration: '00:10:00',
    /* If we want to split day time each 15minutes */
    minTime: '07:00:00',
    maxTime: '21:00:00',
    plugins: ['interaction', 'dayGrid', 'timeGrid', 'resourceTimeline'],
    now: '2019-03-10',
    editable: true, // enable draggable events
    droppable: true, // this allows things to be dropped onto the calendar
    aspectRatio: 1.8,
    scrollTime: '00:00', // undo default 6am scrollTime
    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineThreeDays'
    },
    defaultView: 'resourceTimelineDay',
    views: {
      resourceTimelineThreeDays: {
        type: 'resourceTimeline',
        duration: { days: 5 },
        buttonText: 'Semana'
      }
    },

    resourceAreaWidth: '30%',
    resourceColumns: [
      {
        labelText: 'Edficios',
        field: 'title'
      },
      {
        labelText: 'Capacidad',
        field: 'occupancy'
      }
    ],
    resources: [
    
      {id: "S-12", title: 'S-12', occupancy: 20,children: [{ id: 'S-12,105,110', title: '105', occupancy: '110'},{ id: 'S-12,110,110', title: '110', occupancy: '110'},{ id: 'S-12,115,110', title: '115', occupancy: '110' }]},
      {id: 'T-3', title: 'T-3', occupancy: 20,children: [{ id: 'T-3,105,75', title: '105', occupancy: '75'},{ id: 'T-3,110,90', title: '110', occupancy: '90' }]},
      {id: 'T-5', title: 'T-5', occupancy: 20,children: [{ id: 'T-5,301,45', title: '301', occupancy: '45'},{ id: 'T-5,302,45', title: '302', occupancy: '45'},{ id: 'T-5,303,45', title: '303', occupancy: '45' }]},
      {id: 'T-7', title: 'T-7', occupancy: 20,children: [{ id: 'T-7,102,50', title: '102', occupancy: '50'},{ id: 'T-7,104,50', title: '104', occupancy: '50'},{ id: 't-7,105,50', title: '105', occupancy: '50' }]},
      {id: 't-3', title: 't-3', occupancy: 20,children: [{ id: 't-3,115,75', title: '115', occupancy: '75' }]}

    ],


    events: [
     /* { id: '1', resourceId: 'b', start: '2019-03-07T02:00:00', end: '2019-03-07T07:00:00', title: 'event 1' },
      { id: '2', resourceId: 'c', start: '2019-03-07T05:00:00', end: '2019-03-07T22:00:00', title: 'event 2' },
      { id: '3', resourceId: 'd', start: '2019-03-06', end: '2019-03-08', title: 'event 3' },
      { id: '4', resourceId: 'e', start: '2019-03-07T03:00:00', end: '2019-03-07T08:00:00', title: 'event 4' },
      { id: '5', resourceId: 'f', start: '2019-03-07T00:30:00', end: '2019-03-07T02:30:00', title: 'event 5' }*/
    ],
    drop: function (arg) {

       /* console.log('ver', arg.view);
        console.log('drop date: ' + arg.dateStr)
        console.log('hora :', arg.date.getHours())
        console.log('minutos :', arg.date.getMinutes())
        console.log('dia:', arg.date.getDate());
        console.log('dato', arg.date)*/

          dia = obtenerdia(arg.date.getDate(),arg.date);
        console.log('dia:',dia );

          
        if (arg.resource) {
         /* console.log('drop resource: ' + arg.resource.title)
          console.log('resource-> ',arg.resource);*/
         contenido = arg.resource.id;
          console.log('Contenido ',contenido);
        }

        // is the "remove after drop" checkbox checked?
        if (document.getElementById('drop-remove').checked) {
          // if so, remove the element from the "Draggable Events" list
          arg.draggedEl.parentNode.removeChild(arg.draggedEl);
        }

    },

     eventReceive: function (arg) { // called when a proper external event is dropped
     
        

        var idCurso =arg.draggedEl.getAttribute("name");
        console.log('curso.id', idCurso);


        const ed = contenido.split(',');
        var edificio = ed[0];
        var  no_salon = parseInt(ed[1]);

        var fechaInicio = new Date(arg.event._instance.range.start);
        var fechaFinal  = new Date(arg.event._instance.range.end);
        var horaFinal   = calcTime(fechaFinal);
        var horaInicio  = calcTime(fechaInicio);

       /* console.log('Hora Inicio: ',horaInicio);
        console.log('Hora  Final: ',horaFinal);*/


        var st ={dia,horaInicio,horaFinal,edificio,no_salon, idCurso}
        var dato = '{"dato":' + JSON.stringify(st) + '}';
      
        console.log(dato);


        jQuery.ajax({
          url: "http://localhost:9098/backend/insertarListaMatriz",
          type: "POST",
          data: dato,
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          success: function (data) {
              console.log(data);
              if (data.result == "true") {
                  // Success Type



                 toastr.success('se cargo el curso a la matriz', 'Action completada');
                


              } else {
                  // Success Type

                  toastr.error('No se cargaron los archivos de catedratico', 'Erro');
                 


              }
          }
      });
      




    },

    eventDrop: function (arg) { // called when an event (already on the calendar) is moved
      console.log('eventDrop', arg.event);
    },
    eventClick: function(info) {

      //insertar metodo para editar nodo de matriz
      /*
      alert('Event: ' + info.event.title);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('View: ' + info.view.type);
  
      // change the border color just for fun
      info.el.style.borderColor = 'red';*/
    }




  });
  calendar.render();




  //----------------------Carga de Salones--------------------------------


 /* calendar.addResource(
  {id: 'd', title: ' T-3', occupancy: 20,children: [
                { id: 'd1', title: '105', occupancy: 10 },
                { id: 'd2', title: '200', occupancy: 10 }
               ]
  });*/




  $.get("http://localhost:9098/backend/obtenerEdificios",
  function (data) {

    /*  if(data.result)
      {
          toastr.info('la lista de edificios  se encuentra vacia', 'Informacion');
      }else
      {*/
        var edificios = data.result;

      /*  console.clear(); 
        console.log('EDIFICIO',edificios);      
*/

         var num  = 0;
         var agregar ='';
       
        
        for (let index = 0; index < edificios.length; index++) {
          const edificio = edificios[index];
          var  salones = edificio.salones;
          var nombre = edificio.nombre;
          agregar +=' {id: \''+nombre+'\', title: \''+nombre+'\', occupancy: 20,children: [';

          for (let j = 0; j < salones.length; j++) {
            num++;
             const Salon = salones[j];
             var capacidad = Salon.capacidad;
             var no_salon = Salon.no_salon;

                  if(j == (salones.length-1))
                  {
                  agregar += '{ id: \''+num+'\', title: \''+no_salon+'\', occupancy: \''+capacidad+'\' }';
                  }else
                  {
                    agregar += '{ id: \''+num+'\', title: \''+no_salon+'\', occupancy: \''+capacidad+'\'},';
                  }

            
          }

          agregar +="]}";
          
          resourceJson = JSON.stringify(agregar)
        //  console.log('resource', agregar);
        console.log('resourceJSON->', resourceJson);

          calendar.addResource(resourceJson);

          agregar="";

          num++;
          
        //}




      }
  });
   

  


}


//-----------------------------------Carga de catedraticos----------------------------------
function cargarCatedraticos(){


  $.get("http://localhost:9098/backend/getArbol",
        function (data) {

            if(data.result[0].id =="NULL")
            {
                toastr.info('el arbol de catedraticos se encuentra vacia', 'Informacion');
            }else
            {
                cargarTabla(data.result);
            }
        });

}

function cargarTabla(listaCatedratico) {
  
    $("#addCatedraticos").empty();

  var opcion = '';


  listaCatedratico.map(function (cat) {
    opcion += '<option value="'+cat.id+'">'+cat.nombre+'</option>';
  });


  $("#addCatedraticos").append(opcion);

  }

//-----------------------------------Carga de cursos-----------------------------------------
function cargarCursos()
{

  $.get("http://localhost:9098/backend/getCursos",
  function (data) {

      if(data.result[0].id =="NULL")
      {
          toastr.info('la lista de cursos se encuentra vacia', 'Informacion');
      }else
      {
          cargarEventos(data.result);
      }
  });

}

function cargarEventos(data) {
  
  $("#calendar-events").empty();

  var opcion ='';

  data.map(function (curso) {

  
     opcion +=  '<div class="calendar-events m-b-20" data-class="bg-info" name="'+curso.id+'">'; 
     opcion +=         '<i class="fa fa-circle text-info m-r-10"></i>'+curso.nombre+' ';  
     opcion +=   '</div>';
    
  });


  $("#calendar-events").append(opcion);

}


function  obtenerdia(d , fecha){

  var dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  var mes = fecha.getMonth()+1; //obteniendo mes
  var dia = d;
  var ano = fecha.getFullYear(); //obteniendo año
  if(dia<10)
      dia='0'+dia; //agrega cero si el menor de 10
  if(mes<10)
      mes='0'+mes //agrega cero si el menor de 10
  var fec = mes+"/"+dia+"/"+ano;
  var day = new Date(fec).getDay();
 
  return dias[day];
}

function calcTime(fecha) {
  utc = fecha.getTime() + (fecha.getTimezoneOffset() * 60000);
  nd = new Date(utc + (3600000 * 0));
  var result =  nd .getHours()+':'+ nd.getMinutes();
  return result
}
