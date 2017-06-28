/* ----------------------------------------- DOM - jQuery ----------------------------------------- */
$(document).ready(function(){

    // Carrega as linhas da tabela de Estágios Ativos
    carrega_estagios_ativos();

    // Carrega as linhas da tabela de Estágios Inativos
    carrega_estagios_inativos();

    // Carrega as linhas da tabela de Chamada de Estágios
    carrega_estagios_chamada();

    // Carrega as linhas da tabela de Inscritos
    carrega_estagios_inscritos();

    // Carrega as linhas da tabela de Estágios que requerem aprovação
    carrega_estagios_apr();
    
    $('#addarea').click(function(){
        if(($('select[name="Area"]').val()==null) || ($('select[name="Area"]').val()=="")){
            sweetAlert("Escolha uma area existente!");//alert('Escolha uma Area');
        }
        for(var i = 0; i < area.length; i++) {
            if(area[i].id == $('select[name="Area"]').val()) {
                var teste=area.splice(i, 1);
                areasadd.push(teste[0]);
                break;
            }
        }
        //$("[data-toggle='popover']").popover('hide');

        //var li='<div class="list-group">';
        var option2 = '<option></option>';
        $.each(area, function(k, v){
            option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
        });
        var option3 = '<option></option>';
        $.each(areasadd, function(k, v){
            option3+='<option value="'+v.id+'">'+v.nome+'</option>';
            //li+='<a href="../area/'+v.id+'" value="'+v.id+'" target="_blank" class="list-group-item">'+v.nome  +'<button style="background-color:red;" id="buttonpopover" name="'+v.id+'" class="badge" form="" onclick="carregarareaspopover('+v.id+')">x</button></a>';
        });
        //li+='</div>';
        //$('#listapopover').attr('data-content',li);
        $('select[name="Area"]').html(option2).show();
        $('select[name="Areasadicionadas"]').html(option3).show();
    });

    $('#removarea').click(function(){
        if(($('select[name="Areasadicionadas"]').val()==null) || ($('select[name="Areasadicionadas"]').val()=="")){
            sweetAlert("Escolha uma area adicionada!");//alert('Escolha uma Area');
        }
        for(var i = 0; i < areasadd.length; i++) {
            if(areasadd[i].id == $('select[name="Areasadicionadas"]').val()) {
                var teste=areasadd.splice(i, 1);
                area.push(teste[0]);
                break;
            }
        }
        //$("[data-toggle='popover']").popover('hide');

        //var li='<div class="list-group">';
        var option2 = '<option></option>';
        $.each(area, function(k, v){
            option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
        });
        var option3 = '<option></option>';
        $.each(areasadd, function(k, v){
            option3+='<option value="'+v.id+'">'+v.nome+'</option>';
            //li+='<a href="../area/'+v.id+'" value="'+v.id+'" target="_blank" class="list-group-item">'+v.nome  +'<button style="background-color:red;" id="buttonpopover" name="'+v.id+'" class="badge" form="" onclick="carregarareaspopover('+v.id+')">x</button></a>';
        });
        //li+='</div>';
        //$('#listapopover').attr('data-content',li);
        $('select[name="Area"]').html(option2).show();
        $('select[name="Areasadicionadas"]').html(option3).show();
    });
    
    $('#form-editar').submit(function(){
       $.ajax({
            url: base_url + 'supervisor/alterarestagio',
            type: "post",
            datatype:"json",
            data: $("#form-editar").serialize()+"&areas="+JSON.stringify(areasadd),
            success: function(resultado){
                swal(resultado["msg"]);
                $('#modal_editar_estagio').modal('toggle');
                carrega_estagios_inativos();
                carrega_estagios_apr();
            }
        });
        return false;

    });
    
    
});


