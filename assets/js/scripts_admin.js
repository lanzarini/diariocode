function formatoacoes(value, r, i){
    return '<button class="btn btn-primary">VER PEDIDO</button>';
}

window.eventoacoes={
    'click button':function(e,value,row,index){
        var id=[row.id];
        window.location.href='admin/ver/'+id; 

}
}
$(document).ready(function(){

    $.ajax({    //CARREGA TABELAS DA PAGINA
            url: 'admin/pedidos',
            type: 'POST',
            datatype:"json",
            success:function(resultado){
                 $("#tabela_pedidos").bootstrapTable('load',resultado);
                // $("#tabelasetoreson").bootstrapTable('load',resultado["setoreson"]);
                // $("#tabelaestagioativos").bootstrapTable('load',resultado["estagioativo"]);
                // $("#tabelaestagiosencerrados").bootstrapTable('load',resultado["estagioencerrado"]);
                // $("#tabelaestagioschamada").bootstrapTable('load',resultado["estagiochamada"]);
                // $("#tabelaestagiospedidos").bootstrapTable('load',resultado["estagiopedido"]);
                // $("#tabelaestagiosinscricao").bootstrapTable('load',resultado["estagioinscricao"]);            

            }
        });

    
});