<!DOCTYPE html>
<html>
    <head lang="pt-br">
		<title><?php if(!empty($titulo_view)){ echo $titulo_view; } ?></title>
		<meta charset="UTF-8">

	    <!--     Fonts and icons     -->
	    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>

		<!-- SCRIPT ESSENCIAL - TEM QUE FICAR AQUI -->
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-3.1.1.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/material-dashboard.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/material.min.js"></script>
		<script type="text/javascript"> var base_url = '<?php echo base_url(); ?>'</script>
		
		<!-- CSS -->
		
		<link rel="stylesheet" href="<?php echo base_url(); ?>assets/bootstrap/css/bootstrap.min.css">
		
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/sweetalert/dist/sweetalert.css">

        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/material-dashboard.css"/> 
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/bootstrap_table/bootstrap-table.min.css">

        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/material-dashboard-modificada.css"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css" rel="Stylesheet"></link>	
	</head>
	<body>
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
	                <li id="link_ativos">
	                    <a href="<?php echo base_url(); ?>supervisor/ativos">
							<i class="material-icons">event_available</i>
	                        <p>Ativos</p>
	                    </a>
	                </li>
	                <li id="link_inativos">
	                    <a href="<?php echo base_url(); ?>supervisor/inativos">
	                        <i class="material-icons">event_busy</i>
	                        <p>Inativos</p>
	                    </a>
	                </li>
	                <li id="link_inscritos">
	                    <a href="<?php echo base_url(); ?>supervisor/inscritos">
	                        <i class="material-icons">event_note</i> 
	                        <p>Fase de Inscrição</p>
	                    </a>
	                </li>
	                <!-- <li id="link_chamada">
	                    <a href="<?php echo base_url(); ?>supervisor/chamada">
	                        <i class="material-icons">code</i>
	                        <p>Chamada</p>
	                    </a>
	                </li> -->
	                <?php
	                if($chefe==1){echo '
	                <li id="link_aprovacao">
	                    <a href="'.base_url().'supervisor/aprovacao">
	                        <i class="material-icons">list</i>
	                        <p>Estágios em aprovação</p>
	                    </a>
	                </li>
	                <li id="link_estagio">
	                    <a href="'.base_url().'supervisor/estagio/criar">
	                        <i class="material-icons">add_box</i>
	                        <p>Novo Estágio</p>
	                    </a>
	                </li>';	
	                } ?>                
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
								<a href="<?php echo base_url() . 'perfil/' . $_SESSION['usuario'] ?>">
									<i class="material-icons">person</i>
									<p>Perfil</p>
								</a>
							</li>					
							<li>
								<a href="<?php echo base_url(); ?>sair">
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
				li = document.getElementById('link_' + url[5]);
				li.className = 'active';
			</script>
			<div class="content">
				<div class="container-fluid">
					<div class="row">
	                    <div class="col-md-12">
	                        <div class="card">
	                            <div class="card-header" data-background-color="blue">
	                                <h4 class="title"><?php if(!empty($titulo_view)){ echo $titulo_view; } ?></h4>
	                            </div>
	                            <div class="card-content">