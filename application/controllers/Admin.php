<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller{

	public function __construct(){

		parent::__construct();

		$this->load->model('login_model');
		$tipo_usuario = 1;

		if(!$this->login_model->estaLogado($tipo_usuario)){
			redirect(base_url());
		}
	}

	public function index(){
		$dados = array();

		$dados['titulo'] = 'Administrador';

		$this->load->view('contents/login', $dados);
	}
}