function selectsetoreson(value, row, index) {
    if (row.estagios_on != 0) {
        return {                
            disabled: true
        };
    }
    return value;
}


function formatocelulatabela(value,r,i) {
     return '<a>'+value+'</a>'
}

function botaoreativar(value,row,index){
    return '<button class="btn btn-primary">Reativar</button>'
}

function botaodesativar(value,row,index){
    if (row.estagios_on != 0) {
        return '<button class="btn btn-primary" disabled>Desativar</button>';
    }
    else{
        return '<button class="btn btn-primary">Desativar</button>';
    }

}

window.eventobotaoreativar={
    'click button':function(e,value,row,index){
        var ids=[row.setor_id];
        //alert(JSON.stringify(row));
        swal({
                title: "Deseja realmente reativar "+$('input[name="nomesupervisor"]').val()+" no setor \n "+row.desvinculado_setor+" ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
               var supervisor=$('input[name="login"]').val();
                $.ajax({           
                    url: '../Supervisores/reativarsupervisorsetor',//chama controlador para remover item do bd
                    type: 'POST',
                    data: {ids,supervisor},
                    datatype:'json',
                    error: function(asd) {
                        sweetAlert("Erro ao reativar no setor","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Setor vinculado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        $('#tabelasetoresoff').bootstrapTable('remove', {
                        field: 'setor_id',
                        values: ids
                        }); // exclui item da tabela
                        $('#botaoreativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
                        var data2=retorno;
                        $("#tabelasetoreson").bootstrapTable('load',data2);
                    }
                })
            });

        //  if(confirm("deseja realmente reativar "+$('input[name="nomesupervisor"]').val()+" no setor \n[ "+ids+" ] ?") == true){
        //     var supervisor=$('input[name="login"]').val();
        //     $.ajax({           
        //         url: '../Supervisores/reativarsupervisorsetor',//chama controlador para remover item do bd
        //         type: 'POST',
        //         data: {ids,supervisor},
        //         datatype:'json',
        //         error: function(asd) {
        //             alert("Erro ao reativar no setor");
        //         },
        //         success: function(retorno){
        //             alert('Setor vinculado com sucesso!');
        //             $('#tabelasetoresoff').bootstrapTable('remove', {
        //                 field: 'setor_id',
        //                 values: ids
        //             }); // exclui item da tabela
        //             $('#botaoreativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
        //             var data2=retorno;
        //             $("#tabelasetoreson").bootstrapTable('load',data2);
        //         }
        //     });
        // }else{
        //     return false;
        // }
    }
}

window.eventobotaodesativar={
    'click button':function(e,value,row,index){
        var ids=[row.setor_id];
        //alert(JSON.stringify(row));
        swal({
                title: "Deseja realmente desativar "+$('input[name="nomesupervisor"]').val()+" do setor "+row.operando_setor+" ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                var supervisor=$('input[name="login"]').val();
                $.ajax({           
                    url: '../Supervisores/desabilitarsupervisorsetor',//chama controlador para remover item do bd
                    type: 'POST',
                    data: {ids,supervisor},
                    datatype:'json',
                    error: function(asd) {
                        sweetAlert("Erro ao desvincular setor","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Setor desvinculado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        $('#tabelasetoreson').bootstrapTable('remove', {
                        field: 'setor_id',
                        values: ids
                        }); // exclui item da tabela
                        $('#botaodesativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
                        var data2=retorno;
                        $("#tabelasetoresoff").bootstrapTable('load',data2);
                    }
                })
            });

        //  if(confirm("deseja realmente desativar "+$('input[name="nomesupervisor"]').val()+" do setor \n[ "+ids+" ] ?") == true){
        //     var supervisor=$('input[name="login"]').val();
        //     $.ajax({           
        //         url: '../Supervisores/desabilitarsupervisorsetor',//chama controlador para remover item do bd
        //         type: 'POST',
        //         data: {ids,supervisor},
        //         datatype:'json',
        //         error: function(asd) {
        //             alert("Erro ao desvincular setor");
        //         },
        //         success: function(retorno){
        //             alert('Setor desvinculado com sucesso!');
        //             $('#tabelasetoreson').bootstrapTable('remove', {
        //                 field: 'setor_id',
        //                 values: ids
        //             }); // exclui item da tabela
        //             $('#botaodesativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
        //             var data2=retorno;
        //             $("#tabelasetoresoff").bootstrapTable('load',data2);
        //         }
        //     });
        // }else{
        //     return false;
        // }
    }
}

window.linkestagio={
    'click a':function(e,x,y,z){
        window.location.href='../estagio/'+y.estagio;
    }
}

window.linkcontrato={
    'click a':function(e,x,y,z){
        window.location.href='../contrato/'+y.contrato;
    }
}

window.linkunidade = {
    'click a': function (e,x,y,z) {

         window.location.href='../unidades/'+y.unidade_id;         
    }
}
window.linksetor = {
    'click a': function (e,x,y,z) {

         window.location.href='../setores/'+y.setor_id;         
    }
}
window.linkacademico = {
    'click a': function (e,x,y,z) {

         window.location.href='../academico/'+y.academico_login;         
    }
}

