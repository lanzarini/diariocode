$(document).ready(function(){

    $('#form_pedido').submit(function(){
        //event.preventDefault();
        $.ajax({
            url: "../salvar",
            type: "post",
            datatype:'json',
            data: $("#form_pedido").serialize(),
            success: function(resultado){
                switch(resultado){
                    case '1':
                        swal({
                                title: "Pedido alterado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            },function(){
                                window.location.href='../../admin';
                            });
                         
                    break;
                    case '0':
                        sweetAlert("Erro ao tentar alterar pedido!","Tente novamente ou procure a DTI!");
                        
                    break;
                }
            },
            error:function(){
                sweetAlert("Erro ao tentar alterar pedido!","Tente novamente ou procure a DTI!");

            }
        });
        return false;
        
    });
});