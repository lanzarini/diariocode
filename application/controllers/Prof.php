<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Prof extends CI_Controller{

	public function __construct(){

		parent::__construct();

		$this->load->model('Login_model','login');
		$this->load->model('Giz_model','giz');
		$tipo_usuario = 3;

		if(!$this->login->estaLogado($tipo_usuario)){
			redirect(base_url());
		}
	}

	public function index(){
		$dados = array();

		$dados['titulo'] = 'Administrador';
		$dados['nome_view'] = 'contents/prof';
		$dados['per_letivos'] = $this->giz->getPeriodosLetivos();
		$this->load->view('layout_prof', $dados);
		//$this->load->view('contents/admin', $dados);
	}

	public function disciplinasporperiodo(){

		header('Content-Type: application/json');
		$periodo=$this->input->post('id');
		$disciplinas=$this->giz->disciplinasporperiodo($periodo);
		echo (json_encode($disciplinas));

	}

}