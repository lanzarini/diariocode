function formatolinktabela(value,r,i) {
    if(value!=null){
     return '<a>'+value+'</a>'}
     else {return value}

}

function formatolinktabelaarea(value,r,i) {
   var retorno='';
    x=0;
    while(value[x]!=null){
        retorno+=('<a href="area/'+value[x].id+'" target="_blank">'+value[x].nome+'</a>');
        if(value[x+1]!=null){
            retorno+=', ';
        }
        x++;
    }
    return retorno;
}

function acoestablepedidos(v,r,i){
    return '<button class="btn btn-primary">Aprovar</button>'
}

window.acoesaprovarpedido={
    'click button':function(e,x,y,z){

        var id=y.Estagio_pedido;
        $.ajax({
                url: 'estagios/aprovarestagio',
                type: 'post',
                data: {id},
                datatype:'json',
                success: function(result) {

                    switch(result){

                    case 1:
                        swal({
                            title: "Estágio aprovado",
                            type: "success",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#2F3233"
                        });
                        //alert("Estagio aprovado");
                        $("#tablepedidos").bootstrapTable('remove', {field: 'Estagio_pedido',values:[id]});                
                    break;
                    case 0:
                        sweetAlert("Erro ao tentar renovar, supervisor inativo","error");
                        //alert("Supervisor inativo, modifique o estagio!")
                    break;
                    }
                    
                },
                
            });
    }
}

window.linkestagio = {
    'click a': function (e,x,y,z) {

         window.location.href='estagio/'+y.historico;         
    }
}
window.linkcontrato = {
    'click a': function (e,x,y,z) {

         window.location.href='contrato/'+y.contrato;         
    }
}
window.linkarea = {
    'click a': function (e,x,y,z) {

         window.location.href='area/'+y.idarea;         
    }
}
window.linkunidade = {
    'click a': function (e,x,y,z) {

         window.location.href='unidades/'+y.idunidade;         
    }
}
window.linksetor = {
    'click a': function (e,x,y,z) {

         window.location.href='setores/'+y.idsetor;         
    }
}
window.linkacademico = {
    'click a': function (e,x,y,z) {

         window.location.href='academico/'+y.idacademico;         
    }
}

