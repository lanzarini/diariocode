
    // Formato e Evento da coluna ID Contrato
    function formato_contrato(value, r, i){
        return '<a>' + value + '</a>';
    }


    function formato_termino(value, r, i){
        if((r.previsao_formatura<value ) && (r.status_contrato=='Ativo' || r.status_contrato=='Requer Documentos')){
        return '<div class="label label-danger"   title="Formatura: '+r.previsao_formatura+'"><label >'+value+'</label></div>';}
        else if(value<r.data_atual && (r.status_contrato=='Ativo' || r.status_contrato=='Requer Documentos' || r.status_contrato=='Renovar')){
        return '<div class="label label-danger"   title="Prazo encerrado, desative ou renove o contrato"><label >'+value+'</label></div>';}    
        else{    return value;
        }
    }

    function formato_acoes(value,r,i){
        if(value == 'Desativar'){
        return '<button class="btn btn-danger desativar" data-toggle="modal" data-target="#myModal4" >Desativar</button>';
    }else if (value == 'Renovar'){
        return '<div class=" form-group"><button class="btn btn-danger desativar" data-toggle="modal" data-target="#myModal4" >Desativar</button></div><div class=" form-group"><button class="btn btn-success renovar" data-toggle="modal" data-target="#myModal3">Renovar</button></div>';
    }else if (value == 'Requer Documentos'){
        return '<div class="label label-info" ><label >Requer documentos</label></div>';
    }
    else{
        return value;
    }
    }





    window.evento_acoes={
        'click .desativar':function(e,x,y,z){
            $('#myModal4').appendTo("body"); 
            //console.log(y);
            $('input[name="datadesligamentomodal"]').val(y.termino_contrato);
            if(y.formatura<y.data_atual){
                $('select[name="statusdesligamentomodal"]').val('1');
            }
            if(y.termino_contrato<y.data_atual){
                $('select[name="statusdesligamentomodal"]').val('0');
            }

            $('#form-finalizar').submit(function(){
                event.preventDefault();
                $.ajax({
                    url: 'contratos/finalizarcontrato',
                    type: 'post',
                    data: $('#form-finalizar').serialize()+"&contrato="+y.id_contrato+"&estagio="+y.id_estagio,
                    success:function(resultado){
                        //alert(JSON.stringify(resultado));
                        switch(resultado){
                            case 1:
                                swal({
                                    title: "Contrato finalizado",
                                    type: "success",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#2F3233"
                                });
                                //alert("Contrato finalizado");

                                setTimeout(function(){
                                    location.reload()
                                },1500);
                            break; 
                            default:
                                sweetAlert("Contrato não finalizado","error");
                                //alert("Contrato não finalizado");
                             setTimeout(function(){
                                    location.reload()
                                },1500);
                            break;
                        }
                    }
                });
            });
        },
        'click .renovar':function(e,x,row,z){
            $('#myModal3').appendTo("body"); 
            $.ajax({
                url: 'Contratos/getduracao',
                type: 'post',
                data: {contrato:row.id_contrato},
                datatype:'json',
                
                success: function(resultado){
                    if(resultado!=null){
                        var split = $(resultado).get(-1)["termino"].split('-');
                        var inicio = new Date(split[0], split[1]-1, parseInt(split[2])+1, 0,0,0,0);
                        $('input[name="inicio"]')[0].valueAsDate = inicio;
                        var duracao=row.duracao;
                        //alert(duracao);
                        var tempoestagio=row.tempodeestagio;
                        //alert(tempoestagio);
                       if((parseInt(duracao)+parseInt(tempoestagio))>24){
                            duracao=24-parseInt(tempoestagio);
                        }
                        //alert(duracao);
                         var inicio = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2])+1, 0,0,0,0);
                        $('input[name="termino"]')[0].valueAsDate = inicio;

                        var medidor_relatorio=6;
                        if(parseInt(duracao)<6){
                            medidor_relatorio=parseInt(duracao);
                        }

                        var relatorio = new Date(split[0], split[1]-1+medidor_relatorio, parseInt(split[2])+1, 0,0,0,0);
                        $('input[name="relatorio"]')[0].valueAsDate = relatorio;
                    }
                }
            });

            $('input[name="inicio"]').blur(function(){
                var ultimotermino;
                event.preventDefault();
                $.ajax({
                    url: 'Contratos/getduracao',
                    type: 'post',
                    data: {contrato:row.id_contrato},
                    datatype:'json',
                    error:function(result){
                        var inicio=$('input[name="inicio"]').val();
                        var split = inicio.split('-');
                        var duracao=$('input[name="duracao"]').val();
                        var tempoestagio=row.tempodeestagio;

                        if(parseInt(duracao)+parseInt(tempoestagio)>24){
                            duracao=24-parseInt(tempoestagio);
                        }

                        var termino = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2]), 0,0,0,0);
                        $('input[name="termino"]')[0].valueAsDate = termino;
                        //var relatorio = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2]), 0,0,0,0);
                        $('input[name="relatorio"]')[0].valueAsDate = termino;
                    },
                    success: function(resultado){
                            var split = $(resultado).get(-1)["termino"].split('-');
                            ultimotermino = new Date(split[0], split[1]-1, parseInt(split[2]), 0,0,0,0);

                            var inicio=$('input[name="inicio"]').val();
                            var split = inicio.split('-'); 
                            var inicio = new Date(split[0], split[1]-1, parseInt(split[2]), 0,0,0,0);

                            if(ultimotermino<inicio){
                                var duracao=row.duracao;
                                var tempoestagio=row.tempodeestagio;
                    
                                if(parseInt(duracao)+parseInt(tempoestagio)>24){
                                   duracao=24-parseInt(tempoestagio);
                                }

                                var termino = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2]), 0,0,0,0);
                                $('input[name="termino"]')[0].valueAsDate = termino;
                                //var relatorio = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2])+1, 0,0,0,0);
                                var medidor_relatorio=6;
                                if(parseInt(duracao)<6){
                                    medidor_relatorio=parseInt(duracao);
                                }

                                var relatorio = new Date(split[0], split[1]-1+medidor_relatorio, parseInt(split[2]), 0,0,0,0);
                                $('input[name="relatorio"]')[0].valueAsDate = relatorio;

                            }
                            else{
                                $('input[name="inicio"]').val('');
                                $('input[name="termino"]').val('');
                                $('input[name="relatorio"]').val('');
                                sweetAlert("Utilize uma data de início compatível com o histórico do contrato","error");
                                // swal({
                                //     title: "Utilize uma data de inicio compativel com o historico de contratos!",
                                //     type: "success",
                                //     confirmButtonText: "OK",
                                //     confirmButtonColor: "#2F3233"
                                // });
                                //alert('Utilize uma data de inicio compativel com o historico de contratos!');
                            }
                    }
                });

            });


            $('input[name="termino"]').blur(function(){

                var termino = $(this).val();
                var split = termino.split('-');
                var tomorrow = new Date(split[0], split[1]-1, parseInt(split[2])+1, 0,0,0,0);
                
                var inicio=$('input[name="inicio"]').val();
                var split = inicio.split('-');
                var inicio = new Date(split[0], split[1]-1, parseInt(split[2])+1, 0,0,0,0);
            
                if(inicio<tomorrow){
                        var duracao=row.duracao;
                        var medidor_relatorio=6;
                        if(parseInt(duracao)<6){
                            medidor_relatorio=parseInt(duracao);
                        }

                        var relatorio = new Date(split[0], split[1]-1+medidor_relatorio, parseInt(split[2]), 0,0,0,0);
                        $('input[name="relatorio"]')[0].valueAsDate = relatorio;
                    
                }else{
                    $('input[name="termino"]').val('');
                    sweetAlert("O termino deve ser após o início do contrato","error");
                    // swal({
                    //     title: "O termino deve ser após o início do contrato!",
                    //     type: "success",
                    //     confirmButtonText: "OK",
                    //     confirmButtonColor: "#2F3233"
                    // });
                    //alert("O termino deve ser depois do inicio do contrato!");
                }  
            });
            
            $('#form-renovar').submit(function(){
                //alert('renovar');
                event.preventDefault();
                $.ajax({
                    url: 'contratos/addduracao',
                    type: 'post',
                    data: $('#form-renovar').serialize()+"&contrato="+row.id_contrato+"&academico="+row.matricula,
                    success:function(resultado){
                        //alert(JSON.stringify(resultado));
                        switch(resultado){
                            case 1:
                                swal({
                                    title: "Tempo de estágio máximo excedido, operação abortada",
                                    type: "success",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#2F3233"
                                });
                                //alert("Tempo de estagio maximo excedido, operação abortada");

                                setTimeout(function(){
                                    location.reload()
                                },1500);
                            break; 
                            default:
                             setTimeout(function(){
                                    location.reload()
                                },1500);
                            break;
                        }

                    }
                        
                });
            });

        }

    }

    

    window.evento_link_contrato = {
        'click a': function(e, x, y, z){
            window.location.href = "contrato/" + y.id_contrato;
        }
    }

    // Formato e Evento da coluna ID Estágio
    function formato_estagio(value, r, i){
        return '<a>' + value + '</a>';
    }

    window.evento_link_estagio = {
        'click a': function(e, x, y, z){
            window.location.href = "estagio/" + y.historico;
        }
    }

    // Formato e Evento da coluna Nome do aluno
    function formato_aluno(value, r, i){
        return '<a>' + value + '</a>';
    }

    window.evento_link_aluno = {
        'click a': function(e, x, y, z){
            window.location.href = "academico/" + y.matricula;
        }
    }

    // Formato e Evento da coluna Área
    function formato_area(value, r, i){
        var retorno='';
    x=0;
    while(value[x]!=null){
        retorno+=('<a href="area/'+value[x].id+'" target="_blank">'+value[x].nome+'</a>');
        if(value[x+1]!=null){
            retorno+=', ';
        }
        x++;
    }
    return retorno;
    }

    window.evento_link_area = {
        'click a': function(e, x, y, z){
            window.location.href = "area/" + y.id_area;
        }
    }

    // Formato e Evento da coluna Supervisor
    function formato_supervisor(value, r, i){
        return '<a>' + value + '</a>';
    }

    window.evento_link_supervisor = {
        'click a': function(e, x, y, z){
            window.location.href = "supervisor/" + y.usuario_sup_login;
        }
    }

    // Formato e Evento da coluna Unidade
    function formato_unidade(value, r, i){
        return '<a>' + value + '</a>';
    }

    window.evento_link_unidade = {
        'click a': function(e, x, y, z){
            window.location.href = "unidades/" + y.id_unidade;
        }
    }

    // Formato e Evento da coluna Setor
    function formato_setor(value, r, i){
        return '<a>' + value + '</a>';
    }

    window.evento_link_setor = {
        'click a': function(e, x, y, z){
            window.location.href = "setores/" + y.id_setor;
        }
    }

    /*---------------------------------------------------------------------------------------------*/

    // DOM
    $(document).ready(function(){

   


       
        $('#tabelafrequencia').on('dbl-click-cell.bs.table', function (index, field, value, $element) {
            //console.log(field);
           // $('#tabelafrequencia').bootstrapTable.trigger('editable-init');
            
                       // index = $(this).parents('tr[data-index]').data('index'),
                        //row = data[index],
                        //oldValue = row[column.field];
                       // console.log(data);
                        //var split = column.field.split('.');
                    //row[column.field] = {notificacao:row[split[0]][split[1]][split[2]]['notificacao'],inf:params.submitValue};
                   // this.trigger('editable-save', column.field, row, oldValue, $(this));

            if(value){
                

                var split = field.split('.');
                $('#modalnotif').modal('show');

                $('#modalnotif').appendTo("body"); 
                $('#datasnotificacao').html("<input type='hidden' value='"+$element['contrato']+"' name='contrato'><input type='hidden' value='"+split[0]+"' name='ano'><input type='hidden' value='"+split[1]+"' name='mes'><input type='hidden' value='"+split[2]+"' name='dia'>" );
                //console.log(teste);
                // alert(JSON.stringify($element));
                 //console.log($('#tabelafrequencia').bootstrapTable('getData'));
                 //console.log(field);
                 //console.log(index);
                 //console.log(value);
                 //console.log($element);
                 //$element[split[0]][split[1]][split[2]+'n']='gdfsgsdf';
                 //console.log($element[split[0]][split[1]][split[2]+'n']);
                 
                $('#titlenotificacao').text("Notificação do dia "+split[2]+"/"+split[1]+"/"+split[0]);
                 $('#notiftext').val(value['notificacao']);

                $('#salvarnotificacao').click(function(){
                    //var split = field.split('.');
                    
                    var data = $('#tabelafrequencia').bootstrapTable('getData');
                    //console.log(data);
                    for(i=0;i<data.length;i++){
                        if(typeof data[i]!=='undefined'){
                            if(typeof data[i][$('input[name="ano"]').val()]!=='undefined'){
                                if(typeof data[i][$('input[name="ano"]').val()][$('input[name="mes"]').val()]!=='undefined'){
                                    if(typeof data[i][$('input[name="ano"]').val()][$('input[name="mes"]').val()][$('input[name="dia"]').val()]!=='undefined' && data[i][$('input[name="ano"]').val()][$('input[name="mes"]').val()][$('input[name="dia"]').val()]!=''){
                                        if(typeof data[i][$('input[name="ano"]').val()][$('input[name="mes"]').val()][$('input[name="dia"]').val()]['notificacao']!=='undefined'){
                                            if(data[i][$('input[name="ano"]').val()][$('input[name="mes"]').val()][$('input[name="dia"]').val()]['notificacao']==value['notificacao']){
                                                data[i][$('input[name="ano"]').val()][$('input[name="mes"]').val()][$('input[name="dia"]').val()]['notificacao']=$('#notiftext').val();
                                                //alert($('input[name="ano"]').val()+'.'+$('input[name="mes"]').val()+'.'+$('input[name="dia"]').val());
                                                $test=$('input[name="ano"]').val()+'.'+$('input[name="mes"]').val()+'.'+$('input[name="dia"]').val();
                                                //console.log(data);
                                                //alert('teste='+data[i][$test]);
                                                if(typeof data[i][$test]!=='undefined'){
                                                    data[i][$test]['notificacao']=$('#notiftext').val();
                                                }
                                                //alert('23424');
                                                

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $('#tabelafrequencia').bootstrapTable('showLoading');

                    $('#tabelafrequencia').bootstrapTable('load', data);
                    $('#tabelafrequencia').bootstrapTable('hideLoading');
                    event.preventDefault();
                    $.ajax({
                        url: 'contratos/salvarnotificacao',
                        type: 'post',
                        data: {ano:split[0],mes:split[1],dia:split[2],contrato:$element['contrato'],notificacao:$('#notiftext').val()}//,//$('#form-notificacao').serialize,
                        //success:function(resultado){
                            
                                    //alert(JSON.stringify(resultado));
                                    //alert(JSON.stringify($('#notiftext').val()));
                                    
                        //}
                    });
                    
                });

            }
            // console.log(teste);
            // console.log(teste2);
            // console.log(teste3);
            // console.log(teste4);
        });

        
        
                // Carrega as linhas da tabela
        $.ajax({
            url: "Contratos/getContratos",
            type: "POST",
            dataType: "JSON",
            success: function(retorno){
                //console.log(retorno);
                $('#tabela_contratos').bootstrapTable('load', retorno);
            }
        });

        $('#buscarfrequencia').click(function(){
            //alert(JSON.stringify($('#form-frequencia').serialize().length));
            if($('#form-frequencia').serialize().length>0){
                
                $.ajax({
                    url: "Contratos/getfrequenciasgeral",
                    type: "POST",
                    dataType: "json",
                    //data:"freq="+freq,//$('#form-frequencia').serialize()+"&id_contrato="+$('input[name="contrato_id"]').val(),// {id_contrato: $('input[name="contrato_id"]').val(),ano:$('select[name="anofrequenciamodal"]').val()},

                    data: $('#form-frequencia').serialize()+"&freq="+freq,
                    success: function(retorno){
                        
                         var colum=retorno['estrutura'];
                         var corpo=retorno['valores']
                         //console.log(corpo);
                        $('#tabelafrequencia').bootstrapTable('destroy').bootstrapTable({columns:colum,data:corpo,exportTypes:['excel'],exportOptions:{fileName:'Frequencia Geral'}  });
                        
                
                    }

                });
            }//else if(){}
            //&& $('#form-frequencia').serialize().length>23){

            //$('#tabelafrequencia').bootstrapTable('showLoading');
            
        });

        $('#buscarfrequencia2').click(function(){
            //alert(JSON.stringify($('#form-frequencia-data').serialize().length));
            // if($('#form-frequencia').serialize().length>0){
                
                $.ajax({
                    url: "Contratos/getfrequenciasgeral",
                    type: "POST",
                    dataType: "json",
                    //data:$('#form-frequencia-data').serialize(),// {id_contrato: $('input[name="contrato_id"]').val(),ano:$('select[name="anofrequenciamodal"]').val()},

                    data: $('#form-frequencia-data').serialize()+"&freq="+freq,
                    success: function(retorno){
                        //console.log(retorno);
                         var colum=retorno['estrutura'];
                         var corpo=retorno['valores']

                        $('#tabelafrequencia').bootstrapTable('destroy').bootstrapTable({columns:colum,data:corpo,exportTypes:['excel'],exportOptions:{fileName:'Frequencia Geral'}  });
                        
                    }
                });
                       
        });


        $('#buscarfreqdata').click(function(){
            $('#modaldata').appendTo("body");
            $.ajax({

                    url: 'contratos/getAnoFrequenciageral',
                    type: 'POST',
                    dataType: 'json',
                    data:{freq:freq},
                    success: function(resultado){
                        var option = '<option value="0"></option>';
                        $.each(resultado, function(k, v){
                            option += '<option value="'+v.ano+'">'+v.ano+'</option>';
                        });
                        $('#divmeses2').html('');
                        $('select[name="anofrequenciamodal2"]').html(option).show();
                    }
            });
        });

        $('select[name="anofrequenciamodal2"]').change(function () {
            $.ajax({

                url: 'contratos/getmesFrequenciageral',
                type: 'POST',
                dataType: 'json',
                data: {ano:$('select[name="anofrequenciamodal2"]').val(),freq:freq},
                error:function(){$('#divmeses2').html('');},
                success: function(resultado){
                    //alert(JSON.stringify(resultado));
                    $('#divmeses2').html('');
                    var meses='';
                    $.each(resultado, function(k, v){
                        meses+='<div class="col-sm-6 col-xs-6"><label><input type="checkbox" name="'+v.mes+'" value="'+v.mes+'"> '+v.nome+' </label></div>'
                    });
                    $('#divmeses2').html(meses);
                }
            });

        });

         //$('.modal-trigger').leanModal();

        $('#buscarfreqnome').click(function(){
            $('#modalnome').appendTo("body"); 
            $('#frequenciaindividual').val('');
             $('select[name="contratosfrequencia"]').html('').show();
             $('select[name="anofrequenciamodal"]').html('').show();
             $('#divmeses').html('');
             //$('#modalnome').leanModal();
            var nome=[];
                //js para nome de academicos em frequencias
            $.ajax({
                url: 'contratos/nomesfrequencias',
                type: 'POST',
                datatype:'json',
                data:{freq:freq},
                success: function(result){
                    //console.log(result);
                     $.each(result, function(k, v){
                          nome.push(v);
                     });
                    console.log(nome);
                    $( "#frequenciaindividual" ).autocomplete({source: nome});
                }
            });
        });

        $( "#frequenciaindividual" ).blur(function(){
                if($( "#frequenciaindividual" ).val()!=''   ){
                    $.ajax({
                        url: 'Contratos/contratospornomefrequencias',
                        type: 'post',
                        data: {nome:$( "#frequenciaindividual").val(),freq:freq},
                        datatype:'json',
                        success: function(resultado){
                            var option;//= '<option value="0"></option>';
                            $.each(resultado, function(k, v){
                                option += '<option value="'+v.id+'">'+v.id+'</option>';
                            });
                            $('#divmeses2').html('');
                            $('select[name="contratosfrequencia"]').html(option).show();

                            $.ajax({

                                url: 'contratos/getAnoFrequencia',
                                type: 'POST',
                                dataType: 'json',
                                data: {id_contrato: $('select[name="contratosfrequencia"]').val()},
                                success: function(resultado){
                                    var option = '<option value="0"></option>';
                                    $.each(resultado, function(k, v){
                                        option += '<option value="'+v.ano+'">'+v.ano+'</option>';
                                    });
                                    $('#divmeses').html('');
                                    $('select[name="anofrequenciamodal"]').html(option).show();
                                }
                            });

                        }                        
                    });
                }
            });




        

        $('select[name="contratosfrequencia"]').change(function (){

            $.ajax({

                    url: 'contratos/getAnoFrequencia',
                    type: 'POST',
                    dataType: 'json',
                    data: {id_contrato: $('select[name="contratosfrequencia"]').val()},
                    success: function(resultado){
                        var option = '<option value="0"></option>';
                        $.each(resultado, function(k, v){
                            option += '<option value="'+v.ano+'">'+v.ano+'</option>';
                        });
                        $('#divmeses').html('');
                        $('select[name="anofrequenciamodal"]').html(option).show();
                    }
                });

        });

        $('select[name="anofrequenciamodal"]').change(function () {
            $.ajax({

                url: 'contratos/getmesFrequencia',
                type: 'POST',
                dataType: 'json',
                data: {id_contrato: $('select[name="contratosfrequencia"]').val(),ano:$('select[name="anofrequenciamodal"]').val()},
                error:function(){$('#divmeses').html('');},
                success: function(resultado){
                    //alert(JSON.stringify(resultado));
                    var meses='';
                    $.each(resultado, function(k, v){
                        meses+='<div class="col-sm-6 col-xs-6"><label><input type="checkbox" name="'+v.mes+'" value="'+v.mes+'"> '+v.nome+' </label></div>'
                    });
                    $('#divmeses').html(meses);
                }
            });

        });
           
         

        $('#frequencias').click(function(){

            $.ajax({
            url: "Contratos/getfrequenciasgeral",
            type: "POST",
            dataType: "json",
            success: function(retorno){
                 var colum=retorno['estrutura'];
                 var corpo=retorno['valores']
                // var arr = Object.keys(retorno).map(function(k) { return retorno[k] });
                //console.log(retorno);
                //alert(JSON.stringify(retorno));
                //var arr = $.map(retorno, function(el) { return el; })
                $('#tabelafrequencia').bootstrapTable('destroy').bootstrapTable({columns:colum,data:corpo,exportTypes:['excel'],exportOptions:{fileName:'Frequencia Geral'}  });
                
                //$('#myModal1').modal('show');

                // $('#tabelafrequencia').tableExport({
                //   type: 'excel',
                //   escape: false
                // });

                
            }

            });

        });
        var freq=1;
        $('#buscarfreqativos').click(function(){
            freq=1;
            $('#frequenciaindividual').val('');
            $('#buscarfreqativos').removeClass('btn-primary');
            $('#buscarfreqativos').addClass('btn-success');
            $('#buscarfreqdesativos').removeClass('btn-success');
            $('#buscarfreqdesativos').addClass('btn btn-primary');
            $('#buscarfreqgeral').removeClass('btn-success');
            $('#buscarfreqgeral').addClass('btn-primary');
        });

        $('#buscarfreqdesativos').click(function(){
            freq=2;
            $('#frequenciaindividual').val('');
            $('#buscarfreqativos').removeClass('btn-success');
            $('#buscarfreqativos').addClass('btn-primary');
            $('#buscarfreqdesativos').removeClass('btn-primary');
            $('#buscarfreqdesativos').addClass('btn btn-success');
            $('#buscarfreqgeral').removeClass('btn-success');
            $('#buscarfreqgeral').addClass('btn-primary');});


        $('#buscarfreqgeral').click(function(){
            freq=3;
            $('#frequenciaindividual').val('');
            $('#buscarfreqativos').removeClass('btn-success');
            $('#buscarfreqativos').addClass('btn-primary');
            $('#buscarfreqdesativos').removeClass('btn-success');
            $('#buscarfreqdesativos').addClass('btn btn-primary');
            $('#buscarfreqgeral').removeClass('btn-primary');
            $('#buscarfreqgeral').addClass('btn-success');});


        // Manipulação de informações da tabela de Contratos
        $('#show_mais_dados').click(function(){

            // Se o botão é de mostrar mais dados
            if($('#show_mais_dados').attr('value') == 'Mostrar mais dados'){

                // Muda o nome do botão
                $('#show_mais_dados').attr('value', 'Mostrar menos dados');
                $('#show_mais_dados').blur();

                // Mostra as colunas escondidas
                $('#tabela_contratos').bootstrapTable('showColumn', 'nome_area');
                $('#tabela_contratos').bootstrapTable('showColumn', 'nome_unidade');
                $('#tabela_contratos').bootstrapTable('showColumn', 'nome_setor');
                $('#tabela_contratos').bootstrapTable('showColumn', 'previsao_formatura');                
                $('#tabela_contratos').bootstrapTable('showColumn', 'nome_orientador');

            }

            // Se o botão é de mostrar menos dados
            else if($('#show_mais_dados').attr('value') == 'Mostrar menos dados'){

                // Muda o nome do botão
                $('#show_mais_dados').attr('value', 'Mostrar mais dados');
                $('#show_mais_dados').blur();


                // Esconde algumas colunas
                $('#tabela_contratos').bootstrapTable('hideColumn', 'nome_area');
                $('#tabela_contratos').bootstrapTable('hideColumn', 'nome_unidade');
                $('#tabela_contratos').bootstrapTable('hideColumn', 'nome_setor');
                $('#tabela_contratos').bootstrapTable('hideColumn', 'previsao_formatura');
                $('#tabela_contratos').bootstrapTable('hideColumn', 'nome_orientador');

            }

        });

        $('#tabelafrequencia').on('editable-save.bs.table', function(e,field, row, oldValue, $el){
            //console.log(field);
            //console.log(e);
            //console.log(row[field]);

            //console.log($el);
            //console.log(oldValue);
            var split = field.split('.');
            //alert(split[0]);
            $.ajax({
                url: 'Contratos/altfrequencia',
                type: 'POST',
                data: {contrato:row.contrato,ano:split[0],mes:split[1],dia:split[2],valor:row[field]['inf']},
                
                success: function(resultado){
                    if(resultado!=1){alert('Erro ao salvar modificação');}
                }
            });
        });

        // MODIFICAÇÕES NO JS DA TABELA, ALTAMENTE INCOMPREENSIVEL, N FUÇAR

!function ($) {

    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        editable: true,
        onEditableInit: function () {
            return false;
        },
        onEditableSave: function (field, row, oldValue, $el) {
            return false;
        },
        onEditableShown: function (field, row, $el, editable) {
            return false;
        },
        onEditableHidden: function (field, row, $el, reason) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'editable-init.bs.table': 'onEditableInit',
        'editable-save.bs.table': 'onEditableSave',
        'editable-save2.bs.table': 'onEditableSave2',
        'editable-shown.bs.table': 'onEditableShown',
        'editable-hidden.bs.table': 'onEditableHidden'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable,
        _initBody = BootstrapTable.prototype.initBody;

    BootstrapTable.prototype.initTable = function () {
        var that = this;
        _initTable.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function (i, column) {
            if (!column.editable) {
                return;
            }

            var _formatter = column.formatter;
            column.formatter = function (value, row, index) {
               // console.log(value);
               if (typeof value!== 'undefined'){ 
                    if(value.length!=0){
                        if (value['notificacao']!=''){
                            return ['<i class="glyphicon glyphicon-star"></i><a href="javascript:void(0)"',
                                ' data-name="' + column.field + '"',
                                ' data-pk="' + row[that.options.idField] + '"',
                                ' data-value="' + value['inf']+ '"',
                                '>' + '</a>'].join('');
                        }else{ 
                            return ['<a href="javascript:void(0)"',
                                ' data-name="' + column.field + '"',
                                ' data-pk="' + row[that.options.idField] + '"',
                                ' data-value="' + value['inf']+ '"',
                                '>' + '</a>'
                            ].join('');
                        }
                    }else{
                        return ' ';
                    }
                }
            };
        });
    };

    BootstrapTable.prototype.initBody = function () {
        var that = this;
        _initBody.apply(this, Array.prototype.slice.apply(arguments));
        //console.log(this);
        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function (i, column) {
            if (!column.editable) {
                return;
            }

            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('save2').on('save2', function (e, params) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index],
                        oldValue = row[column.field];
                        var split = column.field.split('.');
                        if(row[split[0]][split[1]][split[2]]['notificacao']){
                            row[column.field] = {notificacao:row[split[0]][split[1]][split[2]]['notificacao'],inf:params.submitValue};

                        }else{
                            row[column.field] = {notificacao:null,inf:params.submitValue};
                        }

                    that.trigger('editable-save', column.field, row, oldValue, $(this));
                });

            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('save').on('save', function (e, params) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index],
                        oldValue = row[column.field];
                        //console.log(params);
                        var split = column.field.split('.');
                    row[column.field] = {notificacao:row[split[0]][split[1]][split[2]]['notificacao'],inf:params.submitValue};
                    that.trigger('editable-save', column.field, row, oldValue, $(this));
                });

            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('shown').on('shown', function (e, editable) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];
                    that.trigger('editable-shown', column.field, row, $(this), editable);
                });

            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('hidden').on('hidden', function (e, reason) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];
                    that.trigger('editable-hidden', column.field, row, $(this), reason);
                });
        });
        this.trigger('editable-init');
    };

}(jQuery);









$.fn.editable.defaults.mode = 'inline';

// var data = [{name: 'John', stargazers_count: 232, forks_count: 214, description:{um:'asdf',dois:'fsdf'}},
//            {name: 'Craig', stargazers_count: 234, forks_count: 224, description:{um:'asdf',dois:'fsdf'}},
//            {name: 'Barry', stargazers_count: 238, forks_count: 234, description:{um:'asdf',dois:'fsdf'}}]

// $('table').bootstrapTable({
//     data: data,
//     sortable: true,
//     editable: true
// });


    });


