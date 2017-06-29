<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Novo pedido de abertura de diário</div>

                <div class="panel-body">
					
						<form id="form_pedido" method="post">
							<label>Pedido de :NOME PROFESSOR</label>
							<br>
							<div class=" row ">
					            <div class="form-group col-sm-7 col-md-offset-1">
					                <label class="control-label">Período do pedido:</label> 
					                <select required="required" class="form-control" name="periodo" data-toggle="tooltip" title="Período letivo">
					                   <option value="testeper">testeper</option>
					                   <?php 
					      				foreach($per_letivos as $pl):

					      					# Novo período letivo
					      					$npl = explode('_', $pl->name); 
					      					$npl2 = explode('-', $npl[2]); 
					      					if(!$npl2[1]){
					      						$npl = 'Ano: '. $npl[2].'/ Semestre: '.$npl[1]; 
					      						?>
					      						<option value="<?php echo $npl; ?>"><?php echo $npl; ?></option>
					      						<?php
					      					}
										?>
					      				<?php
							      		endforeach; 
					      				?>
					                </select>
					            </div>
					        </div>
					        <div class="row ">
					            <div class="form-group col-sm-7 col-md-offset-1">
					             	<label class="control-label">Disciplinas do período:</label> 
				               		<select required="required" class="form-control" readonly name="disciplina" data-toggle="tooltip" title="Disciplinas para abertura do diário">
				                	<option value="testedis">testedis</option>
				                	</select>
					            </div>
					            <div class="form-group col-sm-5 ">
					             	<label class="control-label">Curso da disciplina:</label> 
	                                <input id="idcurso" form='form_pedido' type="hidden" class="form-control" name="idcurso" value='testeidcurso' >	                                
	                                <input id="curso" form='form_pedido' type="text" class="form-control" name="curso" value='testecurso' readonly>
					            </div>
					        </div>

					       
					        <div class="row ">
					            <div class="form-group col-sm-7 col-md-offset-1">
					             	<label class="control-label">Agendamento:</label> 
	                                <input id="agendamento" type="datetime-local" class="form-control" name="agendamento"  required>
	                                <span>O horário de agendamento deve ser em dias úteis e horário de 08:00 às 16:00</span>

					            </div>

					        </div>
   					        <div class="row ">
					            <div class="form-group col-sm-12">
					             	<label class="control-label">Justificativa:</label> 
	                                <textarea id='just' rows='3' class="form-control" name="justificativa"  required></textarea>
					            </div>

					        </div>

					        <div class="row"><!--div aluno -->
		                        <div class="form-group col-sm-6 ">
		                            <input type="submit" value="Enviar Pedido" class="btn btn-primary" >
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
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/scripts_prof.js"></script>