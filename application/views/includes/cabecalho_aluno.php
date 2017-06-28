<!DOCTYPE html> <!--se remover quebra as tabelas -->
<html>
	<head lang="pt-br">
		<title><?php if(!empty($titulo_view)){ echo $titulo_view; } ?></title>
		<meta charset="UTF-8">
		<!--     Fonts and icons     -->
	    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>
		<!-- SCRIPTS -->
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-3.1.1.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/material-dashboard.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/material.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/scripts.js"></script>
		<script type="text/javascript"> var base_url = '<?php echo base_url(); ?>'</script>
		<!-- CSS -->
		<link rel="stylesheet" href="<?php echo base_url(); ?>assets/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/material-dashboard.css"/> 
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/bootstrap_table/bootstrap-table.min.css">
		<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/material-dashboard-modificada.css"/>
		<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/sweetalert/dist/sweetalert.css">
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/tinymce/js/tinymce/tinymce.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/sweetalert/dist/sweetalert.min.js"></script>
	</head>

<div class="wrapper">
	    <div class="sidebar" data-color="purple" data-image="../assets/img/sidebar-1.jpg">
			<!--
		        Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"
		        Tip 2: you can also add an image using data-image tag
		    -->
			<div class="logo">
				<a href="<?php echo base_url(); ?>" class="simple-text">
					Unimontes
				</a>
			</div>
	    	<div class="sidebar-wrapper">
	            <ul class="nav">
	                <li id="link_BuscarEstagios">
	                    <a href="<?php echo base_url(); ?>BuscarEstagios">
							<i class="material-icons">search</i>
	                        <p>Buscar Estágios</p>
	                    </a>
	                </li>
	                <li id="link_MinhasInscricoes">
	                    <a href="<?php echo base_url(); ?>MinhasInscricoes/<?php echo $this->session->matricula ?>">
							<i class="material-icons">format_list_bulleted</i>
	                        <p>Minhas Inscrições</p>
	                    </a>
	                </li>	
	                <li>
	                    <a href="http://webaluno.unimontes.br" target="_blank">
							<i class="material-icons">account_balance</i>
	                        <p>WebGiz</p>
	                    </a>
	                </li>
	            </ul>
	    	</div>
	    </div>

	    <div class="main-panel">
			<nav class="navbar navbar-transparent navbar-absolute">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle toggled" data-toggle="collapse">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="#"><?php if(!empty($titulo_view)){ echo $titulo_view; } ?><div class="ripple-container"></div></a>
					</div>
					<div class="collapse navbar-collapse">
						<ul class="nav navbar-nav navbar-right">
							<li>
								<a href="<?php echo base_url()?>Perfil/<?php echo $this->session->matricula ?>">
									<i class="material-icons">person</i>
									<p>Perfil</p>
								</a>
							</li>
							<li>
								<a href="http://webaluno.unimontes.br/index.php?option=com_aixgen&view=alterarsenha">
									<i class="material-icons">account_box</i>
	 							   <p>Mudar Senha</p>
		 						</a>
							</li>							
							<li>
								<a href="<?php echo base_url() ?>Aluno/logout">
									<i class="material-icons">exit_to_app</i>
	 							   <p>Sair</p>
		 						</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<script>
				url = window.location.href.split('/');
				li = document.getElementById('link_' + url[4]);
				li.className = 'active';
			</script>
			<div class="content">
				<div class="container-fluid">
