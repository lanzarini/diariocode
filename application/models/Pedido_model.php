<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pedido_model extends CI_Model{

		public function __construct(){

			parent::__construct();

			$this->load->model('Configuracoes_model');
		}

		public function inserirpedido($inserir){

			# SQL para inserção
			$sql = $this->db->insert('pedido', $inserir);

			# Verificação de sucesso na inserção
			if($sql){
				# Deu certo
				return 1;
			}else{
				# Deu errado
				return 2;
			}
	    }

	    public function getpedidosprof($professor){
	    	$array='';
	    	$this->db->select("id,periodo,curso,agendamento,status,disciplina,aprovacao");
			$this->db->from("pedido");
			$this->db->where('professor', $professor);
			$sql = $this->db->get();
			if($sql->num_rows() > 0){
				$array = $sql->result();
			}

			return $array;
	    }

	    public function aceitarpedido($id){
	    	$this->db->set('aprovacao', '1');
			$this->db->where('id', $id);
			$sql = $this->db->update('pedido');

			if($sql){
				return 1;
			}else{
				return 0;
			}
	    }

	    public function salvarpedido($id,$status){
	    	$this->db->set('status', $status);
			$this->db->where('id', $id);
			$sql = $this->db->update('pedido');

			if($sql){
				return 1;
			}else{
				return 0;
			}
	    }

	    public function verpedido($id){
	    	$array = array();

			$this->db->where('id', $id);
			$this->db->from('pedido');
			$sql = $this->db->get();

			if($sql->num_rows() > 0){
				$array = $sql->row();
			}

			return $array;
	    }

	    public function getpedidos(){
	    	$array='';
	    	$this->db->select("id,periodo,professor,agendamento,disciplina,curso,status");
			$this->db->from("pedido");
			$this->db->where('aprovacao', '1');
			$sql = $this->db->get();
			if($sql->num_rows() > 0){
				$array = $sql->result();
			}

			return $array;
	    }

	    public function getpedidoscoord($idcurso){
	    	$array='';
	    	$this->db->select("id,periodo,professor,agendamento,disciplina,idcurso");
			$this->db->from("pedido");
			$this->db->where('idcurso', $idcurso);
			$this->db->where('aprovacao', '0');
			$sql = $this->db->get();
			if($sql->num_rows() > 0){
				$array = $sql->result();
			}

			return $array;
	    }

}