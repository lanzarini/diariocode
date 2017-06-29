$(document).ready(function(){


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
                    option += '<option value="'+v.cod_disc+'">'+v.disciplina+'</option>';
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