function formatocelulatabela(value,r,i) {
    if(value!=null){
        return '<a>'+value+'</a>'}
    else {return value}

}

function convocado(value,row,index){
    if(row.chamada=='1'){
        if(row.chamado=='1'){
            return {disabled:true, checked:true};
        }else{
        return {disabled:true};
        }
    }
}

window.eventolinkcontrato={
    'click a': function (e,x,y,z) {

         window.location.href='../contrato/'+y.contrato;         

    }
}

window.eventolinktabelaacademicos = {
    'click a': function (e,x,y,z) {

         window.location.href='../academico/'+y.matricula;         

    }
}

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

function formatolinkhistorico(valoue,row,index){
    return '<div ><button class="btn btn-primary" title="Estagio">Estágio</button></div>';
}

window.eventolinkhistorico={
    'click button':function(e,value,row,index){
         window.location.href='../estagio/'+row.historico; 
    }
}

function formatoacoescandidatos(value,row,index){
  if(row.chamada!='0'){
    if(row.chamado=='1'){
        return '<div ><button class="btn btn-primary desconvocar" title="Desconvocar">Cancelar convocação</button></div>';
    }
    return '<div ><button class="btn btn-primary Convocar" disabled title="Convocar">Convocar</button></div>';//<div><button class="btn btn-primary Enviarnotificação" title="Enviar notificação">Enviar notificação</button></div>';
  }
  else{
    return '<div ><button class="btn btn-primary Convocar"  title="Convocar">Convocar</button></div>';//<div><button class="btn btn-primary Enviarnotificação" title="Enviar notificação" >Enviar notificação</button></div>';
  }
}

