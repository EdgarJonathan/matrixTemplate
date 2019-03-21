
window.orginal;
window.nombreCatedratico;
window.onload = function () { getArbol(); }

function getArbol() {
    $.get("http://localhost:9098/backend/getCursos",
        function (data) {

            if(data.result[0].id =="NULL")
            {
                toastr.info('la lista de cursos se encuentra vacia', 'Informacion');
            }else
            {
                cargarTabla(data.result);
            }
        });
}

function cargarTabla(listaCatedratico) {
    $("#cuerpoTabla").empty();

    var tbl = '';
    var i = 0;

    listaCatedratico.map(function (cat) {
        i++;
  
        //loop through ajax row data
        tbl += '<tr>';
        tbl += '<td ><div class="row_data"  col_name="num">' + i + '</div></td>';
        tbl += '<td ><div class="row_data"  col_name="id">' + cat.id + '</div></td>';
        tbl += '<td ><div class="row_data" id="nombre" col_name="nombre">' + cat.nombre + '</div></td>';

        //--->edit options > start
        tbl += '<td>';

        tbl += '<span class="btn_edit" > <a href="#" class="btn btn-success btn-sm"  > Edit</a> </span>';

        //only show this button if edit button is clicked
        tbl += '<span class="btn_save"> <a href="#" class="btn btn-success btn-sm"  > Save</a>  </span>';
        tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-success btn-sm"> Cancel</a>  </span>';

        tbl += '</td>';
        //--->edit options > end
        tbl += '<td>';
        tbl += '<span class="btn_delete" > <a href="#" class="btn btn-warning btn-sm"  > Eliminar</a> </span>';
        tbl += '</td>';
        tbl += '</tr>';

    });

    $("#cuerpoTabla").append(tbl);

    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide();
}


$(document).ready(function () {



    //--->button > edit > start	
    $(document).on('click', '.btn_edit', function (event) {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');

        tbl_row.find('.btn_save').show();
        tbl_row.find('.btn_cancel').show();

        //hide edit button
        tbl_row.find('.btn_edit').hide();

        //make the whole row editable
        tbl_row.find('#nombre')
            .attr('contenteditable', 'true')
            .attr('edit_type', 'button')
            .addClass('bg-warning')
            .css('padding', '3px')
        $(this).focus();

        //--->add the original entry > start
        tbl_row.find('.row_data').each(function (index, val) {
            //this will help in case user decided to click on cancel button
            $(this).attr('original_entry', $(this).html());
        });
        //--->add the original entry > end

    });
    //--->button > edit > end


    //--->button > cancel > start	
    $(document).on('click', '.btn_cancel', function (event) {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');

        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();

        //show edit button
        tbl_row.find('.btn_edit').show();

        //make the whole row editable
        tbl_row.find('.row_data')
            .attr('edit_type', 'click')
            .removeClass('bg-warning')
            .css('padding', '')

        tbl_row.find('.row_data').each(function (index, val) {
            $(this).html($(this).attr('original_entry'));
        });
    });
    //--->button > cancel > end

    //--->save whole row entery > start	
    $(document).on('click', '.btn_save', function (event) {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');

        //hide save and cacel buttons
        tbl_row.find('.btn_save').hide();
        tbl_row.find('.btn_cancel').hide();

        //show edit button
        tbl_row.find('.btn_edit').show();


        //make the whole row editable
        tbl_row.find('.row_data')
            .attr('edit_type', 'click')
            .removeClass('bg-warning')
            .css('padding', '')

        //--->get row data > start
        var arr = {};
        tbl_row.find('.row_data').each(function (index, val) {
            var col_name = $(this).attr('col_name');
            var col_val = $(this).html();
            arr[col_name] = col_val;
        });
        //--->get row data > end

        //funcion modificar catedratico
        console.log(arr.id);
        console.log(arr.nombre);
        enviar ='{"curso":{"id":"'+arr.id+'","nombre": "'+arr.nombre+'"} }';
        editar(enviar);


    });
    //--->save whole row entery > end

    $(document).on('click', '.btn_delete', function (event) {
        event.preventDefault();
        var tbl_row = $(this).closest('tr');


        //--->get row data > start
        var arr = {};
        tbl_row.find('.row_data').each(function (index, val) {
            var col_name = $(this).attr('col_name');
            var col_val = $(this).html();
            arr[col_name] = col_val;
        });
        //--->get row data > end

        //funcion eliminar catedratico
        console.log("estamos en delete" + arr.id);
        console.log(arr.nombre);


    });


});



function editar(curso) {
    jQuery.ajax({
        url: "http://localhost:9098/backend/editarCurso",
        type: "POST",
        data: curso,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data.result == "true") {
                // Success Type
            
                toastr.success('Se edito correctamente', 'Action completada');
            } else {
                // Success Type

                toastr.error('No se logro editar', 'Erro');

            }
        }
    });
}

function eliminar(curso) {


    
}