/* ----------------------------------------- FUNÇÕES - javascript ------------------------------------ */
var area;
var areasadd;
// Busca os estágios ativos via AJAX e carrega na tabela de estágios ativos
function carrega_estagios_ativos(){

    $.ajax({

        url: base_url + 'Supervisor/getEstagiosAtivos',
        type: 'POST',
        dataType: 'JSON',
        success: function(retorno){
            
            /*
            console.log(retorno['nesp']);
            
            $.each(retorno['nesp'], function(key, value){
                
            });
            */
            
            //$('#teste')
             $('#tabela_estagios_ativos').bootstrapTable('removeAll');
            $('#tabela_estagios_ativos').bootstrapTable('load', retorno);
        }
    });
}

// Busca os estágios inativos via AJAX e carrega na tabela de estágios inativos
function carrega_estagios_inativos(){

    $.ajax({

        url: base_url + 'Supervisor/getEstagiosInativos',
        type: 'POST',
        dataType: "JSON",
        success: function(retorno){
            $('#tabela_estagios_inativos').bootstrapTable('removeAll');
            $('#tabela_estagios_inativos').bootstrapTable('load', retorno);
        },error:function(){
            $('#tabela_estagios_inativos').bootstrapTable('removeAll');
        }
    });
}

// Busca os inscritos em vagas de estágio via AJAX e carrega na tabela de inscritos
function carrega_estagios_inscritos(){

    $.ajax({

        url: base_url + 'Supervisor/getInscritosEmEstagio',
        type: 'POST',
        dataType: 'JSON',
        success: function(retorno){
            $('#tabela_inscritos').bootstrapTable('removeAll');
            $('#tabela_inscritos').bootstrapTable('load', retorno);
        }
    });
}

// Busca os alunos em chamada de vagas de estágio via AJAX e carrega na tabela de alunos em chamada
function carrega_estagios_chamada(){

    $.ajax({

        url: base_url + 'Supervisor/getEstagiosEmChamada',
        type: 'POST',
        dataType: 'JSON',
        success: function(retorno){
            $('#tabela_chamada').bootstrapTable('removeAll');
            $('#tabela_chamada').bootstrapTable('load', retorno);
        }
    });
}

// Busca os preenchimentos de vagas de estágio via AJAX e carrega na tabela de aprovação
function carrega_estagios_apr(){

    $.ajax({

        url: base_url + 'Supervisor/getEstagiosEmAprovacao',
        type: 'POST',
        dataType: 'JSON',
        success: function(retorno){
            $('#tabela_aprovacao').bootstrapTable('removeAll');
            $('#tabela_aprovacao').bootstrapTable('load', retorno);
        }
    });
}

/* ----------------------------------------- FUNÇÕES E EVENTOS - bootstrapTable ----------------------------------------- */

/* ABA INSCRITOS */

// Formato do botão de ver inscritos
function botao_ver_inscritos(value, r, i){
    return '<button class="btn btn-success">Ver inscritos</button>';
}

function formato_estagio(value, r, i){
    return '<button class="btn btn-primary">'+value+'</button>';
}

function formato_area(value,row,index){
    var retorno='';
    x=0;
    while(value[x]!=null){
        retorno+=(value[x].nome);
        if(value[x+1]!=null){
            retorno+=', ';
        }
        x++;
    }
    return retorno;
}

// Evento realizado ao clicar no botão de ver inscritos
window.evento_ver_inscritos = {
    'click button': function(e, value, row, index){

        $.ajax({

            url: base_url + "Supervisor/getInscritosPorEstagio",
            type: "POST",
            dataType: "JSON",
            data: {id_estagio: row.historico},
            success: function(json){
                
                //$('#divalert').css("display","block");
                $("#tabela_escondida").css("display","block");
                $("#tabela_inscritos_estagio").bootstrapTable('load', json);
                
            }
        });
    }
};

// Formato do botão de ver currículo
function botao_ver_curriculo(value, row, index){
    return '<button class="btn btn-info">Ver currículo</button>';
}

// Formato do botão de ver 
function botao_ver_historico(value, row, index){
    return '<button class="btn btn-info">Ver Historico</button>';
}

