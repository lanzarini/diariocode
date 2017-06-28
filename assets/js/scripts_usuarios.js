function formatocelulatabela(value,r,i) {
if(value!=null){
     return '<a>'+value+'</a>'}
     else {return value}
}

function formatoexcluirsupervisor(value,row,index){
  if (row.excluir==0){
    return '<button class="btn btn-primary">Excluir</button>';
  }
  else{
    return '<button class="btn btn-primary" disabled>Excluir</button>';
  }
}

function formatoacoesorientador(value,row,index){
  if(row.excluir==0){
    return '<div ><button class="btn btn-primary alterar" title="alterar">Alterar</button></div><div><button class="btn btn-primary excluir" title="excluir">Excluir</button></div>';
  }
  else{
    return '<div ><button class="btn btn-primary alterar" title="alterar">Alterar</button></div><div><button class="btn btn-primary excluir" title="excluir" disabled>Excluir</button></div>';
  }
}

window.eventoacoesorientador={
  'click .excluir': function(e, value, row, index){
    var id=[row.idss];
      $.ajax({
          url: 'usuarios/excluirorientador',
          type: 'POST',
          data: {id},
          success: function(resultado){
                    switch(resultado){
                        case '1':
                          swal({
                                title: "Orientador excluido com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                          $("#tabelaorientadores").bootstrapTable('remove', {field: 'idss',values:id});
                        break;
                        case '2':
                          sweetAlert("Orientador não pode ser excluido!","error");
                          
                        break;
                    }
          }
      });
    },
  
  'click .alterar': function(e, value, row, index){
   // console.log(row);
    $('#alterar_orientador_nome').val(row.nome);
    $('#alterar_orientador_disciplina').val(row.disciplina);
    $('#alterar_orientador_masp').val(row.masp);
    $('#alterar_orientador_curso').val(row.curso_orientador);
    $('#alterar_orientador_id').val(row.idss);
    $('#msg_modal_alterar_orientador').modal('show');
    $('#msg_modal_alterar_orientador').appendTo("body");
  }
}



window.eventoexcluirsupervisor = {
    'click button': function(e, value, row, index){
      var login=[row.cod_prof];
      $.ajax({
          url: 'supervisores/excluir',
          type: 'POST',
          data: {login},
          success: function(resultado){
                    switch(resultado){
                        case '1':
                          swal({
                                title: "Supervisor excluido com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                          $("#tabelasupervisores").bootstrapTable('remove', {field: 'cod_prof',values:login});
                        break;
                        case '2':
                          sweetAlert("Supervisor não pode ser excluido!","error");
                          
                        break;
                    }
          }
      });
}
}

window.eventolinktabelaestagios = {
    'click a': function (e,x,y,z) {

         window.location.href='estagio/'+y.historico;         

    }
}

window.eventolinktabelacontratos= {
    'click a': function (e,x,y,z) {

         window.location.href='contrato/'+y.Contratoativo;         

    }
}

window.eventolinktabelaacademicos = {
    'click a': function (e,x,y,z) {

         window.location.href='academico/'+y.matriculas;         

    }
}

window.eventolinktabelasupervisores = {
    'click a': function (e,x,y,z) {

         window.location.href='supervisor/'+y.cod_prof;         

    }
}

$(document).ready(function(){

var locHash = location.hash;

  if ( $(locHash).length>0 ){

    $("#academicos").removeClass('active');
    $('li[name="#academicos"]').removeClass('active');
    $(locHash).addClass('in active');
    $(locHash).addClass('in active');
    $('li[name="'+locHash+'"]').addClass('active');
  }

  $.ajax({
        url: 'usuarios/getsupervisores',
        type: 'post',
        success:function(data){
            $("#tabelasupervisores").bootstrapTable('load',data);
        }
  });
  $.ajax({
        url: 'usuarios/getorientadores',
        type: 'post',
        success:function(data3){
            $("#tabelaorientadores").bootstrapTable('load',data3);
        }
  });


  $('#criar_orientador').click(function(){
    $('#msg_modal_orientador').appendTo("body");
  });

  $('input[name="cpf"]').prop('readonly',false);
  $('input[name="cpf"]').prop('required',true);
  $('input[name="nascimento"]').prop('readonly',false);
  $('input[name="nascimento"]').prop('required',true);
  $('input[name="nomesupervisor"]').prop('readonly',false);
  $('input[name="nomesupervisor"]').prop('required',true);
  $('input[name="rg"]').prop('readonly',false);
  $('input[name="rg"]').prop('required',true);
  $('input[name="submit"]').attr( "value", "criar supervisor" );
  $('#Senha').prop('required',true);
  $('#radio0').prop('checked',true);
  
$('#perfilcriado').click(function(){
window.location.href='supervisor/'+ $('#perfilcriado').val();
});

$('#form_alterar_orientador').submit(function(){
        //event.preventDefault();
        $.ajax({
            url: 'usuarios/alterarorientador',
            type: 'POST',
            data: $('#form_alterar_orientador').serialize(),
            error: function(asd) {
                     alert(JSON.stringify(asd));
                },
            success: function(resultado){

                switch(resultado){

                    case '1':
                      $('#msg_modal_alterar_orientador').modal('toggle');
                      swal({
                                title: "Orientador alterado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                      

                      $.ajax({
                          url: 'usuarios/getorientadores',
                          type: 'post',
                          datatype:'json',
                          success:function(retorno){
                              var data2=retorno;
                              $("#tabelaorientadores").bootstrapTable('load', data2);
                          }
                      });

                    break;
                    case '2':
                      sweetAlert("Orientador não pode ser alterado!","error");

                    break;
                }
            }
        });
       return false;
    });

$('#form_orientador').submit(function(){
        //event.preventDefault();
        $.ajax({
            url: 'usuarios/adicionarorientador',
            type: 'POST',
            data: $('#form_orientador').serialize(),
            error: function(asd) {
                     alert(JSON.stringify(asd));
                },
            success: function(resultado){

                switch(resultado){

                    case '1':
                      $('#msg_modal_orientador').modal('toggle');
                      swal({
                                title: "Orientador criado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });

                      $('#form_orientador').each (function(){
                        this.reset();
                      });
                      $.ajax({
                          url: 'usuarios/getorientadores',
                          type: 'post',
                          datatype:'json',
                          success:function(retorno){
                              var data2=retorno;
                              $("#tabelaorientadores").bootstrapTable('load', data2);
                          }
                      });

                    break;
                    case '2':
                      sweetAlert("Orientador não pode ser criado!","error");
                    break;
                }
            }
        });
       return false;
    });

$('#form_buscaaluno').submit(function(){
  $("#tabelaacademico").bootstrapTable('showLoading');
  //event.preventDefault();
    $.ajax({
        url: 'Usuarios/buscaaluno',
        type: 'post',
        data: $('#form_buscaaluno').serialize(),
        datatype:'json',
        success: function(resultado){
          $("#tabelaacademico").bootstrapTable('hideLoading');
          $("#tabelaacademico").bootstrapTable('load',resultado);

        }

    });
    return false;
});


$('#form_supervisor').submit(function(){
        //event.preventDefault();
      if( $('#Senha').val()==$('#SenhaConf').val()){
        $.ajax({
            url: 'supervisores/adicionarsupervisor',
            type: 'post',
            data: $('#form_supervisor').serialize(),
            error: function(asd) {
                     alert(JSON.stringify(asd));
                },
            success: function(resultado){
                //alert(JSON.stringify(resultado));
                 switch(resultado){
                    case '1':
                      swal({
                                title: "Supervisor criado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });

                      $('#perfilcriado').val($('input[name="cpf"]').val());
                      $('#form_supervisor').each (function(){
                        this.reset();
                      });
                      $.ajax({
                          url: 'supervisores/getsupervisores',
                          type: 'post',
                          datatype:'json',
                          success:function(retorno){
                              var data2=retorno;
                              $("#tabelasupervisores").bootstrapTable('load', data2);
                          }
                      });

                    break;
                    case '2':
                      sweetAlert("Supervisor não pode ser criado!","error");

                    break;
                }
            }
        });
      }else{
        sweetAlert("Confirmação de senha incorreta","error");
           }
       return false;
    });

  $('#showdadosacademico').click(function () {

    if($('#showdadosacademico').attr("value")=="Mostrar dados pessoais"){
      $('#showdadosacademico').attr( "value", "Ocultar dados pessoais" );
      $('#showdadosacademico').blur();
      $('#tabelaacademico').bootstrapTable('showColumn', 'cpf');
      $('#tabelaacademico').bootstrapTable('showColumn', 'nascimento');
      $('#tabelaacademico').bootstrapTable('showColumn', 'rg');
      $('#tabelaacademico').bootstrapTable('showColumn', 'cidade');
      $('#tabelaacademico').bootstrapTable('showColumn', 'endereco');
      $('#tabelaacademico').bootstrapTable('showColumn', 'numero');
      $('#tabelaacademico').bootstrapTable('showColumn', 'estado');
      $('#tabelaacademico').bootstrapTable('showColumn', 'cep');
      $('#tabelaacademico').bootstrapTable('showColumn', 'sexo');
      $('#tabelaacademico').bootstrapTable('showColumn', 'telefone');
      $('#tabelaacademico').bootstrapTable('showColumn', 'celular');
      $('#tabelaacademico').bootstrapTable('showColumn', 'email');
      $('#tabelaacademico').bootstrapTable('showColumn', 'bairro');

    }
    else if($('#showdadosacademico').attr("value")=="Ocultar dados pessoais"){
      $('#showdadosacademico').attr( "value", "Mostrar dados pessoais" );
       $('#showdadosacademico').blur();
      $('#tabelaacademico').bootstrapTable('hideColumn', 'cpf');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'nascimento');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'rg');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'cidade');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'endereco');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'numero');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'estado');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'cep');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'sexo');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'telefone');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'celular');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'email');
      $('#tabelaacademico').bootstrapTable('hideColumn', 'bairro');
    }
  });

  $('#showdadossupervisor').click(function () {

    if($('#showdadossupervisor').attr("value")=="Mostrar dados pessoais"){
      $('#showdadossupervisor').attr( "value", "Ocultar dados pessoais" );
      $('#showdadossupervisor').blur();
      $('#tabelasupervisores').bootstrapTable('showColumn', 'cpf');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'nascimento');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'rg');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'cidade');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'endereço');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'numero');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'estado');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'cep');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'sexo');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'telefone');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'celular');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'email');
      $('#tabelasupervisores').bootstrapTable('showColumn', 'bairro');

    }
    else if($('#showdadossupervisor').attr("value")=="Ocultar dados pessoais"){
      $('#showdadossupervisor').attr( "value", "Mostrar dados pessoais" );
       $('#showdadossupervisor').blur();
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'cpf');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'nascimento');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'rg');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'cidade');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'endereço');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'numero');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'estado');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'cep');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'sexo');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'telefone');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'celular');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'email');
      $('#tabelasupervisores').bootstrapTable('hideColumn', 'bairro');
    }
  });

});