$(document).ready(function(){

  $.ajax({    //CARREGA TABELAS DA PAGINA
        url: '../supervisores/DadosSupervisor',
        type: 'POST',
        data: {login:$('input[name="login"]').val()},
        datatype:"json",
        success:function(resultado){
            $("#tabelasetoresoff").bootstrapTable('load',resultado["setoresoff"]);
            $("#tabelasetoreson").bootstrapTable('load',resultado["setoreson"]);
            $("#tabelaestagioativos").bootstrapTable('load',resultado["estagioativo"]);
            $("#tabelaestagiosencerrados").bootstrapTable('load',resultado["estagioencerrado"]);
            $("#tabelaestagioschamada").bootstrapTable('load',resultado["estagiochamada"]);
            $("#tabelaestagiospedidos").bootstrapTable('load',resultado["estagiopedido"]);
            $("#tabelaestagiosinscricao").bootstrapTable('load',resultado["estagioinscricao"]);            

        }
    });

    $('#tabelasetoresoff').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $('#botaoreativarsupervisor').prop('disabled', !$('#tabelasetoresoff').bootstrapTable('getSelections').length);
    });//função para acionar botão de remover na tabela quando houver algum checkbox selecionado

    $('#tabelasetoreson').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $('#botaodesativarsupervisor').prop('disabled', !$('#tabelasetoreson').bootstrapTable('getSelections').length);
    });//função para acionar botão de remover na tabela quando houver algum checkbox selecionado

    $('#botaoreativarsupervisor').click(function () {
                  
        var ids = $.map($('#tabelasetoresoff').bootstrapTable('getSelections'), function (row) {
            return row.setor_id;
        });//pega itens selecionados da tabela
        var nomes = $.map($('#tabelasetoresoff').bootstrapTable('getSelections'), function (row) {
            return row.desvinculado_setor;
        });

        swal({
                title: "Deseja realmente reativar "+$('input[name="nomesupervisor"]').val()+" no(s) setor(es) \n[ "+nomes+" ] ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
               var supervisor=$('input[name="login"]').val();
                $.ajax({           
                    url: '../Supervisores/reativarsupervisorsetor',//chama controlador para remover item do bd
                    type: 'POST',
                    data: {ids,supervisor},
                    datatype:'json',
                    error: function(asd) {
                        sweetAlert("Erro ao reativar no(s) setor(es)","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Setor(es) reativo(s) com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        $('#tabelasetoresoff').bootstrapTable('remove', {
                        field: 'setor_id',
                        values: ids
                        }); // exclui item da tabela
                        $('#botaoreativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
                        var data2=retorno;
                        $("#tabelasetoreson").bootstrapTable('load',data2);
                    }
                })
            });


        // if(confirm("deseja realmente reativar "+$('input[name="nomesupervisor"]').val()+" no(s) setor(es) \n[ "+ids+" ] ?") == true){
        //     var supervisor=$('input[name="login"]').val();
        //     $.ajax({           
        //         url: '../Supervisores/reativarsupervisorsetor',//chama controlador para remover item do bd
        //         type: 'POST',
        //         data: {ids,supervisor},
        //         datatype:'json',
        //         error: function(asd) {
        //             alert("Erro ao reativar no(s) setor(es)");
        //         },
        //         success: function(retorno){
        //             alert('Setor(es) reativo(s) com sucesso!');
        //             $('#tabelasetoresoff').bootstrapTable('remove', {
        //                 field: 'setor_id',
        //                 values: ids
        //             }); // exclui item da tabela
        //             $('#botaoreativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
        //             var data2=retorno;
        //             $("#tabelasetoreson").bootstrapTable('load',data2);
        //         }
        //     });
        // }else{
        //     return false;
        // }
    });

    $('#botaodesativarsupervisor').click(function () {
                  
        var ids = $.map($('#tabelasetoreson').bootstrapTable('getSelections'), function (row) {
            return row.setor_id;
        });
        var nomes = $.map($('#tabelasetoreson').bootstrapTable('getSelections'), function (row) {
            return row.operando_setor;
        });//pega itens selecionados da tabela

        swal({
                title: "Deseja realmente desativar "+$('input[name="nomesupervisor"]').val()+" do(s) setor(es) \n[ "+nomes+" ] ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                var supervisor=$('input[name="login"]').val();

                $.ajax({           
                    url: '../Supervisores/desabilitarsupervisorsetor',//chama controlador para remover item do bd
                    type: 'POST',
                    data: {ids,supervisor},
                    datatype:'json',
                    error: function(asd) {
                        sweetAlert("Erro ao desvincular setor(es)","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Setor(es) desvinculado(s) com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        $('#tabelasetoreson').bootstrapTable('remove', {
                        field: 'setor_id',
                        values: ids
                        }); // exclui item da tabela
                        $('#botaodesativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
                        var data2=retorno;
                        $("#tabelasetoresoff").bootstrapTable('load',data2);
                    }
                })
            });


        // if(confirm("deseja realmente desativar "+$('input[name="nomesupervisor"]').val()+" do(s) setor(es) \n[ "+ids+" ] ?") == true){
        //     var supervisor=$('input[name="login"]').val();
        //     $.ajax({           
        //         url: '../Supervisores/desabilitarsupervisorsetor',//chama controlador para remover item do bd
        //         type: 'POST',
        //         data: {ids,supervisor},
        //         datatype:'json',
        //         error: function(asd) {
        //             alert("Erro ao desvincular setor(es)");
        //         },
        //         success: function(retorno){
        //             alert('Setor(es) desvinculado(s) com sucesso!');
        //             $('#tabelasetoreson').bootstrapTable('remove', {
        //                 field: 'setor_id',
        //                 values: ids
        //             }); // exclui item da tabela
        //             $('#botaodesativarsupervisor').prop('disabled', true);//desabilita botão de remover ao excluir item
        //             var data2=retorno;
        //             $("#tabelasetoresoff").bootstrapTable('load',data2);
        //         }
        //     });
        // }else{
        //     return false;
        // }
    });

    $('#carregartabelasetores').click(function () { //carregar dados na tabela dentro da modal
        var supervisor=$('input[name="login"]').val();
        $('#myModal').appendTo("body");
        $.ajax({   //chama controlador para remover item do bd
            url: '../setores/carregarsetoressemsupervisorespecifico',
            type: 'POST',
            data: {supervisor},
            datatype:'json',
            error: function(asd) {
                 $("#tableaddsetores").bootstrapTable('removeAll');
            },
            success: function(asd){
               // alert(JSON.stringify(asd));
                $("#tableaddsetores").bootstrapTable('load',asd);

            }
        });

    });

    $('#tableaddsetores').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $('#adicionarsupervisoremsetor').prop('disabled', !$('#tableaddsetores').bootstrapTable('getSelections').length);
    });//função para acionar botão de remover na tabela quando houver algum checkbox selecionado

    $('#adicionarsupervisoremsetor').click(function () {     

        var ids = $.map($('#tableaddsetores').bootstrapTable('getSelections'), function (row) {
            return row.idsetor;
        });//pega itens selecionados da tabela
        var setores = $.map($('#tableaddsetores').bootstrapTable('getSelections'), function (row) {
            return row.setor;
        });
        var idsupervisor=$('input[name="login"]').val();

        swal({
                title: "Deseja realmente adicionar o supervisor "+$('input[name="nomesupervisor"]').val()+" ao(s) setor(es) [ "+setores+" ] ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    url:'../setores/addsupervisorsetores',
                    type:'POST',
                    data:{ids,idsupervisor},
                    error: function(asd) {
                        sweetAlert("Erro ao adicionar em setor(es)","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Adição em setores realizada!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        $("#tabelasetoreson").bootstrapTable('load',retorno);
                        $('#adicionarsupervisoremsetor').prop('disabled', true);
                    }
                })
            });


        // if(confirm("Deseja realmente adicionar o supervisor "+$('input[name="nomesupervisor"]').val()+" ao(s) setor(es) [ "+ids+" ] ?") == true){ 
        //     $.ajax({
        //         url:'../setores/addsupervisorsetores',
        //         type:'POST',
        //         data:{ids,idsupervisor},
        //         error: function(asd) {
        //             alert(JSON.stringify(asd))
        //         },
        //         success: function(retorno){
        //             // $('.alert-success').show();
        //              $("#tabelasetoreson").bootstrapTable('load',retorno);
        //              $('#adicionarsupervisoremsetor').prop('disabled', true);
        //         }
        //     });
        // }else{
        //     return false;
        // }
    });

    $('#form_supervisor').submit(function(){
        event.preventDefault();
        // alert($('#Senha').val());
        // alert($('#Senhaconf').val());
        if( ($('#Senha').val()==$('#SenhaConf').val()) || $('#Senha').val()==''){
            $.ajax({
                url: '../supervisores/atualizarsupervisor',
                type: 'post',
                data: $('#form_supervisor').serialize(),
                error: function(asd) {
                         alert(JSON.stringify(asd));
                    },
                success: function(resultado){
                    //alert(JSON.stringify(resultado));
                    switch(resultado){
                        case 1:
                       // alert('dgdfg');
                            swal({
                                    title: "Supervisor alterado com sucesso!",
                                    type: "success",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#2F3233"
                                });
                          // $('#msg_retornada2').html("Supervisor alterado com sucesso!");
                          // $('#msg_modal2').modal('show');
                        break;
                        case 2:
                            sweetAlert("Supervisor não pode ser alterado!","error");
                          // $('#msg_retornada2').html("Supervisor não pode ser alterado!");
                          // $('#msg_modal2').modal('show');
                        break;
                    }
                }
            });
        }else{
            sweetAlert("Confirmação de senha incorreta","error");
           }
    });


});