// Evento realizado ao clicar no botão de ver historico
window.evento_ver_historico = {
    'click button': function(e, value, row, index){

        
        //$("#modal_historico").modal('show');
         window.open(base_url + 'Supervisor/academico/' + row.login_estagiario,'_blank');
        //window.location.href = base_url + 'Supervisor/academico/' + row.login_estagiario;
        $.ajax({

            url: base_url + 'Supervisor/getcoeficientes',
            type: 'POST',
            dataType: 'JSON',
            data: {login: row.login_estagiario},
            success: function(retorno){
                
                
               //  if(retorno){
               //      tinyMCE.get('curriculo').setContent(retorno);
               // }
               //  else{
               //      tinyMCE.get('curriculo').setContent('');
                    
               //  }
            }
        });
    }
};



// Evento realizado ao clicar no botão de ver currículo
window.evento_ver_curriculo = {
    'click button': function(e, value, row, index){

        $("#modal_curriculo").modal('show');
        $('#modal_curriculo').appendTo("body"); 

        

        $.ajax({

            url: base_url + 'Supervisor/getCurriculo',
            type: 'POST',
            dataType: 'json',
            jsonp: false,
            data: {login: row.login_estagiario},
            success: function(retorno){
                if(retorno){
                    //$('#curriculo').val('<p>Notifica&ccedil;&atilde;o<!-- asfd --> de est&aacute;gio da Pro-reitoria de extens&atilde;o Unimontes:</p><p>Unidade:</p><p>Setor: </p><p>Atividades realizadas: <p style="padding-left:30px;"</p></p><p>&nbsp;</p><p>Para cancelar o recebimento de notifica&ccedil;&otilde;es de novos est&aacute;gios acesse <a href="unimontes.com">Unimontes</a> e altere em seu perfil.</p>');

                    tinyMCE.init({
        // General options

        selector: ".desativo",
        language:"pt_BR",
        allow_conditional_comments: false,
        element_format : 'html',
        protect: [
    /\<\/?(if|endif)\>/g,  // Protect <if> & </endif>
    /\<xsl\:[^>]+\>/g,  // Protect <xsl:...>
    /<\?php.*?\?>/g  // Protect php code
  ]
,
        themes:"modern",
        plugins: "autoresize, preview, noneditable,print",
         skin : "custom",
        autoresize_min_height:100, 
        autoresize_max_height:600,
        autoresize_on_init:true,
        toolbar:"link preview",   
        statusbar:true,
        menubar:false,
        readonly:0,
        noneditable_leave_contenteditable: true,
        setup: function (ed) {
        ed.on('PreInit', function (event) {
            var ed = event.target, dom = ed.dom;
            dom.setAttrib(ed.getBody(), 'contenteditable', 'false');
        });

    }

    
    });
                    //alert(retorno);
                    //console.log(retorno);
                    //var str=retorno;
                    tinyMCE.get('curriculo').setContent(retorno);
                    tinyMCE.execCommand('mceRemoveEditor', false, 'curriculo'); 
                    
                    //$('#curriculo').val(retorno);
                    tinyMCE.execCommand('mceAddEditor', false, 'curriculo'); 
                    
                    //$('#curriculo').val('<p>Notifica&ccedil;&atilde;o<!-- asfd --> de est&aacute;gio da Pro-reitoria de extens&atilde;o Unimontes:</p><p>Unidade:</p><p>Setor: </p><p>Atividades realizadas: <p style="padding-left:30px;"</p></p><p>&nbsp;</p><p>Para cancelar o recebimento de notifica&ccedil;&otilde;es de novos est&aacute;gios acesse <a href="unimontes.com">Unimontes</a> e altere em seu perfil.</p>');
               }
                else{
                    tinyMCE.get('curriculo').setContent('');
                    
                }
            }
        });
    }
};

