// FORMATO DO BOTÃO DE EXCLUIR UNIDADE
function botao_excluir_unidade(value,row,index){
    if(row.setores_contidos != 0){
        return '<button class="btn btn-primary" disabled>Excluir</button>';
    }else{
        return '<button class="btn btn-primary">Excluir</button>';
    }
}

// FORMATO DO CHECKBOX DE CADA LINHA
function stateFormatter(value, row, index) {
    if (row.setores_contidos != 0){
        return {
            disabled: true
        };
    }

    return value;
}

function formato_unidade(value, r, i){
    return '<a>' + value + '</a>';
}

// EXCLUI UNIDADE VIA AJAX
window.evento_excluir_unidade = {
    'click button': function(e, value, row, index){

        // Pega os ids das unidades a serem excluídas
        var ids=[row.id];

        swal({
                title: "Deseja realmente excluir a unidade '" + row.unidade+"'?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                 $.ajax({
                    url: 'Unidades/excluirUnidade',
                    type: 'POST',
                    data: {ids},
                    error: function(asd) {
                        sweetAlert("A unidade '" + row.unidade + "' não pode ser excluída!","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(){
                        swal({
                                title: "Unidade '" + row.unidade + "' excluída com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        
                        $("#tabela_unidades").bootstrapTable('remove', {field: 'id',values: ids});
                    }
                })
            });

        
    }
}

// LEVA PARA A PÁGINA DA UNIDADE CLICADA
window.evento_link_unidade = {
    'click a': function(e, x, y, z){
        window.location.href="unidades/" + y.id;
    }
}

// DOM
$(document).ready(function(){

    //


    // Carrega as linhas ta tabela de Unidades
    $.ajax({
        url: "Unidades/getUnidades",
        type: "POST",
        dataType: "json",
        success: function(retorno){
            var dados1 = retorno;
            $("#tabela_unidades").bootstrapTable('load', dados1);
        }
    });

    // Adicionar unidade via AJAX
    $('#form_add_unidade').submit(function(){

        // Requisição
        $.ajax({
            url: 'Unidades/adicionarUnidade',
            type: 'post',
            dataType: 'json',
            data: $('#form_add_unidade').serialize(),
            success: function(resultado){
                $('input[name="unidade"]').val('');
                $('input[name="vagas_autorizadas"]').val('');
                $("#tabela_unidades").bootstrapTable('load', resultado);
                $('#btn_close_modal').click();
                swal({
                    title: "Unidade adicionada com sucesso!",
                    type: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2F3233"
                });
                //alert("Unidade adicionada com sucesso!");
            }
        });

        // Para o submit não recarregar a página === event.preventDefault()
        return false;
    });

    $('#tabela_unidades').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function(){
        $('#btn_remover_multi_unidades').prop('disabled', !$('#tabela_unidades').bootstrapTable('getSelections').length);
    });

     $("#btn_add_unidade").click(function(){
        $('#myModal').appendTo("body");
    });

    $("#btn_remover_multi_unidades").click(function(){
        var ids = $.map($('#tabela_unidades').bootstrapTable('getSelections'), function(row){
            return row.id;
        });

        swal({
                title: "Deseja realmente excluir a(s) unidade(s) \n[ "+ ids +" ] ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    url: 'Unidades/excluirUnidade',
                    type: 'POST',
                    data: {ids},
                    error: function(asd) {
                        sweetAlert("A(s) unidade(s) não pode(m) ser excluída(s)!","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Unidade(s) excluída(s) com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //alert('Area removida com sucesso!');
                     $("#tabela_unidades").bootstrapTable('remove', {field: 'id', values: ids});
                    $("#btn_remover_multi_unidades").prop('disabled', true);
                        
                    }
                })
            });
    });
});