<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller{
	public function __construct(){
		parent::__construct();

		// $this->load->model('Usuario_model');
		// $this->load->library('encrypt');

		// if(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 1){
		// 	redirect('Contratos');
		// }elseif(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 2){
		// 	redirect('aluno');
		// }elseif(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 3){
		// 	redirect('supervisor');
		// }
	}

	public function index(){
		$dados = array();

		$dados['titulo'] = 'Login';

		$this->load->view('contents/login', $dados);
	}

	// public function verificarUsuario(){

	// 	if(isset($_POST) && !empty($_POST)){
			
	// 		$usuario = $this->input->post('usuario');
	// 		$senha = $this->input->post('senha');
	// 		//$tipo_usuario = $this->input->post('tipo_usuario');

	// 		$retorno = $this->Usuario_model->verificarUsuario($usuario, $senha);

	// 		// Se o usuário não existe
	// 		if($retorno == '0'){
	// 			echo "0";
	// 		}

	// 		elseif ($retorno == '2') {
				
	// 			$dados_usuario = $this->Usuario_model->getacademicoGiz($usuario);
	// 			$usuarios = array(
	// 				'tipo_usuario' => $retorno,
	// 				'usuario' => $dados_usuario['nome'],
	// 				'matricula' => $usuario,
	// 				'curso' => $dados_usuario['curso']
	// 			);
	// 			$this->session->set_userdata($usuarios);
			
	// 			echo '3';
	// 		}

			
	// 		// Se o usuário existe e se ele é administrador
	// 		elseif($retorno == '1'){
	// 			$usuarios = array(
	// 				'tipo_usuario' => $retorno,
	// 				'usuario' => $usuario 
	// 			);

	// 			$this->session->set_userdata($usuarios);

	// 			echo "2";
	// 		}


	// 		// Se o usuário existe e ele é supervisor
	// 		elseif($retorno  == '3'){
	// 			$usuarios = array(
	// 				'tipo_usuario' => $retorno,
	// 				'usuario' => $usuario 
	// 			);

	// 			$this->session->set_userdata($usuarios);

	// 			echo "4";
	// 		}
	// 	}
	// }
}