// Formato do botão de aceitar inscrição do aluno
function botao_classificar_aluno(v, r, i){
    return '<div class="row"><div class="col-sm-12"><input  style="text-align:center;" name="nota" align="middle" id='+r.login_estagiario+' type="number" min="0" max="10" class="form-control" value="'+r.nota+'"></div><div class="col-sm-7"><button class="btn btn-success">Salvar nota</button></div></div>';
}

// Evento realizado ao clicar no botão de aceitar inscrição do aluno
window.evento_classificar_aluno = {
    'click button': function(e, value, row, index){
        
        $.ajax({

                    url: base_url + "Supervisor/NotaCandidato",
                    type: "POST",
                    dataType: "JSON",
                    data: {historico: row.id_estagio,matricula:row.login_estagiario,nota:$('#'+row.login_estagiario).val()},
                    success: function(retorno){
                        switch(retorno){
                            case '1':
                                swal("Nota inserida!", "success");
                         break;
                        
                        case '0':
                            swal("Erro ao inserir nota, tente novamente!", "error");
                            break;
                        }
//        swal({
//                title: "Você tem certeza?",
//                text: "Deseja realmente aceitar a inscrição desse aluno a essa vaga de estágio?",
//                type: "success",
//                showCancelButton: true,
//                confirmButtonColor: "#DD6B55",
//                confirmButtonText: "Sim, aceitar!",
//                cancelButtonText: "Não!",
//                closeOnConfirm: false
//            },
//            function(){
//
//                var id_estagio = [row.id_estagio];
//
//                $.ajax({
//
//                    url: base_url + "Estagios/classificarAlunoVagaEstagio",
//                    type: "POST",
//                    dataType: "JSON",
//                    data: {id_idestagio: row.id_idestagio},
//                    success: function(retorno){
//
//                        switch(retorno){
//                            case '1':
//
//                                swal("Inscrição aceita!", "Para acompanhar os pedidos de estágios à aprovar, clique na aba 'Pedidos em aprovação'!", "success");
//                                $("#tabela_inscritos_estagio").bootstrapTable('remove', {field: 'id_estagio', values: id_estagio});
//                                $("#tabela_inscritos").bootstrapTable('remove', {field: 'id_estagio', values: id_estagio});
//
//                                carrega_estagios_apr();
//                            break;
//                        }
                    }
                });
          
            }  
    }

/* ABA CHAMADA */

// Formato do botão de cancelar chamada do aluno
function botao_cancelar_chamada(value, r, i){
    return '<button class="btn btn-danger">Cancelar chamada</button>';
}

// Evento realizado ao clicar no botão de cancelar chamada do aluno
window.evento_cancelar_chamada = {
    'click button': function(e, value, row, index){

        swal({
                title: "Você tem certeza?",
                text: "Tem certeza que deseja cancelar a chamada de estágio desse aluno?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, cancelar!",
                cancelButtonText: "Não!",
                closeOnConfirm: false
            },
            function(){

                var id = row.id_idestagio;
                var id_estagio = [row.id_estagio];

                $.ajax({

                    url: base_url + "Estagios/cancelarChamada",
                    type: "POST",
                    data: {id_idestagio: id},
                    success: function(){

                        swal("Cancelamento de chamada de aluno realizado!", "Para acompanhar os estágios em aprovação, clique na aba 'Pedidos em aprovação'!", "success");
                        $("#tabela_chamada").bootstrapTable('remove', {field: 'id_estagio', values: id_estagio});

                        carrega_estagios_apr();
                    }
                });
            }
        );
    }
};

/* ABA PEDIDOS EM APROVAÇÃO */

function formato_acoes_pedido(value,row,index){
    if(row.status=='0'){
        return '<div class="row"><div class="col-sm-7 "><button class="btn btn-danger" disabled>Cancelar pedido</button></div><div class="col-sm-6"><button class="btn btn-success">Realizar pedido</button></div></div>';
    }else {
        return '<div class="row"><div class="col-sm-7 "><button class="btn btn-danger">Cancelar pedido</button></div><div class="col-sm-6"><button class="btn btn-success" disabled>Realizar pedido</button></div></div>';
    }
}

