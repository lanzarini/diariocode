function formato_sup(value, r, i){
    return '<a>' + value + '</a>';
}

window.evento_link_sup = {
    'click a': function(e, x, y, z){
        window.location.href="../../supervisor/" + y.sup_id;
    }
}

$(document).ready(function(){

    // Retorna os supervisores de um determinado setor
    $.ajax({
        url: "../../Setores/getSupervisores",
        type: "POST",
        dataType: "json",
        data: {id_setor: $('#idsetor').val()},
        success: function(retorno){
            $('#tabela_supervisores').bootstrapTable('load', retorno);
        }
    });

});