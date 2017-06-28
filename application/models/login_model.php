<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class login_model extends CI_Model{

		public function __construct(){

			parent::__construct();

			$this->load->model('Configuracoes_model');

			if(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 1){
				redirect('admin');
			}elseif(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 2){
				redirect('coord');
			}elseif(isset($_SESSION['tipo_usuario']) && $_SESSION['tipo_usuario'] == 3){
				redirect('prof');
			}


		}

		//RETORNA 0 EM CASO DE FALHA, 1 EM CASO DE ADMIN, 2 EM CASO DE COORDENADOR E 3 EM CASO DE PROFESSOR
		public function verificarUsuario($usuario, $senha){
			return 1;	
			$usuarioesc=$this->db->escape($usuario);
			$senhaesc=$this->db->escape_like_str($senha);

			$sql2 = "
				SELECT 
					*
				FROM 
					usuario 
				WHERE 
					login = $usuarioesc AND senha = md5($senhaesc)";

			$query2 = $this->db->query($sql2);

			if($query2->num_rows() == 1){
			  return 1;
			}else{

				$this->Configuracoes_model->connectdb();

		        //SQL PARA VERIFICAR LOGIN DE COORDENADOR
		        $result = mssql_query($sql);

		        if(mssql_num_rows($result) == 1){
					return 2;
				}else if(mssql_num_rows($result) == 0){



					$senhamd5 =md5($senha);
			        //SQL PARA VERIFICAR LOGIN DE PROFESSOR
			        $result2 = mssql_query($sql2);

			        if(mssql_num_rows($result2) == 1){
						return 3;
						}else if(mssql_num_rows($result2) == 0){
							return 0;
		        		}
				}
		    }
		}


		
		
		// Verifica se o usuário está logado de acordo com seu tipo
		public function estaLogado($tipo_usuario){

			if(!isset($this->session->tipo_usuario) || $this->session->tipo_usuario != $tipo_usuario){

				return false;
			}else{

				return true;
			}
	}

}