window.evento_acoes_pedido={
    'click .btn-success':function(e,v,r,i){
        swal({
          title: "Alterar o estagio?",
          text: "Sim se deseja alterar os dados do estagio antes de realizar o pedido!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Sim, alterar dados!",
          cancelButtonText: "Não, manter dados!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
              swal.close();
              $.ajax({

                    url: base_url + "Supervisor/dadosestagio",
                    type: "POST",
                    data: {historico: r.historico},
                    success: function(retorno){
                                    $('#modal_editar_estagio').modal('show');
                        $('#modal_editar_estagio').appendTo("body");

                        tinyMCE.init({
                                // General options
                                selector: ".ativo",
                                language:"pt_BR",
                                themes:"modern",
                                 skin : "custom",
                                 menubar:false,
                                 autoresize_on_init:true,
                                  plugins: "textcolor colorpicker,insertdatetime,fullscreen ,code, preview",
                                toolbar1:  "bold italic underline strikethrough | removeformat | styleselect | formatselect | fontselect | fontsizeselect | jbimages",
                                  toolbar2: "alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent  | undo redo | link unlink  | insertdatetime preview | forecolor backcolor  |  fullscreen code preview",
                                  bbcode_dialect: "punbb",
                                   

                                   relative_urls: false,
                                  plugin_preview_width: 650,
                                max_chars: 61000, // max. allowed chars
                                images_upload_handler: function (blobInfo, success, failure) {
                                    var xhr, formData;

                                    xhr = new XMLHttpRequest();
                                    xhr.withCredentials = false;
                                    xhr.open('POST', 'postAcceptor.php');

                                    xhr.onload = function() {
                                      var json;

                                      if (xhr.status != 200) {
                                        failure('HTTP Error: ' + xhr.status);
                                        return;
                                      }

                                      json = JSON.parse(xhr.responseText);

                                      if (!json || typeof json.location != 'string') {
                                        failure('Invalid JSON: ' + xhr.responseText);
                                        return;
                                      }

                                      success(json.location);
                                    };

                                    formData = new FormData();
                                    formData.append('file', blobInfo.blob(), blobInfo.filename());

                                    xhr.send(formData);
                                  },

                                    setup: function (ed) {
                                        var allowedKeys = [8, 37, 38, 39, 40, 46]; // backspace, delete and cursor keys
                                        ed.on('keydown', function (e) {
                                            if (allowedKeys.indexOf(e.keyCode) != -1) return true;
                                            if (tinymce_getContentLength() + 1 > this.settings.max_chars) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                return false;
                                            }
                                            return true;
                                        });
                                        ed.on('keyup', function (e) {
                                            tinymce_updateCharCounter(this, tinymce_getContentLength());
                                        });
                                        ed.on('SetContent', function (e) {
                                          tinymce_updateCharCounter(this, e.content.length);
                                        });     

                                    },
                                    init_instance_callback: function () { // initialize counter div
                                        $('#' + this.id).prev().append('<div class="char_count" style="text-align:right"></div>');
                                        tinymce_updateCharCounter(this, tinymce_getContentLength());
                                    },
                                    paste_preprocess: function (plugin, args) {
                                        var editor = tinymce.get(tinymce.activeEditor.id);
                                        var len = editor.contentDocument.body.innerHTML.length;
                                        var text = $(args.content).text();
                                        if (len + text.length > editor.settings.max_chars) {
                                            alert('Pasting this exceeds the maximum allowed number of ' + editor.settings.max_chars + ' characters.');
                                            args.content = '';
                                        } else {
                                            tinymce_updateCharCounter(editor, len + text.length);
                                        }
                                    }
                                    
                                 });


                                function tinymce_updateCharCounter(el, len) {
                                    $('#' + el.id).prev().find('.char_count').text('Limite: '+len + '/' + el.settings.max_chars);
                                    
                                }

                                function tinymce_getContentLength() {
                                    return tinymce.get(tinymce.activeEditor.id).contentDocument.body.innerHTML.length;
                                }







                        tinyMCE.execCommand('mceRemoveEditor', true, 'objetivo');

                        tinyMCE.execCommand('mceAddEditor', false, 'objetivo'); 
                        tinyMCE.execCommand('mceRemoveEditor', false, 'descricao'); 
                        tinyMCE.execCommand('mceAddEditor', true, 'descricao'); 
                        
                        tinyMCE.execCommand('mceRemoveEditor', true,'criterios_avaliacao');
                        tinyMCE.execCommand('mceAddEditor', false,'criterios_avaliacao');

                        //alert(retorno);
                        $('#saida').val(retorno['estagio'][0]['saida']);
                        $('#entrada').val(retorno['estagio'][0]['entrada']);
                        $('#turno').val(retorno['estagio'][0]['turno']);
                        $('#tipo_vaga').val(retorno['estagio'][0]['vaga_aberta']);
                        $('#duracao').val(retorno['estagio'][0]['duracao']);
                        $('#estagio').val(retorno['estagio'][0]['id']);
                        $('#historico').val(retorno['estagio'][0]['historico']);
                        $('#supervisor').val(retorno['estagio'][0]['sup_id']);
                        $('#setor').val(retorno['estagio'][0]['idsetores']);
                        $('#unidade').val(retorno['estagio'][0]['idunidade']);
                        $('#orientador').val(retorno['estagio'][0]['orientador']);
                
                        tinyMCE.get('objetivo').setContent(retorno['estagio'][0]['objetivo']);
                        tinyMCE.get('descricao').setContent(retorno['estagio'][0]['descricao']);
                        tinyMCE.get('criterios_avaliacao').setContent(retorno['estagio'][0]['criterios_avaliacao']);
                        
                        
                        // var obj = $('<textarea class="newTextAreaClass">New TA 2</textarea>'); 
                        // $('divobjeto').append(obj);

                        // tinymce.init({
                        //     theme: 'modern',
                        //     selector: '.newTextAreaClass'
                        // });
                        area = retorno["areas"];

                        areasadd = retorno['areasadd'];
                        
                        var option2 = '<option></option>';
                        var option3 = '<option></option>';
                        $.each(area, function(k, v){
                            option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
                        });
                        $.each(areasadd, function(k, v){
                            option3 += '<option value="'+v.id+'">'+v.nome+'</option>';
                        });
                        $('select[name="Area"]').html(option2).show();
                        $('select[name="Areasadicionadas"]').html(option3).show();
                    }
                });

            //swal("alterar dados, chato pakas");
          } else {
            $.ajax({

                url: base_url + "Supervisor/AlterarStatusAprovacao",
                type: "POST",
                data: {estagio: r.id_estagio},
                success: function(retorno){
                     switch(retorno){
                            case '1':
                                swal("Pedido realizado!");
                             carrega_estagios_inativos();
                carrega_estagios_apr();
                             break;
                            case '0':
                                swal("Erro ao realizar pedido!");
                             break;
                        }
                }
            });
          }
        });
    },    
    'click .btn-danger':function(e,v,r,i){
        swal({
          title: "Deseja realmente cancelar o pedido de estágio?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Sim, cancelar pedido!",
          cancelButtonText: "Não, manter pedido!",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            $.ajax({

                    url: base_url + "Supervisor/CancelarPedido",
                    type: "POST",
                    dataType: "JSON",
                    data: {idestagio: r.id_estagio},
                    success: function(retorno){

                        switch(retorno){
                            case '1':

                                swal("Pedido de estágio cancelado!", "success");
                                carrega_estagios_apr();
                                carrega_estagios_inativos();
                                //$(".tabela_escondida").hide();
                            break;
                            case '0':
                                swal("Erro ao cancelar estagio!", "Tente novamente ou consulte o administrador!", "error");
                                carrega_estagios_apr();
                                carrega_estagios_inativos();
                            break;
                        }
                    }
                });
          }else {
    swal("Pedido de estágio mantido!");
  }
        });
    }
}

