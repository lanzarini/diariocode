<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller{

	public function __construct(){

		parent::__construct();

		$this->load->model('Login_model');
		$tipo_usuario = 1;

		if(!$this->Login_model->estaLogado($tipo_usuario)){
			redirect(base_url());
		}
	}

	public function index(){
		$dados = array();

		$dados['titulo'] = 'Administrador';
		$dados['nome_view'] = 'contents/admin';
		$this->load->view('layout_admin', $dados);
		//$this->load->view('contents/admin', $dados);
	}
}