function carregarareaspopover(id){
    event.preventDefault();

    for(var i = 0; i < areasadd.length; i++) {
        if(areasadd[i].id == id) {
            var teste=areasadd.splice(i, 1);
            area.push(teste[0]);
            break;
        }
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

var area;
var areasadd=[];
$(document).ready(function(){

$('#form_estagio').submit(function(){
   event.preventDefault();
    $.ajax({
        url: 'estagios/criarestagio',
        type: 'post',
        data: $('#form_estagio').serialize()+"&areas="+JSON.stringify(areasadd),

        success: function(resultado){
                            window.location.href='estagios';

      
            
        }
    });
});

$('#numeroestagio').prop('hidden',true);
$('select[name="Status"]').val('2');
$('select[name="Tipodevaga"]').prop('disabled',false);
$('select[name="Area"]').prop('disabled',false);
$('input[name="orientador"]').prop('readonly',false);
$('input[name="entrada"]').prop('readonly',false);
$('input[name="saida"]').prop('readonly',false);
$('select[name="Turno"]').prop('disabled',false);
$('input[name="duracao"]').prop('readonly',false);


$('#linkarea').click(function(){
    if (($('select[name="Area"]').val()!="") && ($('select[name="Area"]').val()!=null)){
    window.open('area/'+$('select[name="Area"]').val(),'_blank');}
    else{

        $('#msg_modal_create').html('<form id="form_areas" method="post"><div class="form-group"><label for="area">Área:</label><input type="text" class="form-control" id="nomearea" name="area"  title="Apenas letras" required="required" pattern="[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\\s]+$"></div></form>');
        $('#modal_footer').html('<button type="submit" form="form_areas" class="btn btn-primary"  id="botaochecknamearea" disabled >Adicionar</button><button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>');
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");
        $('#nomearea').on('keyup', function(){
            $('#botaochecknamearea').prop('disabled', ($(this).val() == 0)); 
        });

        $('#form_areas').submit(function(){
        
            event.preventDefault();
            $.ajax({
                url: 'Areas/adicionararea',
                type: 'post',
                data: $('#form_areas').serialize(),
                datatype:'json',
                error: function(retorno) {
                    alert(JSON.stringify(retorno));
                },
                 success:function(retorno){
                    var data=retorno;
                    var option2 = '<option></option>';
                    $.each(data, function(k, v){
                      option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
                    });
                    $('select[name="Area"]').html(option2).show();
                    $('#modal_create').modal('toggle');
                }
            });
           
        });
    }
});

$('#linkunidade').click(function(){
    if (($('select[name="unidade"]').val()!="") && ($('select[name="unidade"]').val()!=null)){
    window.open('unidades/'+$('select[name="unidade"]').val(), '_blank');}
    else{
        $('#msg_modal_create').html('<form id="form_add_unidade" method="POST"><div class="form-group"><label for="unidade">Unidade:</label><input type="text" class="form-control" id="unidade" name="unidade" required="required" pattern="[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\\s]+$"></div><div class="form-group"><label for="vagas_autorizadas">Vagas autorizadas:</label><input type="number" class="form-control" id="vagas_autorizadas" name="vagas_autorizadas" required=""></div><button type="submit" class="btn btn-primary btn-block">Adicionar</button></form>');
        $('#modal_footer').html('<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>');
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");

            $('#form_add_unidade').submit(function(){
                event.preventDefault();
                $.ajax({
                    url: 'Unidades/adicionarUnidade',
                    type: 'post',
                    dataType: 'json',
                    data: $('#form_add_unidade').serialize(),
                    success: function(resultado){
                        var data=resultado;
                        var option = '<option></option>';
                        $.each(data, function(k, v){
                            option += '<option value="'+v.id+'">'+v.unidade+'</option>';
                        });
                        $('select[name="unidade"]').html(option).show();
                        $('#modal_create').modal('toggle');
                    }
                });
            });
    }
});

$('#linkorientador').click(function(){
    if ($('#div_orientador').hasClass('has-success')){
    window.open('usuarios#buscarorientador', '_blank');}
    else {
        $('#msg_modal_create').html('<form id="form_orientador" method="post"><div class="form-group"><div ><label >Orientador</label><input data-toggle="tooltip" title="Nome do orientador!" class="form-control" name="nomeorientador" required></div>   <div ><label >Masp</label><input data-toggle="tooltip" title="masp do orientador" name="masporientador" class="form-control" >            </div></div><div class="form-group"><div ><label >Curso</label><input data-toggle="tooltip" title="Curso de atuação do orientador" name="curso_orientador" class="form-control"  ></div>   <div ><label >Disciplina</label><input data-toggle="tooltip" title="Disciplina ministrada pelo orientador" name="disciplina" class="form-control"></div></div></form>');
        $('#modal_footer').html('<button type="submit" form="form_orientador" class="btn btn-primary">Criar</button><button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>'); 
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");
        $('#form_orientador').submit(function(){
            event.preventDefault();
            $.ajax({
                url: 'usuarios/adicionarorientador',
                type: 'POST',
                data: $('#form_orientador').serialize(),
                error: function(asd) {
                         alert(JSON.stringify(asd));
                },
                success: function(resultado){
                    nome.push($('input[name="nomeorientador"]').val());
                    $( "input[name='orientador']" ).autocomplete({source: nome});
                    $('#modal_create').modal('toggle');
                }
            });
       
        });
    }
});

$('#linkSupervisor').click(function(){
    if (($('select[name="Supervisor"]').val()!="") && ($('select[name="Supervisor"]').val()!=null)){
    window.open('supervisor/'+$('select[name="Supervisor"]').val(), '_blank');
    }
    else if (($('select[name="setor"]').val()!="") && ($('select[name="setor"]').val()!=null)){
        $('.modal-dialog').removeClass('modal-sm');
        $('.modal-dialog').addClass('modal-lg');
       //$('#msg_modal_create').html('<form id="form_supervisor" method="post">    <div class="row">        <div class="form-group  col-sm-9 col-xs-12">            <label >Supervisor</label>            <input data-toggle="tooltip" title="Nome do supervisor" class="form-control" name="nomesupervisor" > </div>           <div class="form-group  col-sm-3 col-xs-12">            <label >Masp</label>            <input data-toggle="tooltip" title="Masp do supervisor" name="masp" class="form-control" >                    </div>    </div>    <div class="row">        <div class="form-group col-sm-6 col-xs-12">            <label >Curso de formação</label>            <input data-toggle="tooltip" title="Curso de formação do supervisor" name="formação" class="form-control"  >                    </div>           <div class="form-group col-sm-6 col-xs-12">            <label >Área de atuação</label>            <input data-toggle="tooltip" title="Área em que o supervisor atua" name="atuação" class="form-control" >      </div> </div> <div class="form-group row "><div class="radio"><label for="chefedepartamento">Realiza pedido de estágio:</label><label><input type="radio" value="1" name="chefedepartamento"><span class="circle"></span><span class="check"></span>Sim</label><label><input type="radio" value="0" name="chefedepartamento" checked=""><span class="circle"></span><span class="check"></span>Não</label></div></div>       <div class="row">        <div class="form-group col-sm-4 col-xs-4">            <label >Identidade</label>            <input data-toggle="tooltip" title="RG" type="text" class="form-control" name="rg" >        </div>        <div class="form-group col-sm-4 col-xs-4">            <label >cpf</label>            <input data-toggle="tooltip" title="CPF" type="text" class="form-control" name="cpf" >        </div>        <div class="form-group col-sm-4 col-xs-4">            <label >Nascimento</label>            <input data-toggle="tooltip" title="Data de nascimento" type="date" class="form-control" name="nascimento" >        </div>        </div>    <div class="row">        <div class="form-group col-xs-9">            <label >Endereço</label>            <input data-toggle="tooltip" title="Rua" type="text" class="form-control" name="rua" >        </div>        <div class="form-group col-xs-3">            <label >Número</label>            <input data-toggle="tooltip" title="Número" type="text" class="form-control" name="numero" >        </div>     </div>    <div class="row">        <div class="form-group col-sm-4 col-xs-8">            <label >Bairro</label>            <input data-toggle="tooltip" title="Bairro" type="text" class="form-control" name="bairro" >        </div>        <div class="form-group col-sm-2 col-xs-4">            <label >CEP</label>            <input data-toggle="tooltip" title="CEP" type="text" class="form-control" name="cep" >        </div>        <div class="styled-select form-group col-sm-4 col-xs-8">            <label >Cidade</label>            <input data-toggle="tooltip" title="Cidade" name="cidade" class="form-control" >                    </div>          <div class="form-group styled-select col-sm-2 col-xs-4">            <label >Estado</label>            <input data-toggle="tooltip" title="Estado" name="estado" class="form-control"  >                    </div>          </div>    <div class="row"><div class="form-group col-sm-6">                    <label >Email</label>            <input data-toggle="tooltip" title="Email" type="text" class="form-control" name="email" >           </div>         <div class="form-group col-sm-3 col-xs-6"  >            <label >Telefone</label>            <input data-toggle="tooltip" title="Telefone fixo" type="text" class="form-control" name="telefone" >        </div>        <div class="form-group col-sm-3 col-xs-6 " >            <label >Celular</label>            <input data-toggle="tooltip" title="Telefone móvel" type="text" class="form-control" name="celular" >        </div>    </div> </form>');
        $('#modal_footer').html('<button type="submit" form="form_supervisor" class="btn btn-primary" >Adicionar</button><button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>');
        
    $('#msg_modal_create').html('<form id="form_supervisor" method="post"><div class="row"><div class="col-sm-9 col-xs-12"><div class="form-group"><label class="control-label">Supervisor</label><input data-toggle="tooltip" title="Nome do supervisor" class="form-control" name="nomesupervisor"><input type="hidden" name="login" ></div>        </div>        <div class="col-sm-3 col-xs-12">            <div class="form-group">                <label class="control-label">Masp</label>                <input data-toggle="tooltip" title="Masp do supervisor" name="masp" class="form-control" >            </div>        </div>    </div>    <div class="row">        <div class="col-sm-6 col-xs-12">            <div class="form-group">                <label class="control-label">Curso de formação</label>                <input data-toggle="tooltip" title="Curso de formação do supervisor" name="formação" class="form-control" >                        </div>        </div>        <div class="col-sm-6 col-xs-12">            <div class="form-group">                <label class="control-label">Área de atuação</label>                <input data-toggle="tooltip" title="Area em que o supervisor atua" name="atuação" class="form-control" >                        </div>        </div>    </div>   <div class="form-group row "><div class="radio"><label for="chefedepartamento">Realiza pedido de estágio:</label><label><input type="radio" value="1" name="chefedepartamento"><span class="circle"></span><span class="check"></span>Sim</label><label><input type="radio" value="0" name="chefedepartamento" checked=""><span class="circle"></span><span class="check"></span>Não</label></div></div>    <div class="row">        <div class="col-sm-4 col-xs-4">            <div class="form-group">                <label class="control-label">Identidade</label>                <input data-toggle="tooltip" title="RG" type="text" class="form-control" name="rg"  >            </div>        </div>        <div class="col-sm-4 col-xs-4">            <div class="form-group">                <label class="control-label">CPF</label>                <input data-toggle="tooltip" pattern="[0-9]+$" title="CPF" type="text" class="form-control" name="cpf"  >            </div>        </div>        <div class="col-sm-4 col-xs-4">            <div class="form-group">                <label class="control-label">Nascimento</label>                <input data-toggle="tooltip" title="data de nascimento" type="date" class="form-control" name="nascimento"  >            </div>        </div>    </div>    <div class="row">        <div class="col-xs-6">            <div class="form-group">                <label class="control-label">Endereço</label>                <input data-toggle="tooltip" title="Rua" type="text" class="form-control" name="rua" >            </div>        </div>        <div class="col-xs-2">            <div class="form-group">                <label class="control-label">Número</label>                <input data-toggle="tooltip" title="Número" type="text" class="form-control" name="numero" >            </div>         </div>         <div class="col-sm-4 col-xs-8">            <div class="form-group">                <label class="control-label">Bairro</label>                <input data-toggle="tooltip" title="Bairro" type="text" class="form-control" name="bairro">            </div>        </div>            </div>    <div class="row">        <div class="col-sm-2 col-xs-4">            <div class="form-group">                <label class="control-label">CEP</label>                <input data-toggle="tooltip" title="CEP" type="text" class="form-control" name="cep" >            </div>          </div>        <div class="col-sm-4 col-xs-8">            <div class="form-group">                <label class="control-label">Cidade</label>                <input data-toggle="tooltip" title="Cidade" name="cidade" class="form-control" >            </div>        </div>          <div class="col-sm-2 col-xs-4">            <div class="form-group">                <label class="control-label">Estado</label>                <input data-toggle="tooltip" title="Estado" name="estado" class="form-control" >                        </div>        </div>            <div class="col-sm-4">            <div class="form-group">                    <label class="control-label">E-mail</label>                <input data-toggle="tooltip" title="Email" type="text" class="form-control" name="email" >            </div>        </div>     </div>    <div class="row">        <div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Telefone</label>                <input data-toggle="tooltip" title="Telefone fixo" type="text" class="form-control" name="telefone" >            </div>        </div><div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Celular</label>                <input data-toggle="tooltip" titlefixo="Telefone movel" type="text" class="form-control" name="celular">            </div>        </div><div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Senha</label>                <input required type="password" class="form-control" name="senha" value="" id="Senha">            </div>        </div>                <div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Confirmar Senha</label>                <input  type="password" class="form-control" name="senhaconf" value="" id="SenhaConf">            </div>        </div>                  </div></form> ');


        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");
        $('#form_supervisor').submit(function(){
            event.preventDefault();
            $.ajax({
                url: 'supervisores/adicionarsupervisor',
                type: 'post',
                data: $('#form_supervisor').serialize(),
                success: function(resultado){
                    event.preventDefault();
                    var idsupervisor=$('input[name="cpf"]').val();
                    var ids=[$('select[name="setor"]').val()];
                    $.ajax({
                        url:'setores/addsupervisorsetores',
                        type:'POST',
                        data:{ids,idsupervisor},
                        success: function(retorno){
                            var id=$('select[name="setor"]').val();
                            event.preventDefault();
                            $.ajax({   
                                url: 'setores/getsupervisoressetor',
                                type: 'POST',
                                data: {id},
                                datatype:'json',
                                success: function(asd){
                                    var option = '<option></option>';
                                    $.each(asd, function(k, v){
                                        option += '<option value="'+v.sup_login+'">'+v.sup_nome+'</option>';
                                    });
                                    $('select[name="Supervisor"]').html(option).show();
                                    $('#modal_create').modal('toggle');
                                    $('.modal-dialog').removeClass('modal-lg');
                                    $('.modal-dialog').addClass('modal-sm');
                                }
                            });
                        }
                    });
                }
            });
        });
    }
});

$('#linksetor').click(function(){
    if (($('select[name="setor"]').val()!="") && ($('select[name="setor"]').val()!=null) ){
       window.open('setores/'+$('select[name="setor"]').val(), '_blank');
    }
    else if (($('select[name="unidade"]').val()!="") && ($('select[name="unidade"]').val()!=null)){
        $('#msg_modal_create').html('<form id="form_add_setor" method="POST"><div class="form-group"><label for="unidade">Nome do setor:</label><input type="text" class="form-control" id="setor" name="setor"><input type="hidden" name="id" value="'+$('select[name="unidade"]').val()+'"></div><button type="submit" class="btn btn-primary btn-block">Adicionar</button></form>');
        $('#modal_footer').html('<button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_exc_set">Fechar</button>');
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");

        $('#form_add_setor').submit(function(){
            event.preventDefault();
            $.ajax({
                url: "Setores/adicionarSetor",
                type: "POST",
                dataType: "json",
                data: $('#form_add_setor').serialize(),
                success: function(resultado){
                    var data=resultado;
                    var option = '<option></option>';
                    $.each(data, function(k, v){
                        option += '<option value="'+v.id_setor+'">'+v.nome_setor+'</option>';
                    });
                    $('select[name="setor"]').html(option).show();
                    $('#btn_exc_set').click();
                }
            });
        });
    }
});

$('select[name="unidade"]').change(function () { 
        var id=$('select[name="unidade"]').val();
        $.ajax({   
            url: 'setores/getsetores',
            type: 'POST',
            data: {id},
            datatype:'json',
            success: function(asd){
                var option = '<option></option>';
                $.each(asd, function(k, v){
                    option += '<option value="'+v.id_setor+'">'+v.nome_setor+'</option>';
                });
                $('select[name="setor"]').html(option).show();

                var id=$('select[name="setor"]').val();
                $.ajax({   
                    url: 'setores/getsupervisoressetor',
                    type: 'POST',
                    data: {id},
                    datatype:'json',
                    success: function(asd){
                        var option = '<option></option>';
                        $.each(asd, function(k, v){
                            option += '<option value="'+v.sup_login+'">'+v.sup_nome+'</option>';
                        });
                        $('select[name="Supervisor"]').html(option).show();

                    }
                });
            }
        });

    });  

$('select[name="setor"]').change(function () { 
        var id=$('select[name="setor"]').val();
        $.ajax({   
            url: 'setores/getsupervisoressetorativo',
            type: 'POST',
            data: {id},
            datatype:'json',
            success: function(asd){
                var option = '<option></option>';
                $.each(asd, function(k, v){
                    option += '<option value="'+v.sup_login+'">'+v.sup_nome+'</option>';
                });
                $('select[name="Supervisor"]    ').html(option).show();

            }
        });

});
var nome=[];


$("input[name='orientador']").blur(function(){
    if( $.inArray($(this).val(), nome) !== -1 ){
       $('#div_orientador').removeClass('has-error'); 
       $('#div_orientador').addClass('has-success');
    }else{
       $('#div_orientador').removeClass('has-success'); 
       $('#div_orientador').addClass('has-error');
       $("input[name='orientador']").val('');
    };
});

    $.ajax({  

        url: 'estagios/dadosestagios',
        type: 'POST',
        datatype:'json',
         success:function(result){
            
            $.each(result["orientadores"], function(k, v){
                 nome.push(v.nome);
            });

            $( "input[name='orientador']" ).autocomplete({source: nome});
            
            area = result["areas"];
            
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

            var option = '<option></option>';
            $.each(result["unidades"], function(k, v){
                option += '<option value="'+v.id+'">'+v.unidade+'</option>';
            });
            $('select[name="unidade"]').html(option).show();
            var data1=result["estagios"];
            $("#tableestagios").bootstrapTable('load',data1);
            var data2=result["pedidos"];
             $("#tablepedidos").bootstrapTable('load',data2);
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

    //$('[data-toggle="popover"]').popover();

});