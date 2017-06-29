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
					                <select required="required" class="form-control" name="Tipodevaga" data-toggle="tooltip" title="Tipo da vaga">
					                   <?php 
					      				foreach($per_letivos as $pl):

					      					# Novo período letivo
					      					$npl = explode('_', $pl->name); 
											$npl = $npl[1].'/'.$npl[2]; 
										?>
					      					<option value="<?php echo $pl->name; ?>"><?php echo $npl; ?></option>
					      				<?php
							      		endforeach; 
					      				?>
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