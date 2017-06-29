<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Prof extends CI_Controller{

	public function __construct(){

		parent::__construct();

		$this->load->model('Login_model','login');
		$this->load->model('Giz_model','giz');
		$this->load->model('Pedido_model','pedido');
			// $tipo_usuario = 3;

			// if(!$this->login->estaLogado($tipo_usuario)){
			// 	redirect(base_url());
			// }
	}

	public function index(){
		$dados = array();

		$dados['titulo_view'] = 'Realizar Pedido';
		$dados['nome_view'] = 'contents/prof';
		//$dados['per_letivos'] = $this->giz->getPeriodosLetivos();
		$this->load->view('layout_prof', $dados);
		//$this->load->view('contents/admin', $dados);
	}

	public function pedidos(){
		$dados = array();

		$dados['titulo_view'] = 'Ver Pedidos';
		$dados['nome_view'] = 'contents/profpedidos';
		$dados['pedidos'] = $this->pedido->getpedidosprof('icaro');
		// var_dump($dados['pedidos']);
		$this->load->view('layout_prof', $dados);
	}

	public function enviarpedido(){
		header('Content-Type: application/json');

		$pedido=array(
    		'status'=>'Aguardando',
    		'disciplina'=>$this->input->post("disciplina"),
    		'idcurso'=>$this->input->post("idcurso"),
    		'curso'=>$this->input->post("curso"),
    		'periodo'=>$this->input->post("periodo"),
    		'agendamento'=>$this->input->post("agendamento"),
    		'justificativa'=>$this->input->post("justificativa"),
    		'professor'=>'icaro',//$this->session->userdata('nome');
    		'aprovacao'=>'0'
    		);


		$retorno=$this->pedido->inserirpedido($pedido);
		switch ($retorno) {
			case '1':
				echo (json_encode('1'));
				break;
			
			case '0':
				echo (json_encode('0'));
				break;
		}
		//echo (json_encode($disciplinas));

	}

	public function disciplinasporperiodo(){

		header('Content-Type: application/json');
		$periodo=$this->input->post('id');
		$disciplinas=$this->giz->disciplinasporperiodo($periodo);
		echo (json_encode($disciplinas));

	}

}