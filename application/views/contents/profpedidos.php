<script type="text/javascript">
function formato_aprovacao(value, r, i){
	if(r.aprovacao==0){
    	return 'Não';
	}else(){
    	return 'Sim';	
	}
}

</script>

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Tabela de pedidos realizados</div>

                <div class="panel-body">
					
					<div class="table-responsive">
	                    <table  data-toggle="table" 
	                            data-filter-control="true" 
	                            data-show-columns="true" 
	                            data-show-Pagination-Switch="true"  
	                            data-pagination='true'>
	                        <thead>
	                            <tr>  
	                                <th data-field="periodo" data-sortable="true">Período</th>
	                                <th data-field="curso" data-sortable="true">Curso</th>
	                                <th data-field="disciplina" data-sortable="true">Disciplina</th>
	                                <th data-field="agendamento" data-sortable="true">Data e horario</th>
	                                <th data-field="status" data-sortable="true">Status</th>
	                                <th data-field="aprovacao" data-sortable="true" data-formater="formato-aprovacao">Aprovado?</th>
	                                
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <?php
	                            foreach ($pedidos as $row):
	                            ?>
	                            <tr>
	                                <td><?php echo $row->periodo; ?></td>
	                                <td><?php echo $row->curso; ?></td>
	                                <td><?php echo $row->disciplina ?></td>
	                                <td><?php
	                                $npl = explode(" ", $row->agendamento);
	                                $npl2 = explode('-', $npl['0']);
	                                echo ($npl2['2'].'/'.$npl2['1'].'/'.$npl2['0'].' as '.$npl['1']) ?></td>
	                                <td><?php echo $row->status?></td>
	                                <td><?php if($row->aprovacao==0){echo 'Não';}else{echo 'Sim';} ?></td>
	                            </tr>
	                            <?php 
	                            endforeach;
	                            ?>
	                        </tbody>
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