function carregarareaspopover(id){
    //event.preventDefault();
    for(var i = 0; i < areasadd.length; i++) {
        if(areasadd[i].id == id) {
            var teste=areasadd.splice(i, 1);
            area.push(teste[0]);
            break;
        }
        return false;
    }
    
    $("[data-toggle='popover']").popover('hide');
    var li='<div class="list-group">';
    var option2 = '<option></option>';
    $.each(area, function(k, v){
        option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
    });
    $.each(areasadd, function(k, v){
        li+='<a class="list-group-item">'+v.nome  +'<button style="background-color:red;margin-left:5px;" id="buttonpopover" name="'+v.id+'" class="badge" form="" onclick="carregarareaspopover('+v.id+')">x</button></a>';
    });
    li+='</div>';
    $('#listapopover').attr('data-content',li);
    $('select[name="Area"]').html(option2).show();

    $("[data-toggle='popover']").popover('toggle');

    }


// Formato do botão de cancelar pedido de candidato a vaga de estágio
function formato_cancelar_pedido(value, r, i){
    return '<button class="btn btn-danger">Cancelar pedido</button>';
}

// Evento realizado ao clicar no botão de cancelar pedido de candidato a vaga de estágio
window.evento_link_cancelar_pedido = {
    'click button': function(e, value, row, index){

        swal({
                title: "Você tem certeza?",
                text: "Deseja realmente cancelar esse pedido de estágio?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, cancelar!",
                cancelButtonText: "Não!",
                closeOnConfirm: false
            },
            function(){

                var id_estagio = [row.id_estagio];

                $.ajax({

                    url: base_url + "Estagios/cancelarPedidoEstagio",
                    type: "POST",
                    dataType: "JSON",
                    data: {id_idestagio: row.id_idestagio},
                    success: function(retorno){

                        switch(retorno){
                            case '1':

                                swal("Pedido de estágio cancelado!", "Para acompanhar os alunos inscritos em vagas de estágio, clique na aba 'Inscritos'!", "success");
                                $("#tabela_aprovacao").bootstrapTable('remove', {field: 'id_estagio', values: id_estagio});

                                carrega_estagios_inscritos();

                                $(".tabela_escondida").hide();
                            break;
                        }
                    }
                });
            }
        );
    }
}

