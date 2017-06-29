$(document).ready(function(){

    $('#form_pedido').submit(function(){
        //event.preventDefault();
        $.ajax({
            url: "../aceitar",
            type: "post",
            datatype:'json',
            data: $("#form_pedido").serialize(),
            success: function(resultado){
                switch(resultado){
                    case '1':
                        swal({
                                title: "Pedido aceito com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            },function(){
                                window.location.href='../../coord';
                            });
                         
                    break;
                    case '0':
                        sweetAlert("Erro ao tentar aceitar pedido!","Tente novamente ou procure a DTI!");
                        
                    break;
                }
            },
            error:function(){
                sweetAlert("Erro ao tentar aceitar pedido!","Tente novamente ou procure a DTI!");

            }
        });
        return false;
        
    });
});