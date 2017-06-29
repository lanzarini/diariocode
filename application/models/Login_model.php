<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_model extends CI_Model{

		public function __construct(){

			parent::__construct();

			$this->load->model('Configuracoes_model');

			


		}

		//RETORNA 0 EM CASO DE FALHA, 1 EM CASO DE ADMIN, 2 EM CASO DE COORDENADOR E 3 EM CASO DE PROFESSOR
		public function verificarUsuario($usuario, $senha){
				
			$usuarioesc=$this->db->escape($usuario);
			$senhaesc=$this->db->escape_like_str($senha);


			//SQL PARA VERIFICAR LOGIN DE ADMIN
			$sql2 = "
				SELECT 
					*
				FROM 
					usuario 
				WHERE 
					login = $usuarioesc AND senha = '$senhaesc'";

			$query2 = $this->db->query($sql2);

			if($query2->num_rows() == 1){
			  return 1;
			}else{
				//SQL PARA VERIFICAR LOGIN DE COORDENADOR
				$sql = $this->db->query(
					"SELECT 
					codusuario
				FROM 
					coord 
				WHERE 
					nomelogin = $usuarioesc");

				$cod=$sql->result_array();

				if($cod){

					$this->Configuracoes_model->connectdb();
					//mssql_connect("10.10.10.30", "WEBGIZSGD", "mw7Hggci") or die ("Não foi possivel conectar");
					$cod=$cod[0]['codusuario'];
					//return $cod;
					$senhacod=md5($senha.$cod);

					$sql =
			        "SELECT codusuario
			        from UNIMONTES_GEN..usuario as usuario
			        where usuario.codusuario='$cod' and usuario.usu_senha='$senhacod'
			        ";

			        $result = mssql_query($sql);
			        //return $result;
					if(mssql_num_rows($result) == 1){
							return 2;
						}else if(mssql_num_rows($result) == 0){
							return 0;
						}
				}else{
					$this->Configuracoes_model->connectdb();
					//mssql_connect("10.10.10.30", "WEBGIZSGD", "mw7Hggci") or die ("Não foi possivel conectar");
			        //SQL PARA VERIFICAR LOGIN DE PROFESSOR
			        $sql = 
			        "SELECT pfg_cod_usuario as codusuario
			        from UNIMONTES_GEN..profgen
			        where cod_prof='$usuario'
			        ";
			        $result = mssql_query($sql);
			        $cod=mssql_fetch_array($result);
			        //return $cod;
			        if($cod['codusuario']){

						$this->Configuracoes_model->connectdb();

						$cod=$cod['codusuario'];
						$senhacod=md5($senha.$cod);
						//return $senhacod;
						$sql = 
				        "SELECT codusuario
				        from UNIMONTES_GEN..usuario as usuario
				        where codusuario='$cod' and usu_senha='$senhacod'
				        ";

				        $result = mssql_query($sql);
				        //$cod=mssql_fetch_array($result);
				        //return $cod;
						if(mssql_num_rows($result) == 1){
								return 3;
							}else if(mssql_num_rows($result) == 0){
								return 0;
							}
					}else{
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