// Formato do botão de aprovar pedido de inscrição em vaga de estágio
function formato_aprovar_pedido(value, r, i){
    return '<button class="btn btn-success">Aprovar pedido</button>';
}

// Evento realizado ao clicar o botão de aprovar pedido de inscrição em vaga de estágio
window.evento_link_aprovar_pedido = {
    'click button': function(e, value, row, index){

        swal({
                title: "Você tem certeza?",
                text: "Deseja realmente aprovar esse pedido de estágio?",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, aprovar!",
                cancelButtonText: "Não!",
                closeOnConfirm: false
            }, function(){

                var id_estagio = [row.id_estagio];

                $.ajax({

                    url: base_url + "Estagios/aprovarPedidoEstagio",
                    type: "POST",
                    dataType: "JSON",
                    data: {id_idestagio: row.id_idestagio},
                    success: function(retorno){

                        switch(retorno){
                            case '1':

                                swal("Pedido de estágio aprovado!", "Para acompanhar os estágios em chamada, clique na aba 'Chamada'!", "success");
                                $("#tabela_aprovacao").bootstrapTable('remove', {field: 'id_estagio', values: id_estagio});

                                carrega_estagios_chamada();
                            break;
                        }
                    }
                });
            }
        );
    }
}

/* ----------------------------------------- EVENTOS E FUNÇÕES GERAIS - bootstrapTable ----------------------------------------- */

/* FORMATO LINKS */

function formato_inscrito(value, r, i){
    return '<a>' + value + '</a>';
}


function formato_estagiario(value, r, i){
    return '<a>' + value + '</a>';
}

