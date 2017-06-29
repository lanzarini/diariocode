<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Novo pedido de abertura de diário</div>

                <div class="panel-body">
					
						<form id="form_supervisor" method="post">
							<label>Pedido de :NOME PROFESSOR</label>
							<br>
							<div class="col-sm-7">
					            <div class="form-group">
					                <label class="control-label">Período do pedido:</label> 
					                <select required="required" class="form-control" name="periodo" data-toggle="tooltip" title="Período letivo">
					                   <?php 
					      				foreach($per_letivos as $pl):

					      					# Novo período letivo
					      					$npl = explode('_', $pl->name); 
					      					$npl2 = explode('-', $npl[2]); 
					      					if(!$npl2[1]){
					      						$npl = 'Ano: '. $npl[2].'/ Semestre: '.$npl[1]; 
					      						?>
					      						<option value="<?php echo $pl->name; ?>"><?php echo $npl; ?></option>
					      						<?php
					      					}
										?>
					      				<?php
							      		endforeach; 
					      				?>
					                </select>
					            </div>
					        </div>
					        <div class="col-sm-7">
					            <div class="form-group">
					             	<label class="control-label">Disciplinas do período:</label> 
				               		<select required="required" class="form-control" name="disciplina" data-toggle="tooltip" title="Disciplinas para abertura do diário">
				                	</select>
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