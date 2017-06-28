function getTableHeight() {
    var offsetTop = $("#tabelafrequencia").offset().top; //posicion donde empieza la tabla.
    //Quiero que la tabla ocupe desde q empieza hasta el final de la pantalla
    var restoPantalla = $(window).height() - offsetTop; 
    return restoPantalla;
}


function valores(valores,estrutura,nome){
    var corpo=[];
    corpo['nome']=nome;
    $.each(estrutura, function(k, v){
        corpo[''+v.anos]=[];
        $.each(v.mes, function(k1, v1){
            corpo[''+v.anos][v1.mes]=[];
            $.each(v1.dia, function(k2, v2){
                corpo[''+v.anos][v1.mes][v2.dia]='';
            });  
        });
    });

     for(i=0;i<valores.length;i++){
        //console.log(valores[i].ano);
        if(valores[i].informacao){
            corpo[valores[i].ano][valores[i].mes][valores[i].dia]=valores[i].informacao;
        }
     }
     return corpo
   //return corpo;
}

    

function columns(estrutura){
    var colunas=[];
    var colunas1=[];
    var colunas2=[];
    colunas.push({field:'nome',title:'nome',rowspan:3,class:'fixed-col-widths',colspan:1,valign:'middle',halign:'center'});
    $.each(estrutura, function(k, v){
        //if(v.anos% 2 == 0){
          //  colunas.push({field:v.anos,title:v.anos,class:'col-gray',rowspan:1,titleTooltip:v.anos,colspan:v.conta,valign:'middle',halign:'center'});
        //}else{
            colunas.push({field:v.anos,title:v.anos,rowspan:1,titleTooltip:v.anos,colspan:v.conta,valign:'middle',halign:'center'});
        //}
    });
    $.each(estrutura, function(k, v){
        $.each(v.mes, function(k1, v1){
            if(v1.mes% 2 == 0){
                colunas1.push({field:v.anos+'.'+v1.mes,title:v1.nome,class:'col-gray',titleTooltip:v1.nome,rowspan:1,colspan:v1.dia.length,valign:'middle',halign:'center'});
            }else{
                colunas1.push({field:v.anos+'.'+v1.mes,title:v1.nome,titleTooltip:v1.nome,rowspan:1,colspan:v1.dia.length,valign:'middle',halign:'center'});
            }
        });
    });
    $.each(estrutura, function(k, v){
        $.each(v.mes, function(k1, v1){
            $.each(v1.dia, function(k2, v2){
                colunas2.push({field:v.anos+'.'+v1.mes+'.'+v2.dia,titleTooltip:v.anos+'/'+v1.mes+'/'+v2.dia,rowspan:1,editable:true,class:'fixed-col-widths-dats',colspan:1,title:v2.dia+'°',width:500,halign:'center',align:'center',valign:'middle'});
            });
        });
    });
    //alert(JSON.stringify(new Array(colunas,colunas1,colunas2)));
    return new Array(colunas,colunas1,colunas2);
}

