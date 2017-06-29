<!doctype html>
<html lang="pt-br">
<head>
	<title><?php if(!empty($titulo_view)){ echo $titulo_view; } ?></title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />

    <!--     Fonts and icons     -->
   <!-- <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">-->
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons' rel='stylesheet' type='text/css'>

	<!-- SCRIPTS -->
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-3.1.1.min.js"></script>
<!--	<link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css" rel="Stylesheet"></link>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js" ></script> -->
	
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/material-dashboard.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/material.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/sweetalert/dist/sweetalert.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-ui.js"></script>
	<!-- CSS -->
    
	<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/jquery-ui.css"/> 
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/font-awesome.min.css"/> 
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/roboto.css"/> 
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/bootstrap/css/bootstrap.min.css"/> 
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/material-dashboard.css"/> 
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/bootstrap_table/bootstrap-table.min.css"/>
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/material-dashboard-modificada.css"/>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/sweetalert/dist/sweetalert.css">

	
	

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
	                <li id="link_contratos">
	                    <a href="<?php echo base_url(); ?>prof">
							<i class="material-icons">assignment</i>
	                        <p>Realizar pedido</p>
	                    </a>
	                </li>
	                <li id="link_estagios">
	                    <a href="<?php echo base_url(); ?>prof/pedidos">
	                        <i class="material-icons">work</i>
	                        <p>Ver pedidos</p>
	                    </a>
	                </li>
	            </ul>
	    	</div>
	    </div>

	    <div class="main-panel">
			<navyo class="navbar navbar-transparent navbar-absolute">
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
								<a href="<?php echo base_url(); ?>sair">
									<i class="material-icons">exit_to_app</i>
	 							   <p >Sair</p>
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