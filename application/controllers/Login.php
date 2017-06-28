<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller{
	public function __construct(){
		parent::__construct();

		$this->load->model('Login_model');
		// $this->load->library('encrypt');

		if(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 1){
			redirect('admin');
		}elseif(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 2){
			redirect('coord');
		}elseif(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 3){
			redirect('prof');
		}
	}

	public function index(){
		$dados = array();

		$dados['titulo'] = 'Abertura de diário';

		$this->load->view('contents/login', $dados);
	}


	public function verificarUsuario(){

		if(isset($_POST) && !empty($_POST)){
			
			$usuario = $this->input->post('usuario');
			$senha = $this->input->post('senha');

			$retorno = $this->Login_model->verificarUsuario($usuario, $senha);

			// Se o usuário não existe
			if($retorno == '0'){
				echo "0";
			}
			// Se é admin
			elseif ($retorno == '1') {
				
				//$dados_usuario = $this->Usuario_model->getacademicoGiz($usuario);
				$usuarios = array(
					'tipo_usuario' => $retorno,
					'usuario' => $usuario
					);

				$this->session->set_userdata($usuarios);
			
				echo '1';
			}

			
			// Se é coordenador
			elseif($retorno == '2'){
				$usuarios = array(
					'tipo_usuario' => $retorno,
					'usuario' => $usuario 
				);

				$this->session->set_userdata($usuarios);

				echo "2";
			}


			// Se é professor
			elseif($retorno  == '3'){
				$usuarios = array(
					'tipo_usuario' => $retorno,
					'usuario' => $usuario 
				);

				$this->session->set_userdata($usuarios);

				echo "3";
			}else{var_dump($retorno);}
		}
	}
}