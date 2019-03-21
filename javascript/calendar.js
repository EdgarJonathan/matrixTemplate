
//initializing CalendarApp
$(window).on('load', function() {
    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable;

    /* initialize the external events
    -----------------------------------------------------------------*/

    var containerEl = document.getElementById('calendar-events');
    new Draggable(containerEl, {
      itemSelector: '.calendar-events',
      eventData: function(eventEl) {
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
      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'resourceTimeline' ],
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
          labelText: 'Room',
          field: 'title'
        },
        {
          labelText: 'Occupancy',
          field: 'occupancy'
        }
      ],
      resources: [
        { id: 'a', title: 'Auditorium A', occupancy: 40 },
        { id: 'b', title: 'Auditorium B', occupancy: 40, eventColor: 'green' },
        { id: 'c', title: 'Auditorium C', occupancy: 40, eventColor: 'orange' },
        { id: 'd', title: ' T-3', occupancy: 20, children: [
          { id: 'd1', title: '105', occupancy: 10 },
          { id: 'd2', title: '200', occupancy: 10 }
        ] },
        { id: 'e', title: 'Auditorium E', occupancy: 40 },
        { id: 'f', title: 'Auditorium F', occupancy: 40, eventColor: 'red' },
        { id: 'g', title: 'Auditorium G', occupancy: 40 },
        { id: 'h', title: 'Auditorium H', occupancy: 40 },
        { id: 'i', title: 'Auditorium I', occupancy: 40 },
        { id: 'j', title: 'Auditorium J', occupancy: 40 },
        { id: 'k', title: 'Auditorium K', occupancy: 40 },
        { id: 'l', title: 'Auditorium L', occupancy: 40 },
        { id: 'm', title: 'Auditorium M', occupancy: 40 },
        { id: 'n', title: 'Auditorium N', occupancy: 40 },
        { id: 'o', title: 'Auditorium O', occupancy: 40 },
        { id: 'p', title: 'Auditorium P', occupancy: 40 },
        { id: 'q', title: 'Auditorium Q', occupancy: 40 },
        { id: 'r', title: 'Auditorium R', occupancy: 40 },
        { id: 's', title: 'Auditorium S', occupancy: 40 },
        { id: 't', title: 'Auditorium T', occupancy: 40 },
        { id: 'u', title: 'Auditorium U', occupancy: 40 },
        { id: 'v', title: 'Auditorium V', occupancy: 40 },
        { id: 'w', title: 'Auditorium W', occupancy: 40 },
        { id: 'x', title: 'Auditorium X', occupancy: 40 },
        { id: 'y', title: 'Auditorium Y', occupancy: 40 },
        { id: 'z', title: 'Auditorium Z', occupancy: 40 }
      ],

      
      events: [
        { id: '1', resourceId: 'b', start: '2019-03-07T02:00:00', end: '2019-03-07T07:00:00', title: 'event 1' },
        { id: '2', resourceId: 'c', start: '2019-03-07T05:00:00', end: '2019-03-07T22:00:00', title: 'event 2' },
        { id: '3', resourceId: 'd', start: '2019-03-06', end: '2019-03-08', title: 'event 3' },
        { id: '4', resourceId: 'e', start: '2019-03-07T03:00:00', end: '2019-03-07T08:00:00', title: 'event 4' },
        { id: '5', resourceId: 'f', start: '2019-03-07T00:30:00', end: '2019-03-07T02:30:00', title: 'event 5' }
      ],
      drop: /*function (date,allDay) {

        
      }*/
       function(arg,) {

      
        console.log('drop date: ' + arg.dateStr)
        console.log('hora :', arg.date.getHours())
        console.log('minutos :', arg.date.getMinutes())
        console.log('dia:',arg.date.getDate());
        console.log('dato',arg.date)

        if (arg.resource) {
          console.log('drop resource: ' + arg.resource.title)
        }

        // is the "remove after drop" checkbox checked?
        if (document.getElementById('drop-remove').checked) {
          // if so, remove the element from the "Draggable Events" list
          arg.draggedEl.parentNode.removeChild(arg.draggedEl);
        }

      },
      eventReceive: function(arg) { // called when a proper external event is dropped
        console.log('eventReceive', arg.event._instance.range);
        console.log('elemento', arg.draggedEl);
      },
      eventDrop: function(arg) { // called when an event (already on the calendar) is moved
        console.log('eventDrop', arg.event);

        alert(info.revert.title+"ẅas dropped on"+info.event.start.toISOString());
        if(!confirm("Are you sure about this change?"))
        {
          info.revert();
        }
      }

      
    });
      calendar.render();


    

    calendar.addResource({ id: 'd', title: ' T-3', occupancy: 20, children: [
      { id: 'd1', title: '105', occupancy: 10 },
      { id: 'd2', title: '200', occupancy: 10 }
    ] })

  /*  diaSemana = function(d){
      var fecha = new Date();
      var dias = ["D", "L", "M", "X", "J", "V", "S"];

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
    }*/

});