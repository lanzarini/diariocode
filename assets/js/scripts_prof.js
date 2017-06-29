$(document).ready(function(){

    $('#form_pedido').submit(function(){
        //event.preventDefault();
        $.ajax({
            url: "prof/enviarpedido",
            type: "post",
            datatype:'json',
            data: $("#form_pedido").serialize(),
            success: function(resultado){
                switch(resultado){
                    case '1':
                        swal({
                                title: "Pedido enviado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
  
                    break;
                    case '2':
                        sweetAlert("Erro ao tentar enviar pedido!","Tente novamente ou procure a DTI!");
                        
                    break;
                }
            },
            error:function(){
                sweetAlert("Erro ao tentar enviar pedido!","Tente novamente ou procure a DTI!");

            }
        });
        return false;
    });


	$('select[name="periodo"]').change(function () { 

		var id=$('select[name="periodo"]').val();
        $.ajax({   
            url: 'prof/disciplinasporperiodo',
            type: 'POST',
            data: {id},
            datatype:'json',
            success: function(asd){
                var option = '<option></option>';
                $.each(asd, function(k, v){
                    option += '<option value="'+v.disciplina+'">'+v.disciplina+'</option>';
                });
                $('select[name="disciplina"]').html(option).show();

                // var id=$('select[name="setor"]').val();
                // $.ajax({   
                //     url: '../setores/getsupervisoressetor',
                //     type: 'POST',
                //     data: {id},
                //     datatype:'json',
                //     success: function(asd){
                //         var option = '<option></option>';
                //         $.each(asd, function(k, v){
                //             option += '<option value="'+v.sup_login+'">'+v.sup_nome+'</option>';
                //         });
                //         $('select[name="Supervisor"]').html(option).show();

                //     }
                // });
            }
        });

	});
});