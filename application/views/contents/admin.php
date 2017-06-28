<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Últimos tickets</div>

                <div class="panel-body">
					<div class="list-group">
						<a href="" class="btn btn-primary" style="margin: 0 0 15px 0;">Todas solicitação</a>
						
						<a href="" class="list-group-item">
							<h4 class="list-group-item-heading">{{$ticket->nome}}</h4>
							<p class="list-group-item-text">
								
								<span class="label label-warning">{{ $ticket->status }}</span>
								
								<span class="label label-success">{{ $ticket->status }}</span>
								
								<span class="label label-danger">{{ $ticket->status }}</span>
								
								<span class="label label-primary">{{ $ticket->status }}</span>
								
								Agendamento: </p>
						</a>
						
					</div>
                </div>
            </div>
        </div>
    </div>
</div>