<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller{

	public function __construct(){

		parent::__construct();

		$this->load->model('Login_model');
		$this->load->model('Pedido_model','pedido');
		// $tipo_usuario = 1;

		// if(!$this->Login_model->estaLogado($tipo_usuario)){
		// 	redirect(base_url());
		// }
	}

	public function index(){
		$dados = array();

		$dados['titulo_view'] = 'Lista de pedidos';
		$dados['nome_view'] = 'contents/adminpedidos';
		$this->load->view('layout_admin', $dados);
		//$this->load->view('contents/admin', $dados);
	}

	public function salvar(){
		header('Content-Type: application/json');

		$retorno = $this->pedido->salvarpedido($this->input->post('id'),$this->input->post('status'));
		// var_dump($dados['pedidos']);
		switch ($retorno) {
			case '1':
				echo (json_encode('1'));
				break;
			
			case '0':
				echo (json_encode('0'));
				break;
		}
	}

	public function ver($id){
		$dados = array();
		$dados['titulo_view'] = 'Pedido';
		$dados['nome_view'] = 'contents/adminverpedido';
		$dados['pedido'] = $this->pedido->verpedido($id);
		//var_dump($dados['pedido']);
		$this->load->view('layout_coord', $dados);
		//$this->load->view('contents/admin', $dados);
	}

	public function pedidos(){
		header('Content-Type: application/json');

		$dados = array();

		$dados['pedidos'] = $this->pedido->getpedidos();
		// var_dump($dados['pedidos']);
		echo(json_encode($dados['pedidos']));
	}
}