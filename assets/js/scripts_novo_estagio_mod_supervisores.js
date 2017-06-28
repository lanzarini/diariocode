function carregarareaspopover(id){
        //event.preventDefault();
    for(var i = 0; i < areasadd.length; i++) {
        if(areasadd[i].id == id) {
            var teste=areasadd.splice(i, 1);
            area.push(teste[0]);
            break;
        }
        return false;
    }
    
    $("[data-toggle='popover']").popover('hide');
    var li='<div class="list-group">';
    var option2 = '<option></option>';
    $.each(area, function(k, v){
        option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
    });
    $.each(areasadd, function(k, v){
        li+='<a href="../area/'+v.id+'" value="'+v.id+'" target="_blank" class="list-group-item">'+v.nome  +'<button style="background-color:red;margin-left:5px;" id="buttonpopover" name="'+v.id+'" class="badge" form="" onclick="carregarareaspopover('+v.id+')">x</button></a>';
    });
    li+='</div>';
    $('#listapopover').attr('data-content',li);
    $('select[name="Area"]').html(option2).show();

    $("[data-toggle='popover']").popover('toggle');

    
}

/* ----------------------------------- DOM - jQuery --------------------------- */
var areasadd=[];
$(document).ready(function(){

    $('#form_novo_estagio').submit(function(){

        $.ajax({

            url: base_url + 'Supervisor/criarestagio',
            type: 'POST',
            data: $('#form_novo_estagio').serialize()+"&areas="+JSON.stringify(areasadd),
            success: function(retorno){

                switch(retorno){

                    case '0':
                        swal('Erro!', 'Falha ao criar estagio!', 'error');
                    break;
                    case '1':
                        swal('Cadastrado!', 'Pedido de estágio cadastrado com sucesso!', 'success');
                        setTimeout(function(){
                            location.reload()
                        },1500);
                    break;
                }
            }
        });

        return false;
    });
var nome=[];
    $("#orientador").blur(function(){
    if( $.inArray($(this).val(), nome) !== -1 ){
       $('#div_orientador').removeClass('has-error'); 
       $('#div_orientador').addClass('has-success');
    }else{
       $('#div_orientador').removeClass('has-success'); 
       $('#div_orientador').addClass('has-error');
       $("input[name='orientador']").val('');
    };
});
    


    // Carrega as Áreas no select #area
    $.ajax({
            url: base_url + 'Supervisor/getareas',
            type: 'POST',
         success:function(retorno){
             //alert(JSON.stringify(retorno));
             area = retorno;
             //alert(JSON.stringify(area));
            var option2 ='<option></option>';
            $.each(area, function(k, v){
                 option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
            });
            
           
           $('select[name="Area"]').append(option2);
        }
        
    });

    $('#addarea').click(function(){
        if(($('select[name="Area"]').val()==null) || ($('select[name="Area"]').val()=="")){
            sweetAlert("Escolha uma area existente!");//alert('Escolha uma Area');
        }
        for(var i = 0; i < area.length; i++) {
            if(area[i].id == $('select[name="Area"]').val()) {
                var teste=area.splice(i, 1);
                areasadd.push(teste[0]);
                break;
            }
        }
        //$("[data-toggle='popover']").popover('hide');

        //var li='<div class="list-group">';
        var option2 = '<option></option>';
        $.each(area, function(k, v){
            option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
        });
        var option3 = '<option></option>';
        $.each(areasadd, function(k, v){
            option3+='<option value="'+v.id+'">'+v.nome+'</option>';
            //li+='<a href="../area/'+v.id+'" value="'+v.id+'" target="_blank" class="list-group-item">'+v.nome  +'<button style="background-color:red;" id="buttonpopover" name="'+v.id+'" class="badge" form="" onclick="carregarareaspopover('+v.id+')">x</button></a>';
        });
        //li+='</div>';
        //$('#listapopover').attr('data-content',li);
        $('select[name="Area"]').html(option2).show();
        $('select[name="Areasadicionadas"]').html(option3).show();
    });

    $('#removarea').click(function(){
        if(($('select[name="Areasadicionadas"]').val()==null) || ($('select[name="Areasadicionadas"]').val()=="")){
            sweetAlert("Escolha uma area adicionada!");//alert('Escolha uma Area');
        }
        for(var i = 0; i < areasadd.length; i++) {
            if(areasadd[i].id == $('select[name="Areasadicionadas"]').val()) {
                var teste=areasadd.splice(i, 1);
                area.push(teste[0]);
                break;
            }
        }
        //$("[data-toggle='popover']").popover('hide');

        //var li='<div class="list-group">';
        var option2 = '<option></option>';
        $.each(area, function(k, v){
            option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
        });
        var option3 = '<option></option>';
        $.each(areasadd, function(k, v){
            option3+='<option value="'+v.id+'">'+v.nome+'</option>';
            //li+='<a href="../area/'+v.id+'" value="'+v.id+'" target="_blank" class="list-group-item">'+v.nome  +'<button style="background-color:red;" id="buttonpopover" name="'+v.id+'" class="badge" form="" onclick="carregarareaspopover('+v.id+')">x</button></a>';
        });
        //li+='</div>';
        //$('#listapopover').attr('data-content',li);
        $('select[name="Area"]').html(option2).show();
        $('select[name="Areasadicionadas"]').html(option3).show();
    });

   


    // $('#addarea').click(function(){
    //     if(($('select[name="area"]').val()==null) || ($('select[name="area"]').val()=="")){
    //         alert('Escolha uma Area');
    //     }
    //     //alert(JSON.stringify(area));
    //     for(var i = 0; i < area.length; i++) {
    //         if(area[i].id == $('select[name="area"]').val()) {
    //             var teste=area.splice(i, 1);
    //             areasadd.push(teste[0]);
    //             break;
    //         }
    //     }
    //     //$("[data-toggle='popover']").popover('hide');

    //     //var li='<div class="list-group">';
    //     var option2 = '<option></option>';
    //     var option = '<option></option>';
    //     $.each(area, function(k, v){
    //         option2 += '<option value="'+v.id+'">'+v.nome+'<a>asdf</a></option>';
    //     });
    //     $.each(areasadd, function(k, v){
    //         option += '<option value="'+v.id+'">'+v.nome+'</option>';
    //     });
    //     //$('#listapopover').attr('data-content',li);
    //     $('select[name="area"]').html(option2).show();
    //     $('select[name="areas"]').html(option).show();

    //     //$("[data-toggle='popover']").popover('toggle');
    //     //alert(JSON.stringify(areasadd));

    //     //alert(JSON.stringify($('select[name="Area"]').val()));

    // });



    // Carrega os supervisores que são vinculados a um determinado setor
    $("#setor").change(function(){

        $.ajax({
            
            url: base_url + 'Supervisor/getSupervisoresPorSetor',
            type: 'POST',
            data: {id_setor: $("#setor").val()},
            success: function(retorno){
            
                $("#supervisor").html(retorno);
            }
        })
    });

    // Carrega as Unidades no select #unidade
    $.ajax({
        
        url: base_url + 'Supervisor/getUnidadesSelect',
        type: 'POST',
        success: function(retorno){
            
            $('#unidade').append(retorno);
        }
    });

    // Ao selecionar uma determinada Unidade, carrega seus respectivos setores no select #setor
    $("#unidade").change(function(){

        $.ajax({
            
            url: base_url + 'Supervisor/getSetoresPorUnidade',
            type: 'POST',
            data: 'unidade_id=' + $('#unidade').val(),
            success: function(retorno){
            
                $('#setor').html(retorno);
                $('#setor').focus();
            }
        })
    });

    
});