/* EVENTOS LINKS */

window.evento_link_inscrito = {
    'click a': function(e, x, y, z){
        
        window.location.href = base_url + 'academico/' + y.login_estagiario;
    }
};

window.evento_estagio = {
    'click button': function(e, value, row, index){
        $.ajax({
            url: base_url + "Supervisor/dadosestagio",
            type: "POST",
            dataType: "JSON",
            data: {historico: row.historico},
            success: function(retorno){
                $('#modal_estagio').appendTo("body"); 
                $('#modal_estagio').modal('show'); 

                
                //$('#descricao2').text(retorno['estagio'][0]['descricao']).appendTo('body');

                // $('#descricao2').removeClass("desativo"); 
                // $('#objetivo2').removeClass("desativo"); 
                // $('#criterios_avaliacao2').removeClass("desativo");
                // $('#descricao2').addClass("desativo"); 
                // $('#objetivo2').addClass("desativo"); 
                // $('#criterios_avaliacao2').addClass("desativo");
                // initMCE('textarea#descricao2');
                // initMCE('textarea#objetivo2');
                // initMCE('textarea#criterios_avaliacao2');
                //$('#textarea1').html('<textarea rows="4" id="teste1" class="form-control desativo" id="objetivo2" >asd</textarea>')
                //$('<textarea rows="4" class="form-control desativo" id="objetivo2" ></textarea>').text(text).appendTo('body');
                tinyMCE.execCommand('mceRemoveEditor', false, 'objetivo2'); 
                tinyMCE.execCommand('mceAddEditor', false, 'objetivo2'); 
                tinyMCE.execCommand('mceRemoveEditor', false, 'descricao2'); 
                tinyMCE.execCommand('mceAddEditor', false, 'descricao2'); 
                tinyMCE.execCommand('mceRemoveEditor', false,'criterios_avaliacao2');
                tinyMCE.execCommand('mceAddEditor', false,'criterios_avaliacao2');
                //tinyMCE.execCommand("mceAddControl",false, 'objetivo2');
                // $('#objetivo2').appendTo("body"); 
                // $('#criterios_avaliacao2').appendTo("body"); 
                
                //tinyMCE.execCommand("mceAddControl",false, 'descricao2');

                $('input[name="saida2"]').val(retorno['estagio'][0]['saida']);
                $('input[name="entrada2"]').val(retorno['estagio'][0]['entrada']);
                $('select[name="turno2"]').val(retorno['estagio'][0]['turno']);
                $('input[name="tipo_vaga2"]').val(retorno['estagio'][0]['vaga_aberta']);
                $('input[name="duracao2"]').val(retorno['estagio'][0]['duracao']);
                $('input[name="supervisor2"]').val(retorno['estagio'][0]['supervisor']);
                $('input[name="setor2"]').val(retorno['estagio'][0]['setor']);
                $('input[name="unidade2"]').val(retorno['estagio'][0]['unidade']);
                
                // $('#objetivo2').html(retorno['estagio'][0]['objetivo']);
                // $('#descricao2').html(retorno['estagio'][0]['descricao']);
                //tinyMCE.getInstanceById("objetivo2").setContent(retorno['estagio'][0]['objetivo']);


                tinyMCE.get('objetivo2').setContent(retorno['estagio'][0]['objetivo']);
                tinyMCE.get('descricao2').setContent(retorno['estagio'][0]['descricao']);
                tinyMCE.get('criterios_avaliacao2').setContent(retorno['estagio'][0]['criterios_avaliacao']);

                
                areasadd = retorno['areasadd'];
                
                var option2 = '<option></option>';
                $.each(areasadd, function(k, v){
                    option2 += '<option value="'+v.id+'">'+v.nome+'</option>';
                });
                $('select[name="area2"]').html(option2).show();

                

            }
        });
       
    }
};

window.evento_link_estagiario = {
    'click a': function(e, x, y, z){

        window.location.href = base_url + 'academico/' + y.login_estagiario;
    }
};