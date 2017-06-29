<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Tabela de pedidos do curso</div>

                <div class="panel-body">
					
					<div class="table-responsive">
	                    <table  id="tabela_pedidos"
	                    		data-toggle="table" 
	                            data-filter-control="true" 
	                            data-show-columns="true" 
	                            data-show-Pagination-Switch="true"  
	                            data-pagination='true'>
	                        <thead>
	                            <tr>  
	                                <th data-field="periodo" data-sortable="true" data-filter-control="select">Período</th>
	                                <th data-field="curso" data-sortable="true" data-filter-control="select">Curso</th>
	                                <th data-field="disciplina" data-sortable="true" data-filter-control="select">Disciplina</th>
	                                <th data-field="professor" data-sortable="true" data-filter-control="input">Professor</th>
	                                <th data-field="agendamento" data-filter-control="input" data-sortable="true">Data e horario</th>
	                                <th data-field="status" data-filter-control="select" data-sortable="true">Status</th>
	                                <th data-field="acoes" data-sortable="true" data-formatter="formatoacoes" data-events='eventoacoes'>Ações</th>
	                                
	                            </tr>
	                        </thead>
	                       
	                    </table>   
	                </div>

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
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/scripts_admin.js"></script>