window.eventoacoescandidatos={
    'click .Convocar': function(e, value, row, index){

        $('#msg_modal_create').html('<form id="form_convocar" method="post"><div class="form-group"><input hidden="hidden" name="matricula" value="'+row.matricula+'">  <input hidden="hidden" name="idestagio" value="'+$('input[name="estagio"]').val()+'"><input hidden="hidden" name="historico" value="'+$('input[name="historico"]').val()+'"><label for="notificacao">Notificação:</label><textarea class="form-control ativo" rows="6" name="notificacao" required="required">Favor comparecer a pró-reitoria de extensão da unimontes portanto os documentos para validação do contrato no estagio '+$('input[name="estagio"]').val()+' : rg, cpf, identidade</textarea></div></form>');
        
        $('#modal_footer').html('<input type="submit" form="form_convocar" id="btn_form_convocar" class="btn btn-primary" value="Convocar"><button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>');
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");



        $('#form_convocar').submit(function(){

            // $.ajax({
            //     url: "../estagios/verificarvagaunidade",
            //     type: "post",
            //     datatype:'json',
            //     data: $("#form_convocar").serialize(),
            //     success: function(resultado){
            //         //alert(JSON.stringify(resultado));
            //         switch(resultado){
            //             case 1:
            //                 sweetAlert("O número de estágios destinados a unidade foi excedido!","Atenção");
            //                 // swal({
                            //         title: "Dados do aluno alterados com sucesso!",
                            //         type: "success",
                            //         confirmButtonText: "OK",
                            //         confirmButtonColor: "#2F3233"
                            //     });
                            // $('#conteudo_modal').html('Dados do aluno alterados com sucesso!');
                            // $('#alert_modal').modal('show');
                            $.ajax({
                                url: "../estagios/convocarcandidato",
                                type: "post",
                                datatype:'json',
                                data: $("#form_convocar").serialize(),
                                success: function(resultado){
                                    
                                    $('#modal_create').modal('toggle');
                                    $("#tablecandidatos").bootstrapTable('load',resultado);
                                    $('select[name="Status"]').val('3');
                                    $('#contratarchamado').prop('disabled',false);
                                }
                            });
                        
            //             break;
            //             case 2:
            //                 $.ajax({
            //                     url: "../estagios/convocarcandidato",
            //                     type: "post",
            //                     datatype:'json',
            //                     data: $("#form_convocar").serialize(),
            //                     success: function(resultado){
                                    
            //                         $('#modal_create').modal('toggle');
            //                         $("#tablecandidatos").bootstrapTable('load',resultado);
            //                         $('select[name="Status"]').val('3');
            //                         $('#contratarchamado').prop('disabled',false);
            //                     }
            //                 });

            //             break;
            //         }
            //     }
            // });
            //event.preventDefault();
            
            return false;
        });
    },
    'click .desconvocar': function(e, value, row, index){
        $('#msg_modal_create').html('<form id="form_desconvocar" method="post"><div class="form-group"><input hidden="hidden" name="matricula" value="'+row.matricula+'">  <input hidden="hidden" name="idestagio" value="'+$('input[name="estagio"]').val()+'"><label for="notificacao">Notificação:</label><textarea class="form-control" rows="6" name="notificacao" required="required">Sua chamada para contrato no estagio '+$('input[name="estagio"]').val()+' foi cancelada.</textarea></div></form>');
        $('#modal_footer').html('<input type="submit" form="form_desconvocar" class="btn btn-primary" value="Cancelar convocação"><button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>');
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");
    
        $('#form_desconvocar').submit(function(){
            //event.preventDefault();
            $.ajax({
                url: "../estagios/desconvocarcandidato",
                type: "post",
                datatype:'json',
                data: $("#form_desconvocar").serialize(),
                success: function(resultado){
                    $('#modal_create').modal('toggle');
                    $("#tablecandidatos").bootstrapTable('load',resultado);
                    $('select[name="Status"]').val('2');
                    $('#contratarchamado').prop('disabled',true);
                }
            });
            return false;
        });
    },

}
var area;
var areasadd;
$(document).ready(function(){

    $('#form_academico').submit(function(){
        //event.preventDefault();
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
       return false;
    });

    $('#renovarestagio').click(function(){
        $.ajax({
            url: '../Estagios/aprovarestagio',
            type: 'post',
            data: {id:$('input[name="estagio"]').val()},
            datatype:'json',
            success: function(resultado){
                switch(resultado){
                    case 1:
                    swal({
                                title: "Renovação concluida!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                    //alert("Renovação concluida!");
                    setTimeout(function(){
                            location.reload()
                        },100);
                    break;
                    case 0:
                    sweetAlert("Erro ao tentar renovar, supervisor inativo!","error");
                    //alert("Erro ao tentar renovar, supervisor inativo!");
                    break;
                }
            }
        });
    });

    $('#cancelarestagio').click(function(){
        $.ajax({
            url: '../Estagios/desativarestagio',
            type: 'post',
            data: {id:$('input[name="estagio"]').val()},
            datatype:'json',
            success: function(resultado){
                switch(resultado){
                    case 1:
                    swal({
                        title: "Estagio desativado!",
                        type: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#2F3233"
                    });
                    //alert("Estagio desativado!");
                    window.location.href="../estagios/";
                    // setTimeout(function(){
                    //         location.reload()
                    //     },100);
                    break;
                    case 0:
                    sweetAlert("Erro ao tentar renovar, supervisor inativo!","error");
                    //alert("Erro ao tentar renovar, supervisor inativo!");
                    break;
                }
            }
        });
    });

    $('#form_estagio').submit(function(){
        if($('input[name="contrato_id"]').val()!=null){
            if(areasadd==""){
                //event.preventDefault();
                sweetAlert("Adicione alguma area ao estagio","error");
                // swal({
                //         title: "!",
                //         type: "success",
                //         confirmButtonText: "OK",
                //         confirmButtonColor: "#2F3233"
                //     });
                //alert("Adicione alguma area ao estagio!");
                return false;
            }
            else{ 
                //alert(JSON.stringify($('input[name="contrato_id"]').val()));
                swal({
                title: "Alterar o estagio afetará o contrato de numero [ "+$('input[name="contrato_id"]').val()+" ] , deseja continuar com a operação?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                        url: "../estagios/alterarestagio",
                        type: "post",
                        datatype:"json",
                        data: $("#form_estagio").serialize()+"&areas="+JSON.stringify(areasadd),
                        success: function(resultado){
                            swal({
                                    title: resultado["msg"],
                                    type: "success",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#2F3233"
                                });
                            if(resultado["historico"]){
                                window.location.href="../estagio/"+resultado["historico"];
                            }
                        }
                });
                
            });
            return false;
                // if(confirm("Alterar o estagio afetará o contrato de numero [ "+$('input[name="contrato_id"]').val()+" ] , deseja continuar com a operação?") == true){
                //     //event.preventDefault();
                //     $.ajax({
                //         url: "../estagios/alterarestagio",
                //         type: "post",
                //         datatype:"json",
                //         data: $("#form_estagio").serialize()+"&areas="+JSON.stringify(areasadd),
                //         success: function(resultado){
                //             alert(resultado["msg"]);
                //             if(resultado["historico"]){
                //             window.location.href="../estagio/"+resultado["historico"];}
                //         }
                //     });
                //     return false;
                // }
                // else{
                //     return false;
                //     //event.preventDefault();
                // }
            }
        }
        else{
            if(areasadd==""){
                //event.preventDefault();
                swal({
                    title: "Adicione alguma area ao estagio!",
                    type: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2F3233"
                });
                //alert("Adicione alguma area ao estagio!");
                return false;
            }
            else{
                //event.preventDefault();    
                $.ajax({        
                    url: "../estagios/alterarestagio",        
                    type: "post",        
                    data:$("#form_estagio").serialize()+"&areas="+JSON.stringify(areasadd),
                    datatype:"json",
                    success: function(resultado){
                        swal({
                            title: resultado["msg"],
                            type: "success",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#2F3233"
                        });
                        //alert(resultado["msg"]);  
                    }
                });
                return false;
            }

        }
    });
        

           

    

    $.ajax({ 

            url: '../estagios/dadosestagio',
            type: 'POST',
            datatype:'json',
            data:{estagio:$('input[name="historico"]').val()},
            success:function(result){
                
                if(result['estagio'][0]['atual']==0){
                    $('#botaosubmitestagio').prop('disabled',true);
                }
                
                // $.each(result["orientadores"], function(k, v){
                //      nome.push(v.nome);
                // });
                // $( "input[name='orientador']" ).blur();
                // $( "input[name='orientador']" ).autocomplete({source: nome});

                area = result["areas"];

                areasadd = result['areasadd'];
                
                //var li='<div class="list-group">';
                var option2 = '<option></option>';
                var option3 = '<option></option>';
                $.each(area, function(k, v){
                    option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
                });
                $.each(areasadd, function(k, v){
                    option3 += '<option value="'+v.id+'">'+v.nome+'</option>';
                    //li+='<a href="../area/'+v.id+'" value="'+v.id+'" target="_blank" class="list-group-item">'+v.nome+'<button style="background-color:red;margin-left:5px;" id="buttonpopover" name="'+v.id+'" class="badge" form="" onclick="carregarareaspopover('+v.id+')">x</button></a>';
                });
                //li+='</div>';
                //$('#listapopover').attr('data-content',li);
                $('select[name="Area"]').html(option2).show();
                $('select[name="Areasadicionadas"]').html(option3).show();
    
                var option = '<option></option>';
                $.each(result['unidades'], function(k, v){
                    option += '<option value="'+v.id+'">'+v.unidade+'</option>';
                });
                $('select[name="unidade"]').html(option).show();
                $('select[name="unidade"]').val(result['estagio'][0]['idunidade']);

                var optionsetores = '<option></option>';
                 $.each(result['setores'], function(k, v){
                    optionsetores += '<option value="'+v.id_setor+'">'+v.nome_setor+'</option>';
                });
                $('select[name="setor"]').html(optionsetores).show();
                $('select[name="setor"]').val(result['estagio'][0]['idsetores']);

                var optionsupervisor = '<option></option>';
                 $.each(result['supervisores'], function(k, v){
                    optionsupervisor += '<option value="'+v.sup_login+'">'+v.sup_nome+'</option>';
                });
                $('select[name="Supervisor"]').html(optionsupervisor).show();
                $('select[name="Supervisor"]').val(result['estagio'][0]['sup_id']);

                var data=result['listadecandidatos'];
                $("#tablecandidatos").bootstrapTable('load',data);
                $.each(result['listadecandidatos'], function(k, v){
                    if(v.chamado=='1'){$('#contratarchamado').prop('disabled',false);}
                });


                var antigoscontratos=result['contratosantigos'];    
                $("#tablecontratosantigos").bootstrapTable('load',antigoscontratos);

            }
        });
    $('#botaosubmitestagio').val('Alterar');
    if($('select[name=Status]').val()=='4'){
    $('#aprovarestagio').attr("type","button");
}

    $('#contratarchamado').click(function(){
        var historico=$('input[name="historico"]').val();
        $.ajax({
                url: "../estagios/verificarvagaunidade",
                type: "post",
                datatype:'json',
                data: $("#form_convocar").serialize(),
                success: function(resultado){
                    //alert(JSON.stringify(resultado));
                    switch(resultado){
                        case 1:
                            sweetAlert("O número de estágios destinados a unidade foi excedido!","Atenção");
                            $.ajax({
                                url: '../contratos/criarcontrato',
                                type: 'post',
                                data: {historico},
                                success:function(){
                                    location.reload();
                                }
                            });
                            
                        
                        break;
                        case 2:
                            $.ajax({
                                url: '../contratos/criarcontrato',
                                type: 'post',
                                data: {historico},
                                success:function(){
                                    location.reload();
                                }
                            });

                        break;
                    }
                }
            });
        
    });

    $('#aprovarestagio').click(function(){

       
                        var id=$('input[name="estagio"]').val();
                        $.ajax({
                            url: '../estagios/aprovarestagio',
                            type: 'post',
                            data: {id},
                            success: function(result) {
                                switch(result){

                                case 1:
                                    swal({
                                        title: "Estagio aprovado!",
                                        type: "success",
                                        confirmButtonText: "OK",
                                        confirmButtonColor: "#2F3233"
                                    });
                                    //alert("Estagio aprovado");
                                    window.location.href='../estagio/'+$('input[name="historico"]').val();
                            
                                break;
                                case 0:
                                    sweetAlert("Supervisor inativo, modifique o supervisor!","error");
                                    //alert("Supervisor inativo, modifique o supervisor!")

                                break;
                                }
                                
                            },
                        });
                        
    }); 
    $('select[name="Area"]').prop('disabled',false);
    $('select[name="Tipodevaga"]').prop('disabled',false);
    $('input[name="entrada"]').prop('readonly',false);
    $('input[name="saida"]').prop('readonly',false);
    $('select[name="Turno"]').prop('disabled',false);
    $('input[name="duracao"]').prop('readonly',false);
    $('#contratarchamado').prop('disabled',true);

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

    $('#linkarea').click(function(){
        if (($('select[name="Area"]').val()!="") && ($('select[name="Area"]').val()!=null)){
        window.open('../area/'+$('select[name="Area"]').val(),'_blank');}
        else{

            $('#msg_modal_create').html('<form id="form_areas" method="post"><div class="form-group"><label for="area">Area:</label><input type="text" class="form-control" id="nomearea" name="area"  title="Apenas letras!" required="required" pattern="[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\\s]+$"></div></form>');
            $('#modal_footer').html('<button type="submit" form="form_areas" class="btn btn-primary"  id="botaochecknamearea" disabled >Adicionar</button><button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>');
            $('#modal_create').modal('show');
            $('#modal_create').appendTo("body");
            $('#nomearea').on('keyup', function(){
                $('#botaochecknamearea').prop('disabled', ($(this).val() == 0)); 
            });

            $('#form_areas').submit(function(){
            
                //event.preventDefault();
                $.ajax({
                    url: '../Areas/adicionararea',
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
               return false;
            });
        }
    });

    $('#linkunidade').click(function(){
        if (($('select[name="unidade"]').val()!="") && ($('select[name="unidade"]').val()!=null)){
        window.open('../unidades/'+$('select[name="unidade"]').val(), '_blank');}
        else{
            $('#msg_modal_create').html('<form id="form_add_unidade" method="POST"><div class="form-group"><label for="unidade">Unidade:</label><input type="text" class="form-control" id="unidade" name="unidade" required="required" pattern="[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\\s]+$"></div><div class="form-group"><label for="vagas_autorizadas">Vagas autorizadas:</label><input type="number" class="form-control" id="vagas_autorizadas" name="vagas_autorizadas" required=""></div><button type="submit" class="btn btn-primary btn-block">Adicionar</button></form>');
            $('#modal_footer').html('<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>');
            $('#modal_create').modal('show');
            $('#modal_create').appendTo("body");
                $('#form_add_unidade').submit(function(){
                    //event.preventDefault();
                    $.ajax({
                        url: '../Unidades/adicionarUnidade',
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
                    return false;
                });
        }
    });

    $('select[name="unidade"]').change(function () { 
            var id=$('select[name="unidade"]').val();
            $.ajax({   
                url: '../setores/getsetores',
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
                        url: '../setores/getsupervisoressetor',
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

    $('#linksetor').click(function(){
        if (($('select[name="setor"]').val()!="") && ($('select[name="setor"]').val()!=null) ){
           window.open('../setores/'+$('select[name="setor"]').val(), '_blank');
        }
        else if (($('select[name="unidade"]').val()!="") && ($('select[name="unidade"]').val()!=null)){
            $('#msg_modal_create').html('<form id="form_add_setor" method="POST"><div class="form-group"><label for="unidade">Nome do setor:</label><input type="text" class="form-control" id="setor" name="setor"><input type="hidden" name="id" value="'+$('select[name="unidade"]').val()+'"></div><button type="submit" class="btn btn-primary btn-block">Adicionar</button></form>');
            $('#modal_footer').html('<button type="button" class="btn btn-default" data-dismiss="modal" id="btn_exc_set">Fechar</button>');
            $('#modal_create').modal('show');
            $('#modal_create').appendTo("body");

            $('#form_add_setor').submit(function(){
                //event.preventDefault();
                $.ajax({
                    url: "../Setores/adicionarSetor",
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
                return false;
            });
        }
    });

    $('select[name="setor"]').change(function () { 
            var id=$('select[name="setor"]').val();
            $.ajax({   
                url: '../setores/getsupervisoressetorativo',
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

    $('#linkSupervisor').click(function(){
        if (($('select[name="Supervisor"]').val()!="") && ($('select[name="Supervisor"]').val()!=null)){
        window.open('../supervisor/'+$('select[name="Supervisor"]').val(), '_blank');
        }
        else if (($('select[name="setor"]').val()!="") && ($('select[name="setor"]').val()!=null)){
            $('.modal-dialog').removeClass('modal-sm');
            $('.modal-dialog').addClass('modal-lg');
            $('#msg_modal_create').html('<form id="form_supervisor" method="post"><div class="row"><div class="col-sm-9 col-xs-12"><div class="form-group"><label class="control-label">Supervisor</label><input data-toggle="tooltip" title="Nome do supervisor" class="form-control" name="nomesupervisor"><input type="hidden" name="login" ></div>        </div>        <div class="col-sm-3 col-xs-12">            <div class="form-group">                <label class="control-label">Masp</label>                <input data-toggle="tooltip" title="Masp do supervisor" name="masp" class="form-control" >            </div>        </div>    </div>    <div class="row">        <div class="col-sm-6 col-xs-12">            <div class="form-group">                <label class="control-label">Curso de formação</label>                <input data-toggle="tooltip" title="Curso de formação do supervisor" name="formação" class="form-control" >                        </div>        </div>        <div class="col-sm-6 col-xs-12">            <div class="form-group">                <label class="control-label">Área de atuação</label>                <input data-toggle="tooltip" title="Area em que o supervisor atua" name="atuação" class="form-control" >                        </div>        </div>    </div>   <div class="form-group row "><div class="radio"><label for="chefedepartamento">Realiza pedido de estágio:</label><label><input type="radio" value="1" name="chefedepartamento"><span class="circle"></span><span class="check"></span>Sim</label><label><input type="radio" value="0" name="chefedepartamento" checked=""><span class="circle"></span><span class="check"></span>Não</label></div></div>    <div class="row">        <div class="col-sm-4 col-xs-4">            <div class="form-group">                <label class="control-label">Identidade</label>                <input data-toggle="tooltip" title="RG" type="text" class="form-control" name="rg"  >            </div>        </div>        <div class="col-sm-4 col-xs-4">            <div class="form-group">                <label class="control-label">CPF</label>                <input data-toggle="tooltip" pattern="[0-9]+$" title="CPF" type="text" class="form-control" name="cpf"  >            </div>        </div>        <div class="col-sm-4 col-xs-4">            <div class="form-group">                <label class="control-label">Nascimento</label>                <input data-toggle="tooltip" title="data de nascimento" type="date" class="form-control" name="nascimento"  >            </div>        </div>    </div>    <div class="row">        <div class="col-xs-6">            <div class="form-group">                <label class="control-label">Endereço</label>                <input data-toggle="tooltip" title="Rua" type="text" class="form-control" name="rua" >            </div>        </div>        <div class="col-xs-2">            <div class="form-group">                <label class="control-label">Número</label>                <input data-toggle="tooltip" title="Número" type="text" class="form-control" name="numero" >            </div>         </div>         <div class="col-sm-4 col-xs-8">            <div class="form-group">                <label class="control-label">Bairro</label>                <input data-toggle="tooltip" title="Bairro" type="text" class="form-control" name="bairro">            </div>        </div>            </div>    <div class="row">        <div class="col-sm-2 col-xs-4">            <div class="form-group">                <label class="control-label">CEP</label>                <input data-toggle="tooltip" title="CEP" type="text" class="form-control" name="cep" >            </div>          </div>        <div class="col-sm-4 col-xs-8">            <div class="form-group">                <label class="control-label">Cidade</label>                <input data-toggle="tooltip" title="Cidade" name="cidade" class="form-control" >            </div>        </div>          <div class="col-sm-2 col-xs-4">            <div class="form-group">                <label class="control-label">Estado</label>                <input data-toggle="tooltip" title="Estado" name="estado" class="form-control" >                        </div>        </div>            <div class="col-sm-4">            <div class="form-group">                    <label class="control-label">E-mail</label>                <input data-toggle="tooltip" title="Email" type="text" class="form-control" name="email" >            </div>        </div>     </div>    <div class="row">        <div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Telefone</label>                <input data-toggle="tooltip" title="Telefone fixo" type="text" class="form-control" name="telefone" >            </div>        </div><div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Celular</label>                <input data-toggle="tooltip" titlefixo="Telefone movel" type="text" class="form-control" name="celular">            </div>        </div><div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Senha</label>                <input required type="password" class="form-control" name="senha" value="" id="Senha">            </div>        </div>                <div class="col-sm-3 col-xs-6">            <div class="form-group">                 <label class="control-label">Confirmar Senha</label>                <input  type="password" class="form-control" name="senhaconf" value="" id="SenhaConf">            </div>        </div>                  </div></form> ');

            //$('#msg_modal_create').html('<form id="form_supervisor" method="post">    <div class="form-group row">        <div class="col-sm-9 col-xs-12">            <label >Supervisor</label>            <input data-toggle="tooltip" title="Nome do supervisor!" class="form-control" name="nomesupervisor" >                    </div>           <div class="col-sm-3 col-xs-12">            <label >Masp</label>            <input data-toggle="tooltip" title="masp do supervisor!" name="masp" class="form-control" >                    </div>    </div>    <div class="form-group row">        <div class="col-sm-6 col-xs-12">            <label >Curso de formação</label>            <input data-toggle="tooltip" title="Curso de formação do supervisor!" name="formação" class="form-control"  >                    </div>           <div class="col-sm-6 col-xs-12">            <label >Area de atuação</label>            <input data-toggle="tooltip" title="Area em que o supervisor atua!" name="atuação" class="form-control" >                    </div>        <div class="checkbox col-sm-8 col-xs-8" id="turndur">            <label><input type="checkbox" value="1" name="chefedepartamento" >Realiza pedido de estagio</label>        </div>    </div>    <div class="form-group row">        <div class="col-sm-4 col-xs-4">            <label >Identidade</label>            <input data-toggle="tooltip" title="RG!" type="text" class="form-control" name="rg" >        </div>        <div class="col-sm-4 col-xs-4">            <label >cpf</label>            <input data-toggle="tooltip" title="cpf!" type="text" class="form-control" name="cpf" >        </div>        <div class="col-sm-4 col-xs-4">            <label >Nascimento</label>            <input data-toggle="tooltip" title="data de nascimento!" type="date" class="form-control" name="nascimento" >        </div>        </div>    <div class="form-group row">        <div class="col-xs-9">            <label >Endereço</label>            <input data-toggle="tooltip" title="Rua!" type="text" class="form-control" name="rua" >        </div>        <div class="col-xs-3">            <label >numero</label>            <input data-toggle="tooltip" title="numero!" type="text" class="form-control" name="numero" >        </div>     </div>    <div class="form-group row">        <div class="col-sm-4 col-xs-8">            <label >Bairro</label>            <input data-toggle="tooltip" title="Bairro!" type="text" class="form-control" name="bairro" >        </div>        <div class="col-sm-2 col-xs-4">            <label >CEP</label>            <input data-toggle="tooltip" title="CEP!" type="text" class="form-control" name="cep" >        </div>        <div class="styled-select col-sm-4 col-xs-8">            <label >Cidade</label>            <input data-toggle="tooltip" title="Curso matriculado!" name="cidade" class="form-control" >                    </div>          <div class="styled-select col-sm-2 col-xs-4">            <label >Estado</label>            <input data-toggle="tooltip" title="Curso matriculado!" name="estado" class="form-control"  >                    </div>          </div>    <div class="form-group row col-sm-6">                    <label >email</label>            <input data-toggle="tooltip" title="email!" type="text" class="form-control" name="email" >            </div>    <div class="form-group row ">        <div class="col-sm-3 col-xs-6"  >            <label >telefone</label>            <input data-toggle="tooltip" title="fixo!" type="text" class="form-control" name="telefone" >        </div>        <div class="col-sm-3 col-xs-6 " >            <label >celular</label>            <input data-toggle="tooltip" titlefixo="movel!" type="text" class="form-control" name="celular" >        </div>    </div> </form>');
            $('#modal_footer').html('<button type="submit" form="form_supervisor" class="btn btn-primary" >Adicionar</button><button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>');
            $('#modal_create').modal('show');
            $('#modal_create').appendTo("body");

            $('#form_supervisor').submit(function(){
                //event.preventDefault();
                $.ajax({
                    url: '../supervisores/adicionarsupervisor',
                    type: 'post',
                    data: $('#form_supervisor').serialize(),
                    success: function(resultado){
                        //event.preventDefault();
                        var idsupervisor=$('input[name="cpf"]').val();
                        var ids=[$('select[name="setor"]').val()];
                        $.ajax({
                            url:'../setores/addsupervisorsetores',
                            type:'POST',
                            data:{ids,idsupervisor},
                            success: function(retorno){
                                var id=$('select[name="setor"]').val();
                                event.preventDefault();
                                $.ajax({   
                                    url: '../setores/getsupervisoressetor',
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
                    return false;
                    }
                });
            return false;
            });
        }
    });

    $('#linkorientador').click(function(){
        if ($('#div_orientador').hasClass('has-success')){
        window.open('../usuarios#buscarorientador', '_blank');}
        else {
            $('#msg_modal_create').html('<form id="form_orientador" method="post"><div class="form-group"><div ><label >Orientador</label><input data-toggle="tooltip" title="Nome do orientador!" class="form-control" name="nomeorientador" required></div>   <div ><label >Masp</label><input data-toggle="tooltip" title="masp do orientador!" name="masporientador" class="form-control" >            </div></div><div class="form-group"><div ><label >Curso</label><input data-toggle="tooltip" title="Curso de atuação do orientador!" name="curso_orientador" class="form-control"  ></div>   <div ><label >Disciplina</label><input data-toggle="tooltip" title="Disciplina ministrada pelo orientador!" name="disciplina" class="form-control"></div></div></form>');
            $('#modal_footer').html('<button type="submit" form="form_orientador" class="btn btn-primary">Criar</button><button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>'); 
            $('#modal_create').modal('show');
            $('#modal_create').appendTo("body");
            $('#form_orientador').submit(function(){
                //event.preventDefault();
                $.ajax({
                    url: '../usuarios/adicionarorientador',
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
                return false;
           
            });
        }
    });

    var nome=[];
 
    // $("input[name='orientador']").blur(function(){
    //     if( $.inArray($(this).val(), nome) !== -1 ){
    //        $('#div_orientador').removeClass('has-error'); 
    //        $('#div_orientador').addClass('has-success');
    //     }else{
    //        $('#div_orientador').removeClass('has-success'); 
    //        $('#div_orientador').addClass('has-error');
    //        $("input[name='orientador']").val('');
    //     };
    // });

    $('#tableaddcandidato').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            $('#adicionarcandidato').prop('disabled', !$('#tableaddcandidato').bootstrapTable('getSelections').length);
        });

    $('#tableaddcandidato').on('page-change.bs.table', function () {
            $('#adicionarcandidato').prop('disabled', true);
        });


    $('#enviaremail').click(function(){

        $('#msg_modal_create').html('<form id="destinatarios"><div class="form-group"><div><label required for="destinatarios">Enviar email para:</label><label ><input type="radio" value="1" checked name="destinatarios" >Supervisor do estágio</label><label><input type="radio" value="2" name="destinatarios" >Académico convocado</label><label><input type="radio" value="3" name="destinatarios" >Académicos interessados</label></div></div></form>');
        $('#modal_footer').html('<button type="submit" form="destinatarios"  class="btn btn-primary" >Avançar</button><button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>');
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");


        $('#destinatarios').submit(function(){

            $('#conteudo_modal').html('<form id="sendemail"><div class="form-group"><label>Campo de texto do email</label><input type="textarea" name="email" id="email" class="ativo"></div></form>');
            $('#modal_footer2').html('<button type="submit" form="sendemail" id="sendemail"  class="btn btn-primary" >Enviar</button><button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>');
            $('#alert_modal').modal('show');
            $('#alert_modal').appendTo("body");

            var busca=$("#destinatarios").serializeArray();
            //alert(busca[0]['value']);
            //console.log(busca);
            if(busca[0]['value']==1){
                $('#email').val('<p>Prezado '+$('select[name="Supervisor"] :selected').text()+'</p><p>Estamos aguardando a sua avalia&ccedil;&atilde;o dos acad&eacute;micos concorrentes a vaga de est&aacute;gio n&uacute;mero '+$('input[name="estagio"]').val()+'</p><p>Favor acessar o sistema e realizar sua avalia&ccedil;&atilde;o, caso n&atilde;o ocorra at&eacute; o dia ##/##/####, iremos escolher um acad&eacute;mico a nosso crit&eacute;rio.</p><p>Atenciosamente, N&uacute;cleo de est&aacute;gios.&nbsp;</p><a href="unimontes.com">Unimontes</a>');
            }else if(busca[0]['value']==2){
                $('#email').val('<p>Voc&ecirc; foi escolhido para o est&aacute;gio de n&uacute;mero '+$('input[name="estagio"]').val()+' da unimontes, compare&ccedil;a ao n&uacute;cleo de estagio (NIESP) na pro-reitoria de extens&atilde;o da unimontes&nbsp;</p><p>portando os seguintes documentos...</p>');
            } else if(busca[0]['value']==3){
                $('#email').val('<p>Notifica&ccedil;&atilde;o<!-- asfd --> de est&aacute;gio da Pro-reitoria de extens&atilde;o Unimontes:</p><p>Unidade: '+$('select[name="unidade"] :selected').text()+'</p><p>Setor: '+$('select[name="setor"] :selected').text()+'</p><p>Turno: '+$('select[name="Turno"] :selected').text()+'</p><p>Atividades realizadas: <p style="padding-left:30px;"'+tinyMCE.get('descricao').getContent()+'</p></p><p>&nbsp;</p><p>Para cancelar o recebimento de notifica&ccedil;&otilde;es de novos est&aacute;gios acesse <a href="unimontes.com">Unimontes</a> e altere em seu perfil.</p>');
            }

            tinyMCE.init({
                                // General options
                                selector: ".ativo",
                                language:"pt_BR",
                                themes:"modern",
                                 skin : "custom",
                                 menubar:false,
                                 autoresize_on_init:true,
                                  plugins: "textcolor colorpicker,insertdatetime,fullscreen ,code, preview",
                                toolbar1:  "bold italic underline strikethrough | removeformat | styleselect | formatselect | fontselect | fontsizeselect | jbimages",
                                  toolbar2: "alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink  | insertdatetime preview | forecolor backcolor  |  fullscreen code preview",
                                  bbcode_dialect: "punbb",
                                   

                                   relative_urls: false,
                                  plugin_preview_width: 650,
                                max_chars: 61000, // max. allowed chars
                                images_upload_handler: function (blobInfo, success, failure) {
                                    var xhr, formData;

                                    xhr = new XMLHttpRequest();
                                    xhr.withCredentials = false;
                                    xhr.open('POST', 'postAcceptor.php');

                                    xhr.onload = function() {
                                      var json;

                                      if (xhr.status != 200) {
                                        failure('HTTP Error: ' + xhr.status);
                                        return;
                                      }

                                      json = JSON.parse(xhr.responseText);

                                      if (!json || typeof json.location != 'string') {
                                        failure('Invalid JSON: ' + xhr.responseText);
                                        return;
                                      }

                                      success(json.location);
                                    };

                                    formData = new FormData();
                                    formData.append('file', blobInfo.blob(), blobInfo.filename());

                                    xhr.send(formData);
                                  },

                                    setup: function (ed) {
                                        var allowedKeys = [8, 37, 38, 39, 40, 46]; // backspace, delete and cursor keys
                                        ed.on('keydown', function (e) {
                                            if (allowedKeys.indexOf(e.keyCode) != -1) return true;
                                            if (tinymce_getContentLength() + 1 > this.settings.max_chars) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                return false;
                                            }
                                            return true;
                                        });
                                        ed.on('keyup', function (e) {
                                            tinymce_updateCharCounter(this, tinymce_getContentLength());
                                        });
                                        ed.on('SetContent', function (e) {
                                          tinymce_updateCharCounter(this, e.content.length);
                                        });     

                                    },
                                    init_instance_callback: function () { // initialize counter div
                                        $('#' + this.id).prev().append('<div class="char_count" style="text-align:right"></div>');
                                        tinymce_updateCharCounter(this, tinymce_getContentLength());
                                    },
                                    paste_preprocess: function (plugin, args) {
                                        var editor = tinymce.get(tinymce.activeEditor.id);
                                        var len = editor.contentDocument.body.innerHTML.length;
                                        var text = $(args.content).text();
                                        if (len + text.length > editor.settings.max_chars) {
                                            alert('Pasting this exceeds the maximum allowed number of ' + editor.settings.max_chars + ' characters.');
                                            args.content = '';
                                        } else {
                                            tinymce_updateCharCounter(editor, len + text.length);
                                        }
                                    }
                                    
                                 });


                                function tinymce_updateCharCounter(el, len) {
                                    $('#' + el.id).prev().find('.char_count').text('Limite: '+len + '/' + el.settings.max_chars);
                                    
                                }

                                function tinymce_getContentLength() {
                                    return tinymce.get(tinymce.activeEditor.id).contentDocument.body.innerHTML.length;
                                }

            tinyMCE.execCommand('mceRemoveEditor', false, 'email'); 
            tinyMCE.execCommand('mceAddEditor', true, 'email'); 
            


            //$('#modal_create').appendTo("body");

            var id=$('input[name="historico"]').val();

            $('#sendemail').submit(function(){
            
            //var busca=$("#sendemail").serializeArray();

                $.ajax({
                    url: '../Estagios/senddestinatarios',
                    type: 'POST',
                    data: $("#sendemail").serialize()+"&destinatarios="+busca[0]['value']+"&historico="+$('input[name="historico"]').val(),
                    success: function(resultado){
                        //alert(JSON.stringify(resultado));
                        switch(resultado){
                            case 0:
                                sweetAlert("Nenhum acadêmico convocado!","Atenção");
                            break;
                            case 1:
                                sweetAlert("Email enviado com sucesso!","Sucess");                                
                            break;
                            case 2:
                               sweetAlert("Erro ao enviar email!","Error");
                            break;
                        }
                          
                    }
                });
                return false;
            });
        return false;
        });

    });




    $('#inscreveraluno').click(function(){

        $('#msg_modal_create').html('<div class="form-group"><label>Parte do nome ou matrícula:</label><input type="text" class="form-control" id="busca">');
        $('#modal_footer').html('<button type="submit" id="buscar" class="btn btn-primary" >Buscar</button><button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>');
        $('#modal_create').modal('show');
        $('#modal_create').appendTo("body");
        

        $('#buscar').click(function(){
            var busca=$('#busca').val();
            var id=$('input[name="historico"]').val();
            
            
                $.ajax({
                    url: '../Estagios/getNaoInscritosEmEstagio',
                    type: 'POST',
                    data: {id,busca},
                    success: function(resultado){
                        $("#tableaddcandidato").bootstrapTable('load',resultado);  
                        $('#modal_candidato').modal('show');
                        $('#modal_candidato').appendTo("body");
                    }
                });
        });
    });

    

    $('#adicionarcandidato').click(function(){
        var matriculas = $.map($('#tableaddcandidato').bootstrapTable('getSelections'), function (row) {
                return row.matricula;  });
        var id=$('input[name="estagio"]').val();

        
        $.ajax({
            url: '../Estagios/CandidatarAluno',
            type: 'POST',
            data: {matriculas,id},
            success: function(retorno){
                $('#adicionarcandidato').prop('disabled', true);
                swal({
                            title: "Academicos candidatados a vaga de estagio!",
                            type: "success",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#2F3233"
                        });
                //alert("Academicos candidatados a vaga de estagio");
                $("#tablecandidatos").bootstrapTable('load',retorno);
                $.each(retorno, function(k, v){
                    if(v.chamado=='1'){$('#contratarchamado').prop('disabled',false);}
                });
            }
        });
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
});