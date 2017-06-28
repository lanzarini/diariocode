var id=$('input[name="idarea"]').val();
var nomearea=$('input[name="nomearea"]').val();
function formatobotaoexcluir(value,row,index){
    return '<button class="btn btn-primary">Excluir</button>';
}

window.eventobotaoexluircursoarea={
    'click button':function(e,value,row,index){
        var idsremover=[row.idcurso];

        swal({
                title: "Deseja realmente excluir o curso '"+row.nomecurso+"' da área "+nomearea+" ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({           
                    url: '../Areas/removercursoarea',//chama controlador para remover item do bd
                    type: 'POST',
                    data: {idsremover,id},
                    error: function(asd) {
                        sweetAlert("Erro ao tentar remover curso!","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(){
                        swal({
                                title: "Curso removido com sucesso da área "+nomearea+" !",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //alert('Area removida com sucesso!');
                        $('#tablecursoarea').bootstrapTable('remove', {
                        field: 'idcurso',
                        values: idsremover
                    }); // exclui item da tabela
                    $('#botaoremovercursoarea').prop('disabled', true);//desabilita botão de remover ao excluir item
                    }
                })
            });
    }
}

$(document).ready(function(){
$('#modal1').modal();

    $.ajax({   
        url: '../Areas/GetCursoArea',
        type: 'POST',
        data: {id},
        success:function(resultado){
            //var data2=<?php echo isset($cursoarea)?$cursoarea:''; ?>;
            $("#tablecursoarea").bootstrapTable('load',resultado);
            
        }
    });

    $('#form_alterar_area').submit(function(){
       //event.preventDefault();
        $.ajax({
            url: '../Areas/alterar',
            type: 'POST',
            data: $('#form_alterar_area').serialize(),
            success:function(dfdf){
                switch(dfdf){
                    case 1:
                     //alert("Nome alterado com sucesso");
                        swal({
                                title: "Nome alterado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });

                    
                    break;
                    case 2:
                        swal({
                                title: "Erro ao alterar nome!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                       
                    break;
                }
            }
        });
        return false;

       
    });
    $('#tablecursoarea').on('page-change.bs.table', function () {
        $('#botaoremovercursoarea').prop('disabled', true);
    });

    $('#tableaddcursosarea').on('page-change.bs.table', function () {
        $('#adicionarcursosarea').prop('disabled', true);
    });

    $('#tablecursoarea').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $('#botaoremovercursoarea').prop('disabled', !$('#tablecursoarea').bootstrapTable('getSelections').length);
    });//função para acionar botão de remover na tabela quando houver algum checkbox selecionado

    $('#tableaddcursosarea').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        $('#adicionarcursosarea').prop('disabled', !$('#tableaddcursosarea').bootstrapTable('getSelections').length);
    });//função para acionar botão de remover na tabela quando houver algum checkbox selecionado

    $('#botaoremovercursoarea').click(function () { //remover cursos da area
                
        var idsremover = $.map($('#tablecursoarea').bootstrapTable('getSelections'), function (row) {
            return row.idcurso;
        });//pega itens selecionados da tabela

        swal({
                title: "Deseja realmente excluir o(s) curso(s) [ "+idsremover+" ] da área "+$('input[name="nomearea"]').val()+"?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({   //chama controlador para remover item do bd
                    url: '../Areas/removercursoarea',
                    type: 'POST',
                    data: {idsremover,id},
                    error: function(asd) {
                        sweetAlert("Erro ao tentar remover curso(s)!","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(){
                        swal({
                                title: "Curso(s) removido(s) com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //alert('Area removida com sucesso!');
                    $('#tablecursoarea').bootstrapTable('remove', {
                        field: 'idcurso',
                        values: idsremover
                    }); // exclui item da tabela
                    $('#botaoremovercursoarea').prop('disabled', true);//desabilita botão de remover ao excluir item
                
                        
                    }
                })
            });


        
    });

    $('#botaoaddcursoarea').click(function () { //carregar dados na tabela dentro da modal
        
        $('#myModal').appendTo("body");

        $.ajax({   //chama controlador para remover item do bd
            url: '../Areas/cursosforadaarea',
            type: 'POST',
            data: {id},
            datatype:'json',
            error: function(asd) {
                 $("#tableaddcursosarea").bootstrapTable('removeAll');
            },
            success: function(asd){
               // alert(JSON.stringify(asd));
                $("#tableaddcursosarea").bootstrapTable('load',asd);

            }
        });

    });  

    $('#adicionarcursosarea').click(function () {     

        var ids = $.map($('#tableaddcursosarea').bootstrapTable('getSelections'), function (row) {
            return row.idcurso;
        });//pega itens selecionados da tabela
        

        swal({
                title: "Deseja realmente adicionar o(s) curso(s) [ "+ids+" ] na área "+nomearea+" ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    url:'../Areas/adicionarcursosarea',
                    type:'POST',
                    data:{ids,id},
                    error: function(asd) {
                        sweetAlert("Erro ao tentar adicionar curso(s)!","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Curso(s) adicionado(s) com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //alert('Area removida com sucesso!');
                     $("#tablecursoarea").bootstrapTable('load',retorno);
                     $('#adicionarcursosarea').prop('disabled', true);
                        
                    }
                })
            });

       
    }); 
});

