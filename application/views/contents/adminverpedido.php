<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Pedido de abertura de diário</div>

                <div class="panel-body">
					
						<form id="form_pedido" method="post">
							<label>Pedido de : <?php echo $pedido->professor ?></label>
							<br>
							<div class=" row ">
					            <div class="form-group col-sm-7 col-md-offset-1">
					                <label class="control-label">Período do pedido:</label> 
									<input id="id" type="hidden" class="form-control" name='id' value="<?php echo $pedido->id ?>" readonly>
					                <input id="periodo" type="text" class="form-control" name="periodo" value="<?php echo $pedido->periodo ?>" readonly>
					            </div>
					            <div class="form-group col-sm-5 ">
					             	<label class="control-label">Status do pedido:</label> 
				               		<select required="required" class="form-control" readonly name="status" data-toggle="tooltip" title="Status do pedido">
				                	<option value="Aguardando" <?php echo isset($pedido->status)?($pedido->status)=='Aguardando'?'selected':'':'';  ?> >Aguardando</option>
				                	<option value="Aberto" <?php echo isset($pedido->status)?($pedido->status)=='Aberto'?'selected':'':'';  ?>>Aberto</option>
				                	<option value="Fechado"  <?php echo isset($pedido->status)?($pedido->status)=='Fechado'?'selected':'':'';  ?>>Fechado</option>
				                	<option value="Finalizado" <?php echo isset($pedido->status)?($pedido->status)=='Finalizado'?'selected':'':'';  ?>>Finalizado</option>
				                	</select>
					            </div>
					        </div>	
					        <div class="row ">
					            <div class="form-group col-sm-7 col-md-offset-1">
					             	<label class="control-label">Disciplinas do período:</label> 
									<input id="disciplina" type="text" class="form-control" name="disciplina" value="<?php echo $pedido->disciplina ?>" readonly>
					            </div>
					            <div class="form-group col-sm-5 ">
					             	<label class="control-label">Curso da disciplina:</label> 
	                                <input id="idcurso" form='form_pedido' type="hidden" class="form-control" name="idcurso" value='testeidcurso' >	                                
	                                <input id="curso" form='form_pedido' type="text" class="form-control" name="curso" value='<?php echo $pedido->curso ?>' readonly>
					            </div>
					        </div>

					       
					        <div class="row ">
					            <div class="form-group col-sm-7 col-md-offset-1">
					             	<label class="control-label">Agendamento:</label> 
	                                <input id="agendamento" type="text" class="form-control" name="agendamento" value='<?php echo $pedido->agendamento ?>' readonly>
	                                <span>O horário de agendamento deve ser em dias úteis e horário de 08:00 às 16:00</span>

					            </div>

					        </div>
   					        <div class="row ">
					            <div class="form-group col-sm-12">
					             	<label class="control-label">Justificativa:</label> 
	                                <textarea id='just' rows='3' class="form-control" name="justificativa"  readonly><?php echo $pedido->justificativa ?></textarea>
					            </div>

					        </div>

					        <div class="row"><!--div aluno -->
		                        <div class="form-group col-sm-6 ">
		                            <input type="submit" value="Salvar" class="btn btn-primary" >
		                        </div>
		                    </div>
					        
						</form>

						<!-- <a href="" class="list-group-item">
							<h4 class="list-group-item-heading">{{$ticket->nome}}</h4>
							<p class="list-group-item-text">
								
								<span class="label label-warning">{{ $ticket->status }}</span>
								
								<span class="label label-success">{{ $ticket->status }}</span>
								
								<span class="label label-danger">{{ $ticket->status }}</span>
								
								<span class="label label-primary">{{ $ticket->status }}</span>
								
								Agendamento: </p>
						</a> -->
						
					
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/scripts_veradmin.js"></script>