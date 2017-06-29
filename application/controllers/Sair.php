<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sair extends CI_Controller{
	public function index(){
		$array = array('tipo_usuario', 'usuario');
		$this->session->unset_userdata($array);
		$this->session->sess_destroy();
		redirect(base_url());
	}
}