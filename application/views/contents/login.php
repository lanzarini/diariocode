<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title><?php echo $titulo; ?></title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

	<!-- Canonical SEO -->	
	<!--     Fonts and icons     -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

	<!-- CSS Files -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/sweetalert/dist/sweetalert.css">
    <link href="<?php echo base_url(); ?>assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="<?php echo base_url(); ?>assets/css/material-kit.css" rel="stylesheet"/>
    <style type="text/css">
    	.card .header-primary {
			background: linear-gradient(60deg, #42a5f5, #42a5f5);
		}
		a {
			text-decoration: none;
			color: #42a5f5;
		}
		a:hover {
			text-decoration: none;
			color: #3e7fe4;
			cursor: pointer;
		}
		.form-group.is-focused .form-control .material-input:after {
			background-color: #42a5f5;
		}

		.form-group.is-focused .form-control {
			background-image: linear-gradient(#275cb0, #2753b0);
		}
		.btn.btn-primary.btn-simple, .navbar .navbar-nav > li > a.btn.btn-primary.btn-simple {
			background-color: transparent;
 			color: #42a5f5;
		}
		.btn.btn-primary.btn-simple:hover, .btn.btn-primary.btn-simple:focus, .btn.btn-primary.btn-simple:active, .navbar .navbar-nav > li > a.btn.btn-primary.btn-simple:hover, .navbar .navbar-nav > li > a.btn.btn-primary.btn-simple:focus, .navbar .navbar-nav > li > a.btn.btn-primary.btn-simple:active {
			background-color: transparent;
 			color: #3e7fe4;
		}
    </style>

</head>

<body class="signup-page">
    <div class="wrapper">
		<div class="header header-filter" style="background-image: url('../assets/img/city.jpg'); background-size: cover; background-position: top center;">
			<div class="container">
				<div class="row">
					<div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
						<div class="card card-signup">
							<form id="form_login" method="POST" class="form">
								<div class="header header-primary text-center">
									<h4>Login</h4>
								</div>
								 
								<div class="content">
									<div class="input-group">
										<span class="input-group-addon">
											<i class="material-icons">face</i>
										</span>
										<div class="form-group is-empty"><input type="text" name="usuario" id="usuario" class="form-control" aria-describedby="usuario" title="Insira seu código de professor!" required="" id="usuario" maxlength="20" placeholder="Código professor"><span class="material-input"></span></div>
									</div>

									<div class="input-group">
										<span class="input-group-addon">
											<i class="material-icons">lock_outline</i>
										</span>
										<div class="form-group is-empty"><input type="password" name="senha" placeholder="Senha" aria-describedby="senha" class="form-control" title="Insira sua senha!" required="" id="senha" maxlength="40"><span class="material-input"></span></div>
									</div>


									
								</div>
								<div class="footer text-center">
									<button type="submit" class="btn btn-simple btn-primary btn-lg">Entrar</button>
								</div>
							</form>
						</div>
				
						<!-- <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" id="erro">
							  <div class="modal-dialog modal-sm" role="document">
							    <div class="modal-content">
							      	<div class="modal-body" id="conteudo_erro">
							      	
							      	</div>
							      	<div class="modal-footer">
							        	<button type="button" class="btn btn-primary" data-dismiss="modal">Fechar</button>
							      	</div>
							    </div>
							</div>
						</div> -->						
					</div>
				</div>
			</div>
		</div>
    </div>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/bootstrap/js/bootstrap.min.js"></script>

	<script type="text/javascript">
		// Verifica os dados inseridos no formulário de login
		$(document).ready(function(){
			$('#mod').click(function(){
				$('#info').appendTo('body');
			});
			$('#form_login').submit(function(){

				$.ajax({

					url: 'Login/VerificarUsuario',
					type: 'post',
					data: $('#form_login').serialize(),
					success: function(resultado){
							//alert(JSON.stringify(resultado));
						switch(resultado){
							
							case '0':
								// Erro de usuário
				//				alert('dfgdfg');
								sweetAlert("Login ou senha incorretos."," Por favor, digite novamente!");
								// $('#conteudo_erro').html('O usuário informado não existe. Por favor, digite novamente!');
								// $('#erro').appendTo('body');
								// $('#erro').modal('show');

								$('input[name="usuario"]').val('');
								$('input[name="senha"]').val('');
							break;
							case '1': // Administrador 
								window.location.href="admin";
							break;
							case '2': // coordenador
								window.location.href="coord";
							break;
							
							case '3': // professor
								window.location.href="prof";
							break;
						}	
					}
				});
				return false;
			});
		});
	</script>    
</body>
	<!--   Core JS Files   -->
	<script src="<?php echo base_url(); ?>assets/js/jquery.min.js" type="text/javascript"></script>
	<script src="http://demos.creative-tim.com/material-kit/assets/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url(); ?>assets/js/material.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/sweetalert/dist/sweetalert.min.js"></script>

	<!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
	<script src="<?php echo base_url(); ?>assets/js/nouislider.min.js" type="text/javascript"></script>