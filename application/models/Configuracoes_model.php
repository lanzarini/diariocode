<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class configuracoes_model extends CI_Model{

		public function __construct(){

			parent::__construct();


		}

		public function connectdb(){
			mssql_connect("10.10.10.30", "WEBGIZSGD", "mw7Hggci") or die ("Não foi possivel conectar");
		} 
		 
		 

}