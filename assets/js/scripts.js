

// Verifica os dados inseridos no formulário de login
$(document).ready(function(){



	//var data2=(<?php $cursos ?>);
	//var data2=[{"idcurso":"2","nome":"musica"},{"idcurso":"3","nome":"letras"},{"idcurso":"4","nome":"sistemas"},{"idcurso":"5","nome":"fosasd"},{"idcurso":"6","nome":"sdfdf"},{"idcurso":"7","nome":"sdfsdff"},{"idcurso":"8","nome":"asdfasdfasdf"},{"idcurso":"9","nome":"asdfasdfasdf"},{"idcurso":"10","nome":"icaro"},{"idcurso":"11","nome":"icaro"},{"idcurso":"12","nome":"sddddd"},{"idcurso":"13","nome":"oasd"},{"idcurso":"14","nome":"eeee"},{"idcurso":"15","nome":"eee"},{"idcurso":"16","nome":"qqq"},{"idcurso":"17","nome":"wq"},{"idcurso":"18","nome":"asdasd"},{"idcurso":"19","nome":"qqqqq"},{"idcurso":"20","nome":"zzzz"},{"idcurso":"21","nome":"xxxx"},{"idcurso":"22","nome":"ttt"},{"idcurso":"23","nome":"bbbbb"},{"idcurso":"24","nome":"qweqwe"},{"idcurso":"25","nome":"\u00e7ppp"},{"idcurso":"26","nome":"vvcxvxcv"},{"idcurso":"27","nome":"sdfsdfwre"},{"idcurso":"28","nome":"sdfsdf"},{"idcurso":"29","nome":"sdfdf"},{"idcurso":"30","nome":"bb"},{"idcurso":"31","nome":"b"},{"idcurso":"32","nome":"g"},{"idcurso":"33","nome":"j"},{"idcurso":"34","nome":"g"},{"idcurso":"35","nome":"g"},{"idcurso":"36","nome":"c"},{"idcurso":"37","nome":"c"},{"idcurso":"38","nome":","},{"idcurso":"39","nome":"dsdfdf"},{"idcurso":"40","nome":"v"},{"idcurso":"41","nome":"i"},{"idcurso":"42","nome":"n"},{"idcurso":"43","nome":"s"},{"idcurso":"44","nome":"v"},{"idcurso":"45","nome":"c"},{"idcurso":"46","nome":"d"},{"idcurso":"47","nome":"d"},{"idcurso":"48","nome":"d"},{"idcurso":"49","nome":"s"},{"idcurso":"50","nome":","},{"idcurso":"51","nome":"x"},{"idcurso":"52","nome":"x"},{"idcurso":"53","nome":"a"},{"idcurso":"54","nome":"x"},{"idcurso":"55","nome":"s"},{"idcurso":"56","nome":"w"},{"idcurso":"57","nome":"wa"},{"idcurso":"58","nome":"w"},{"idcurso":"59","nome":"w"},{"idcurso":"60","nome":"w"},{"idcurso":"61","nome":"\u00e7"},{"idcurso":"62","nome":"r"},{"idcurso":"63","nome":"s"},{"idcurso":"64","nome":"q"},{"idcurso":"65","nome":"x"},{"idcurso":"66","nome":"maiza"},{"idcurso":"67","nome":"q"},{"idcurso":"68","nome":"asd"},{"idcurso":"69","nome":"sdfsadf"},{"idcurso":"70","nome":"sdfsadf"},{"idcurso":"71","nome":"f"},{"idcurso":"72","nome":"q"},{"idcurso":"73","nome":"we"},{"idcurso":"74","nome":"icaro wins"},{"idcurso":"75","nome":"fail"},{"idcurso":"76","nome":"s"},{"idcurso":"77","nome":"ds"}];
      // $("#tabelacursos").bootstrapTable('load',data2);
      // $('#tabelacursos').bootstrapTable({data: data2});
        // $("#tabelacursos").bootstrapTable('refresh');

	$('#form_login').submit(function(){
		$.ajax({
			url: 'Login/verificarUsuario',
			type: 'post',
			data: $('#form_login').serialize(),
			success: function(resultado){
				
				switch(resultado){
					case '1':
						// Erro de usuário
						$('#conteudo_erro').html('O usuário informado não existe. Por favor, digite novamente!');
						$('#erro').modal('show');
						$('input[name="usuario"]').val('');
						$('input[name="senha"]').val('');
					break;
					case '2': // Administrador 
						window.location.href="Contratos";
					break;
					case '3': // Aluno
						window.location.href="";
					break;
					case '4': // Supervisor
						window.location.href="";
					break;
					case '5': // Erro de senha
						$('#conteudo_erro').html('Senha incorreta. Por favor, digite novamente!');
						$('#erro').modal('show');
						$('input[name="senha"]').val('');
					break;
					case '6': // Erro de campos vazios	
						$('#conteudo_erro').html('Preencha todos os campos para logar-se');
						$('#erro').modal('show');
					break;
					case '7': // Erro de tipo de usuário
						$('#conteudo_erro').html('Selecione um tipo de usuário referente as suas permissões!');
						$('#erro').modal('show');
					break;
				}	
			}
		});
		return false;
	});

});
