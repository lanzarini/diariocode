
function formatocelulatabela(value,r,i) {
if(value!=null){
     return '<a>'+value+'</a>'}
     else {return value}
}

function formatolinktabelaarea(value,r,i) {
   var retorno='';
    x=0;
    while(value[x]!=null){
        retorno+=('<a href="../area/'+value[x].id+'" target="_blank">'+value[x].nome+'</a>');
        if(value[x+1]!=null){
            retorno+=', ';
        }
        x++;
    }
    return retorno;
}

window.eventolinksetor = {
    'click a': function (e,x,y,z) {

         window.location.href='../setores/'+y.idsetor;         

    }
}

window.eventolinkunidade = {
    'click a': function (e,x,y,z) {

         window.location.href='../unidades/'+y.idunidade;         

    }
}

window.eventolinkestagio = {
    'click a': function (e,x,y,z) {

         window.location.href='../estagio/'+y.historico;         

    }
}

window.eventolinkarea = {
    'click a': function (e,x,y,z) {

         window.location.href='../area/'+y.idarea;         

    }
}

window.eventolinkcontrato = {
    'click a': function (e,x,y,z) {

         window.location.href='../contrato/'+y.contrato;         

    }
}

$(document).ready(function(){

    $('#recibo').click(function(){

        var contrato=$('input[name="contrato_id"]').val();
        $.ajax({
            url: '../Contratos/comprovarrecibo',
            type: 'post',
            data: {contrato},
        
            success: function(resultado){
                swal({
                                title: "Termo de contrato, plano de atividades e declaração considerados entregues pelo estagiario!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                //alert('Termo de contrato, plano de atividades e declaração considerados entregues pelo estagiario');
                location.reload();
            },
        });
    });

    $('#form_academico').submit(function(){
        event.preventDefault();
        var academico=$('input[name="academico"]').val();
        $.ajax({
            url: '../Usuarios/alteraracademico',
            type: 'post',
            data: $('#form_academico').serialize(),
            datatype:'json',
            success: function(resultado){
                
                switch(resultado){
                    case '1':
                        swal({
                                title: "Dados do aluno alterados com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        // $('#conteudo_modal').html('Dados do aluno alterados com sucesso!');
                        // $('#alert_modal').modal('show');

                    
                    break;
                    case '2':
                        sweetAlert("Dados não alterados!","error");
                        // $('#conteudo_modal').html('Dados não alterados!');
                        // $('#alert_modal').modal('show');

                    break;
                }

            }
        });
       
    });

    $('#opcoesfrequencia').click(function(){
       $('#myModalopcoes').appendTo("body");
    });

    $('#verrecessos').click(function(){
       $('#myModalrecessos').appendTo("body");
    });

    $('#numeroestagio').click(function(){
         window.location.href='estagio/'+$('#numeroestagio').val();
    });

    $('#linkarea').click(function(){
        if (($('select[name="Area"]').val()!="") && ($('select[name="Area"]').val()!=null)){
        window.open('../area/'+$('select[name="Area"]').val(),'_blank');}
    });
    $('#botaosubmitestagio').css('display','none');
    $('select[name="Status"]').css('margin','0px 0px');
    $('select[name="Tipodevaga"]').css('margin','0px 0px');
    $('select[name="Area"]').css('margin','0px 0px');
    $('select[name="Turno"]').css('margin','0px 0px');


    $('#numeroestagio').click(function(){
        var id=$('input[name="estagio"]').val();
            $.ajax({
                url: '../estagios/historicoatual',
                type: 'post',
                data: {id},
                success: function(retorno) {
                    window.location.href='../estagio/'+retorno;
                },
            });
         
    });

  $.ajax({  
        url: '../usuarios/dadosacademico',
        type: 'post',
        data: {matricula:$('input[name="academico"]').val()},
        datatype:'JSON',
        success:function(result){
            var data=result['contratosdesligados'];
            var data2=result['estagioscandidatados'];
            $("#tabelacontr_desligados").bootstrapTable('load',data);
            $("#tabelaestagioscandidatados").bootstrapTable('load',data2);

            var areasadd=result["areasadd"];
            var option2 = '';
            $.each(areasadd, function(k, v){
                option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
            });
            $('select[name="Area"]').html(option2).show();

        }
    });


});