$(document).ready(function(){
    
    $.ajax({
            url: '../Contratos/getduracao',
            type: 'post',
            data: {contrato:$('input[name="contrato_id"]').val()},
            datatype:'json',
            
            success: function(resultado){
                //se n tiver entregue documentos ou tiver cumprido 24 meses de estagio o botao de renovação é removido
                //alert($('input[name="datadesligamento"]').val());
                if(($('#documentos').val()==0)||($('input[name="tempoestagio"]').val()==24 ) || $('input[name="datadesligamento"]').val() ){
                    if($('input[name="datadesligamento"]').val()){
                        $('#modalfinalizar').attr("type","hidden");
                    }
                    $('#prorrogar').attr("type","hidden");
                }
                
                
                var formatura=$('input[name="formatura"]').val();
                var split = formatura.split('-');
                var forma = new Date(split[0], split[1]-1, parseInt(split[2]), 0,0,0,0); 

                var atual=new Date();

                var termino=$(resultado).get(-1)["termino"];
                var split = termino.split('-');
                var termi = new Date(split[0], split[1]-1, parseInt(split[2]), 0,0,0,0);

                var tempoestagio=$('input[name="tempoestagio"]').val();
                var desligamento=$('input[name="datadesligamento"]').val();
                // alert("atual= "+atual+"formatura= "+forma+" termino="+termi);
                // alert(!desligamento);
                // alert(forma<atual);
                if(formatura=='' || (forma<atual && !desligamento) || (termi<atual && !desligamento && tempoestagio==24) ){
                    $('#divalert').css("display","block");}
                 else{
                    if(termi<atual && !desligamento){
                        $('#divalert2').css("display","block");
                    }
                }
            },
            error:function(resultado){
                $('#prorrogar').attr("value","Iniciar Contrato");
                if($('input[name="datadesligamento"]').val() ){
                    $('#prorrogar').attr("type","hidden");
                    
                }
            }
        });

    var nome=[];

    $('#tabelafrequencia').on('editable-save.bs.table', function(e,field, row, oldValue, $el){
        var split = field.split('.');
        //alert(split[0]);
        $.ajax({
            url: '../Contratos/altfrequencia',
            type: 'POST',
            data: {contrato:$('input[name="contrato_id"]').val(),ano:split[0],mes:split[1],dia:split[2],valor:row[field]},
            
            success: function(resultado){
                if(resultado!=1){
                    sweetAlert("Erro ao salvar modificação!","error");
                   // alert('Erro ao salvar modificação');
                }
            }
        });
    });

    $("input[name='orientador']").blur(function(){
        if( $.inArray($(this).val(), nome) !== -1 ){
           $('#div_orientador').removeClass('has-error'); 
           $('#div_orientador').addClass('has-success');
        }else{
           $('#div_orientador').removeClass('has-success'); 
           $('#div_orientador').addClass('has-error');
           $("input[name='orientador']").val('');
        };
    });


    $('#prorrogar').click(function(){
       //event.preventDefault();
       $('#myModal3').appendTo("body"); 
        $.ajax({
            url: '../Contratos/getduracao',
            type: 'post',
            data: {contrato:$('input[name="contrato_id"]').val()},
            datatype:'json',
            
            success: function(resultado){
                if(resultado!=null){
                var split = $(resultado).get(-1)["termino"].split('-');
                var inicio = new Date(split[0], split[1]-1, parseInt(split[2])+1, 0,0,0,0);
                $('input[name="inicio"]')[0].valueAsDate = inicio;
                var duracao=$('input[name="duracao"]').val();
                //alert(duracao);
                var tempoestagio=$('input[name="tempoestagio"]').val();
                //alert(tempoestagio);
               if((parseInt(duracao)+parseInt(tempoestagio))>24){
                    duracao=24-parseInt(tempoestagio);
                }
                //alert(duracao);
                 var inicio = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2])+1, 0,0,0,0);
                $('input[name="termino"]')[0].valueAsDate = inicio;

                var medidor_relatorio=6;
                if(duracao<6){
                    medidor_relatorio=duracao;
                }

                var relatorio = new Date(split[0], split[1]-1+medidor_relatorio, parseInt(split[2])+1, 0,0,0,0);
                $('input[name="relatorio"]')[0].valueAsDate = relatorio;
                // var inicio = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2])+2, 0,0,0,0);
                // $('input[name="relatorio"]')[0].valueAsDate = inicio;
            }
            }
        });
        //return false;
    });

    $('#modalfinalizar').click(function(){
        $.ajax({
            url: '../Contratos/getduracao',
            type: 'post',
            data: {contrato:$('input[name="contrato_id"]').val()},
            datatype:'json',
            success: function(resultado){
                $('#myModal4').appendTo("body");
                $('input[name="datadesligamentomodal"]').val($(resultado).get(-1)["termino"]);
            }
        });
    });

    $('input[name="inicio"]').blur(function(){
        var ultimotermino;
        event.preventDefault();
        $.ajax({
            url: '../Contratos/getduracao',
            type: 'post',
            data: {contrato:$('input[name="contrato_id"]').val()},
            datatype:'json',
            error:function(result){
                var inicio=$('input[name="inicio"]').val();
                var split = inicio.split('-');
                var duracao=$('input[name="duracao"]').val();
                var tempoestagio=$('input[name="tempoestagio"]').val();

                if(parseInt(duracao)+parseInt(tempoestagio)>24){
                    duracao=24-parseInt(tempoestagio);
                }

                var termino = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2]), 0,0,0,0);
                $('input[name="termino"]')[0].valueAsDate = termino;
                //var relatorio = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2])+1, 0,0,0,0);
                $('input[name="relatorio"]')[0].valueAsDate = termino;
            },
            success: function(resultado){
                    var split = $(resultado).get(-1)["termino"].split('-');
                    ultimotermino = new Date(split[0], split[1]-1, parseInt(split[2]), 0,0,0,0);

                    var inicio=$('input[name="inicio"]').val();
                    var split = inicio.split('-'); 
                    var inicio = new Date(split[0], split[1]-1, parseInt(split[2]), 0,0,0,0);

                    if(ultimotermino<inicio){
                        var duracao=$('input[name="duracao"]').val();
                        var tempoestagio=$('input[name="tempoestagio"]').val();
                
                        if(parseInt(duracao)+parseInt(tempoestagio)>24){
                           duracao=24-parseInt(tempoestagio);
                        }

                        var termino = new Date(split[0], split[1]-1+parseInt(duracao), parseInt(split[2]), 0,0,0,0);
                        $('input[name="termino"]')[0].valueAsDate = termino;

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
                        sweetAlert("Utilize uma data de inicio compativel com o historico de contratos!","error");
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

            var duracao=$('input[name="duracao"]').val();
            var medidor_relatorio=6;
            if(parseInt(duracao)<6){
                medidor_relatorio=parseInt(duracao);
            }

            var relatorio = new Date(split[0], split[1]-1+medidor_relatorio, parseInt(split[2]), 0,0,0,0);
            
            $('input[name="relatorio"]')[0].valueAsDate = relatorio;
            
            if($('input[name="formatura"]').val()!=''){
                var formatura=$('input[name="formatura"]').val();
                var split = formatura.split('-');
                var forma = new Date(split[0], split[1]-1, parseInt(split[2])+1, 0,0,0,0);
                if(forma<tomorrow){
                    $('#terminolimite').css("display","inline");
                }
            }
        }else{
            $('input[name="termino"]').val('');
            sweetAlert("O termino deve ser depois do inicio do contrato!","error");
            //alert("O termino deve ser depois do inicio do contrato!");
        }  
    });

    $('#form-contrato').submit(function(){
        event.preventDefault();
        $.ajax({
            url: '../contratos/alterarcontrato',
            type: 'post',
            daatype:'json',
            data: $(this).serialize()+"&contrato="+$('input[name="contrato_id"]').val(),
            success:function(resultado){
               switch(resultado){
                    case 1:
                        swal({
                                title: "Dados alterados com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //alert("dados alterados com sucesso");

                        setTimeout(function(){
                            location.reload()
                        },100);
                    break; 
                    default:
                        sweetAlert("Dados não foram alterados!","error");
                        //alert("dados não foram alterados");
                     setTimeout(function(){
                            location.reload()
                        },100);
                    break;
                }
            }
        });
    });

    
    $('button[name="distincao"]').click(function(){
        
        var id=$(this).val();
        $('#form_alterar_duracao').submit(function(){
            //event.preventDefault();
            $.ajax({
                url: '../contratos/altduracao',
                type: 'post',
                data: $(this).serialize()+"&idduracao="+id+"&matricula="+$('input[name="matricula"]').val()+"&contrato="+$('input[name="contrato_id"]').val(),
                success:function(resultado){
                    //alert(JSON.stringify(resultado));
                    switch(resultado){

                        case 1:
                            swal({
                                title: "Dados alterados com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                            //alert("dados alterados com sucesso");
                        break; 
                        default:
                            sweetAlert("Dados não foram alterados!","error");
                            //alert("dados não foram alterados");
                        break;
                    }
                }
            });
            return false;
        });
    });

    $('#form-finalizar').submit(function(){
        event.preventDefault();
        $.ajax({
            url: '../contratos/finalizarcontrato',
            type: 'post',
            data: $('#form-finalizar').serialize()+"&contrato="+$('input[name="contrato_id"]').val()+"&estagio="+$('input[name="estagio"]').val(),
            success:function(resultado){

                //alert(JSON.stringify(resultado));

                switch(resultado){
                    case 1:
                        swal({
                                title: "Contrato finalizado!",
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
                        sweetAlert("Contrato não finalizado!","error");
                        //alert("Contrato não finalizado");
                     setTimeout(function(){
                            location.reload()
                        },1500);
                    break;
                }
            }
        });
    });

    $('#form-duracao').submit(function(){
        $('#submitformduracao').prop('disabled', true);
        swal({
                title: "Processo em andamento, aguarde atualização da página!"
            });
        $.ajax({
            url: '../contratos/addduracao',
            type: 'post',
            data: $('#form-duracao').serialize()+"&contrato="+$('input[name="contrato_id"]').val()+"&academico="+$('input[name="matricula"]').val(),
            success:function(resultado){
                //alert(JSON.stringify(resultado));
                switch(resultado){
                    case 1:
                        sweetAlert("Tempo de estagio maximo excedido, operação abortada!","error");
                       //alert("Tempo de estagio maximo excedido, operação abortada");

                        setTimeout(function(){
                            location.reload()
                        },3500);
                    break; 
                    case 2:
                    swal({
                        title: "Contrato prorrogado!",
                        type: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#2F3233"
                    });
                     setTimeout(function(){
                            location.reload()
                        },3500);
                    break;
                }

            }
            
    });
        return false;
 });

    $('button[name="buttonremoveduracao"]').click(function(){
        var id=$(this).val();
        //event.preventDefault();
        //alert('1233');
        swal({
                title: "Deseja realmente excluir? Essa ação é irreversivel!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                swal({
                        title: "Exclusão em andamento, aguarde atualização da página!"
                    });
                $.ajax({
                    url: '../contratos/removerduracao',
                    type: 'post',
                    data: "id="+id+"&contrato="+$('input[name="contrato_id"]').val()+"&academico="+$('input[name="matricula"]').val(),
                    success:function(resultado){
                        //alert('1233');

                        window.setTimeout('location.reload()', 500);
                    }
                    
                })
            });
        return false;
    });

    $('#recibo').click(function(){

        var contrato=$('input[name="contrato_id"]').val();
        event.preventDefault();
        $.ajax({
            url: '../Contratos/comprovarrecibo',
            type: 'post',
            data: {contrato},
        
            success: function(resultado){
                swal({
                    title: "Termo de contrato, plano de atividades e declaração considerados entregues pelo estagiário!",
                    type: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2F3233"
                            });
                //alert('Termo de contrato, plano de atividades e declaração considerados entregues pelo estagiario');
                window.setTimeout('location.reload()', 500);
            },
        });
    });

    $('#linkarea').click(function(){
        if (($('select[name="Area"]').val()!="") && ($('select[name="Area"]').val()!=null)){
        window.open('../area/'+$('select[name="Area"]').val(),'_blank');}
    });

    $('#declaracao').click(function(){
        window.open('../contratos/declaracao/'+$('input[name="contrato_id"]').val());
    });

    $('#termo').click(function(){
        window.open('../contratos/termo/'+$('input[name="contrato_id"]').val());
    });

    $('#prorrogacao').click(function(){
        window.open('../contratos/prorrogacao/'+$('input[name="contrato_id"]').val());
    });
    
    $('#plano').click(function(){
        window.open('../contratos/plano/'+$('input[name="contrato_id"]').val());
    });

    $('#form_academico').submit(function(){
        event.preventDefault();
        
        $.ajax({
            url: '../Usuarios/alteraracademico',
            type: 'post',
            data: $('#form_academico').serialize(),
            datatype:'json',
            success: function(resultado){
                
                switch(resultado){
                    case '1':
                        swal({
                                title: "Dados do aluno alterados com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        // $('#conteudo_modal').html('Dados do aluno alterados com sucesso!');
                        // $('#alert_modal').modal('show');

                    
                    break;
                    case '2':
                        sweetAlert("Dados não alterados!","error");
                        // $('#conteudo_modal').html('Dados não alterados!');
                        // $('#alert_modal').modal('show');

                    break;
                }

            }
        });
       
    });



    $('#botaosubmitestagio').css('display','none');
    $('#opcoesfrequencia').click(function(){
        $('#myModalopcoes').appendTo("body"); 
        $.ajax({

            url: '../contratos/getAnoFrequencia',
            type: 'POST',
            dataType: 'json',
            data: {id_contrato: $('input[name="contrato_id"]').val()},
            success: function(resultado){
                var option = '<option value="0"></option>';
                $.each(resultado, function(k, v){
                    option += '<option value="'+v.ano+'">'+v.ano+'</option>';
                });
                $('select[name="anofrequenciamodal"]').html(option).show();
                var meses='';
                $('#divmeses').html(meses);
                //var colum=columns(resultado['estrutura']);
                //var corpo=new Array(valores(resultado['valores'],resultado['estrutura'],resultado['nome']));
                // console.log(corpo);
                // console.log(JSON.stringify(colum));
                 //alert(JSON.stringify(resultado));

                //$('#tabelafrequencia').bootstrapTable('destroy').bootstrapTable({data:corpo,columns:colum});
                //$('#tabelafrequencia').bootstrapTable('load',corpo);
                //$('#tabelafrequencia').bootstrapTable('load', resultado);
            }
        });
    });

    $('select[name="anofrequenciamodal"]').change(function () {
        $.ajax({

            url: '../contratos/getmesFrequencia',
            type: 'POST',
            dataType: 'json',
            data: {id_contrato: $('input[name="contrato_id"]').val(),ano:$('select[name="anofrequenciamodal"]').val()},
             error:function(){$('#divmeses').html('');},
            success: function(resultado){
                //alert(JSON.stringify(resultado));
                var meses='';
                $.each(resultado, function(k, v){
                    meses+='<div class="col-sm-9 col-xs-9"><input type="checkbox" name="'+v.mes+'" value="'+v.mes+'">'+v.nome+'</div><br>'
                });
                $('#divmeses').html(meses);
            }
        });

    });

    $('select[name="anofrequenciamodal2"]').change(function () {
        $.ajax({

            url: '../contratos/getmesFrequenciageral',
            type: 'POST',
            dataType: 'json',
            data: {ano:$('select[name="anofrequenciamodal"]').val()},
             error:function(){$('#divmeses').html('');},
            success: function(resultado){
                //alert(JSON.stringify(resultado));
                var meses='';
                $.each(resultado, function(k, v){
                    meses+='<div class="col-sm-9 col-xs-9"><input type="checkbox" name="'+v.mes+'" value="'+v.mes+'">'+v.nome+'</div><br>'
                });
                $('#divmeses2').html(meses);
            }
        });

    });

    $('#form-frequencia').submit(function(){
       // alert(JSON.stringify($('#form-frequencia').serialize().length));
        
    if($('select[name="anofrequenciamodal"]').val()!=0 && $('#form-frequencia').serialize().length>23){
        
        $.ajax({

            url: '../contratos/getFrequencia',
            type: 'POST',
            dataType: 'json',
            data:$('#form-frequencia').serialize()+"&id_contrato="+$('input[name="contrato_id"]').val(),// {id_contrato: $('input[name="contrato_id"]').val(),ano:$('select[name="anofrequenciamodal"]').val()},
            success: function(resultado){
                
                var colum=columns(resultado['estrutura']);
                var corpo=new Array(valores(resultado['valores'],resultado['estrutura'],resultado['nome']));
                // console.log(corpo)
                //alert(JSON.stringify(colum));
                 //console.log((colum));
                 //alert($('select[name="anofrequenciamodal"]').val());

                $('#tabelafrequencia').bootstrapTable('destroy').bootstrapTable({data:corpo,columns:colum,exportTypes:['excel'],exportOptions:{fileName:'Frequencia '+$('#botaoacademico').text() }  });
                $('#myModalopcoes').modal('toggle');
                var meses='';
                $('#divmeses').html(meses);
                $('#myModal1').modal('show');
                $('#myModal1').appendTo("body");
                //$('#tabelafrequencia').bootstrapTable('load',corpo);
                //$('#tabelafrequencia').bootstrapTable('load', resultado);
            }
        });
    }
    return false;
});


//js para aba estagio
    $.ajax({
        url: '../estagios/dadosestagio',
        type: 'POST',
        datatype:'json',
        data:{estagio:$('input[name="historico"]').val()},
        success: function(result){

            $.each(result["orientadores"], function(k, v){
                 nome.push(v.nome);
            });
            $( "input[name='orientador']" ).blur();
            $( "input[name='orientador']" ).autocomplete({source: nome});

            var areasadd = result["areasadd"];
            var option2 = '';
            $.each(areasadd, function(k, v){
                option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
            });
            $('select[name="Area"]').html(option2).show();
        }
    });

    $('#numeroestagio').click(function(){
        var id=$('input[name="estagio"]').val();
        $.ajax({
            url: '../estagios/historicoatual',
            type: 'post',
            data: {id},
            success: function(retorno) {
                window.location.href='../estagio/'+retorno;
            },
        });
    });

    $('#buscarfreqativos').click(function(){

    });

});

window.eventolinksetor = {
    'click a': function (e,x,y,z) {

         window.location.href='../setores/'+y.idsetor;         

    }
}

window.eventolinkunidade = {
    'click a': function (e,x,y,z) {

         window.location.href='../unidades/'+y.idunidade;         

    }
}

window.eventolinkestagio = {
    'click a': function (e,x,y,z) {

         window.location.href='../estagio/'+y.historico;         

    }
}

window.eventolinkarea = {
    'click a': function (e,x,y,z) {

         window.location.href='../area/'+y.idarea;         

    }
}

window.eventolinkacademico = {
    'click a': function (e,x,y,z) {

         window.location.href='../academico/'+y.matricula;         

    }
}