// FUNÇÕES DA TABELA

// SETA O FORMATO DO BOTÃO DE EXCLUIR SETOR
function botao_excluir_setor(value, row, index){
    if(row.estagios != 0 && row.supervisores != 0){
        return '<button class="btn btn-primary" disabled>Excluir</button>';
    }else{
        return '<button class="btn btn-primary">Excluir</button>';
    }
}

// FORMATO DO CHECKBOX DE CADA LINHA
function stateFormatter(value, row, index) {
    if(row.estagios != 0 && row.supervisores != 0){
        return {
            disabled: true
        };
    }

    return value;
}

// SETA O FORMATO DO LINK DO SETOR
function formato_setor(value, r, i){
    return '<a>' + value + '</a>';
}

//
function formato_supervisor(value, r, i){
    return '<a>' + value + '</a>';

}

// SETA O DESTINO AO CLICAR NO NOME DO SETOR
window.evento_link_setor = {
    'click a': function(e, x, y, z){
        window.location.href="../setores/" + y.id_setor;
    }
}

//
window.evento_link_supervisor = {
    'click a': function(e, x, y, z){
        window.location.href="../setores/supervisores/" + y.id_setor;
    }
}

// EXCLUI VÁRIOS SETORES
window.evento_excluir_setor = {
    'click button': function(e, value, row, index){

        var ids=[row.id_setor];
        

        swal({
                title: "Deseja realmente excluir o setor '" + row.nome_setor + "'?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    url: "../Setores/excluirSetor",
                    type: "POST",
                    data: {ids},
                    error: function(asd) {
                        sweetAlert("O setor '" + row.nome_setor + "' não pode ser excluído!","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Setor '" + row.nome_setor + "' excluído com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                     $("#tabela_setores").bootstrapTable('remove', {field: 'id_setor',values: ids});
                        
                    }
                })
            });

    }
}

$(document).ready(function(){

    // Carrega as linhas da tabela de Setores
    $.ajax({
        url: "../Setores/getSetores",
        type: "POST",
        dataType: "json",
        data: {id:$('#idarea').val()},
        success: function(retorno){
            $('#tabela_setores').bootstrapTable('load', retorno);
        }
    });

    // Adiciona um setor na Unidade
    $('#form_add_setor').submit(function(){

        $.ajax({
            url: "../Setores/adicionarSetor",
            type: "POST",
            dataType: "json",
            data: $('#form_add_setor').serialize(),
            success: function(resultado){
                swal({
                    title: "Setor adicionado com sucesso!",
                    type: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2F3233"
                });
                $('input[name=setor]').val('');
                $('#tabela_setores').bootstrapTable('load', resultado);
                $('#btn_exc_set').click();
            }
        });

        return false;
    });

    $('#btn_add_setor').click(function(){
        $('#modal_adiciona_setor').appendTo("body");
    });

    // Altera os dados de uma Unidade
    $('#form_alterar_unidade').submit(function(){
        
        $.ajax({ 
            url: 'alterarUnidade',
            type: 'post',
            data: $('#form_alterar_unidade').serialize(),
            success: function(resultado){

                switch(resultado){
                    case '1':
                        swal({
                                title: "Dados da unidade alterados com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        // $('#conteudo_sucesso').html('Dados da unidade alterados com sucesso!');
                        // $('#sucesso').modal('show');

                        
                    break;
                    case '2':
                        sweetAlert("Dados não alterados!","error");
                        // $('#conteudo_erro').html('Dados não alterados!');
                        // $('#erro').modal('show');

                        
                    break;
                }
            }
        });

        return false;
    });

    $('#tabela_setores').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function(){
        $('#btn_remover_multi_setores').prop('disabled', !$('#tabela_setores').bootstrapTable('getSelections').length);
    });

    $('#btn_remover_multi_setores').click(function(){

        var ids = $.map($('#tabela_setores').bootstrapTable('getSelections'), function(row){
            return row.id_setor;
        });

        swal({
                title: "Deseja realmente excluir o(s) Setores(s)? \n[ "+ ids +" ]",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({
                    url: "../Setores/excluirSetor",
                    type: "POST",
                    data: {ids},
                    error: function(asd) {
                        sweetAlert("O setor '" + row.nome_setor + "' não pode ser excluído!","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(retorno){
                        swal({
                                title: "Setor(es) excluído(s) com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                     $("#tabela_setores").bootstrapTable('remove', {field: 'id_setor',values: ids});                        
                    }
                })
            });


    });

});