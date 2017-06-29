<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Giz_model extends CI_Model{

		public function __construct(){

			parent::__construct();

			$this->load->model('Configuracoes_model');
		}

		public function getPeriodosLetivos(){

	        $array = array();


	        $this->Configuracoes_model->connectdb();

	        $sql = "
	            SELECT 
	                name
	            FROM 
	               sys.databases 
	            WHERE 
	                name LIKE 'unimontes_0%' order by name desc
	        "; 	

	         $resultado = mssql_query($sql);

	         for($i=0;$i<mssql_num_rows($resultado);$i++){
	            
	            $array[$i] = mssql_fetch_object($resultado);
	        }

	        return $array;  	
	    }

	    public function disciplinasporperiodo($periodo){

	    	$array = array();
	    	$codprof = $this->session->userdata('usuario');
	    	
	        $this->Configuracoes_model->connectdb();
	        $sql= "SELECT segprof.cod_disc as codigo,dischis.nome as disciplina
	            FROM 
	              $periodo..SEGPROF as segprof
	            JOIN $periodo..DISCHIS as dischis on dischis.cod_disc=segprof.cod_disc 
	            WHERE 
	                cod_prof='$codprof'"; 	
	                //return $sql;
	         $resultado = mssql_query($sql);

	         for($i=0;$i<mssql_num_rows($resultado);$i++){
	            
	            $array[$i] = mssql_fetch_object($resultado);
	        }

	        return $array;
	    }
		 

}