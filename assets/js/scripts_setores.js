
function formato_estagio(value, r, i){
	return '<a>' + value + '</a>';
}

function formato_contrato(value, r, i){
	return '<a>' + value + '</a>';
}

function formato_aluno(value, r, i){
	return '<a>' + value + '</a>';
}

window.evento_link_estagio = {
	'click a': function(e, x, y, z){
		window.location.href="../estagio/" + y.historico;
	}
}

window.evento_link_contrato = {
	'click a': function(e, x, y, z){
		window.location.href = "../contrato/" + y.contrato_id;
	}
}

window.evento_link_aluno = {
	'click a': function(e, x, y, z){
		window.location.href="../academico/" + y.matr_aluno;
	}
}

$(document).ready(function(){

	// Pega os estagios do setor
	$.ajax({
		url: "../Setores/getEstagios",
		type: "POST",
		dataType: "json",
		data: {id_setor: $('input[name="id_setor"]').val()},
		success: function(retorno){
			$('#tabela_estagios').bootstrapTable('load', retorno);
		}
	});

    // Alterar setor
    $('#form_aditar_setor').submit(function(){

        $.ajax({
            url: 'alterarSetor',
            type: 'post',
            data: $('#form_aditar_setor').serialize(),
            success: function(resultado){
                switch(resultado){
                    case '1':
                        swal({
                                title: "Dados alterados com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
  
                    break;
                    case '2':
                        sweetAlert("Erro ao tentar alterar dados!","error");
                        
                    break;
                }
            }
        });

        return false;
    });

    // Adiciona supervisor via AJAX
    $('#form_add_supervisor').submit(function(){
        $.ajax({
            url: '../../Supervisores/adicionarSupervisor',
            type: 'post',
            data: $('#form_add_supervisor').serialize(),
            success: function(resultado){
                switch(resultado){
                    case '1':
                        swal({
                                title: "Supervisor adicionado com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //$('.alert-success').show();
                        $('input[name="unidade"]').val('');
                        $('input[name="vagas_autorizadas"]').val('');
                       
                    break;
                    case '2':
                        sweetAlert("Erro ao tentar adicionar supervisor!","error");
                        //$('.alert-danger').show();
                        $('input[name="unidade"]').val('');
                        $('input[name="vagas_autorizadas"]').val('');
 
                    break;
                }
            }
        });
        return false;
    });
});