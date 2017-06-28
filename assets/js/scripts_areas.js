    function stateFormatter(value, row, index) {
        if (row.num_estagios != 0 || row.contratos_geral !=0) {
            return {                
                disabled: true
            };
        }
        return value;
    }

    function formatobotaoexcluir(value,row,index){
        if (row.num_estagios != 0 || row.contratos_geral !=0) {
            return '<button class="btn btn-primary" disabled>Excluir</button>';
        }
        else{
            return '<button class="btn btn-primary">Excluir</button>';
        }
    }

    function formatocelulatabela(value,r,i) {
         return '<a>'+value+'</a>'
    }

    window.eventobotaoexluirarea={
        'click button':function(e,value,row,index){
            var ids=[row.id];

            swal({
                title: "Deseja realmente excluir a área '"+row.nome+"' ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({           
                    url: 'Areas/removerarea',
                    type: 'POST',
                    data: {ids},
                    error: function(asd) {
                        sweetAlert("Erro ao tentar remover área(s)","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(){
                        swal({
                                title: "Área removida com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //alert('Area removida com sucesso!');
                        $('#tableareas').bootstrapTable('remove', {
                            field: 'id',
                            values: ids
                        }); 
                        $('#botaoremoverarea').prop('disabled', true);
                    }
                })
            });




            // if(confirm("Deseja realmente excluir a area '"+row.nome+"' ?") == true){
            //     $.ajax({           
            //         url: 'Areas/removerarea',
            //         type: 'POST',
            //         data: {ids},
            //         error: function(asd) {
            //             alert("Erro ao tentar remover area(s)");
            //         },
            //         success: function(){
            //             alert('Area removida com sucesso!');
            //             $('#tableareas').bootstrapTable('remove', {
            //                 field: 'id',
            //                 values: ids
            //             }); 
            //             $('#botaoremoverarea').prop('disabled', true);
            //         }
            //     });
            // }else{
            //     return false;
            // }
        }
    }



    window.eventolinktabela = {
        'click a': function (e,x,y,z) {

             window.location.href='area/'+y.id;         
        }
    }

    $(document).ready(function(){
            $.ajax({           
                url: 'Areas/carregarcursos',
                type: 'POST',
                datatype:'json',
                 success:function(retorno){
                    var data1=retorno;
                    $("#tabelacursos").bootstrapTable('load', data1);
                },
                error:function(as){
                  alert(JSON.stringify(as));  
                }

            });

            $.ajax({           
                url: 'Areas/carregararea',
                type: 'POST',
                datatype:'json',
                 success:function(retorno2){
                    var data2=retorno2;
                    $("#tableareas").bootstrapTable('load', data2);

                }

            });

        $('#form1').submit(function(){
            
            
            $.ajax({
                url: 'Areas/adicionararea',
                type: 'post',
                data: $('#form1').serialize(),
                datatype:'json',
                error: function(retorno) {
                    alert(JSON.stringify(retorno));
                },
                 success:function(retorno){
                    var data=retorno;
                    $("#tableareas").bootstrapTable('load', data);
                    $('input[name="area"]').val('');
                    $('#myModal').modal('toggle');

                }
            });
            return false;
           
        });

            $('#tabelacursos').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                        $('#botaoremovercurso').prop('disabled', !$('#tabelacursos').bootstrapTable('getSelections').length);
        });

                $('#tableareas').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                        $('#botaoremoverarea').prop('disabled', !$('#tableareas').bootstrapTable('getSelections').length);
        });

        $('#botaoremoverarea').click(function () {
                  
            var ids = $.map($('#tableareas').bootstrapTable('getSelections'), function (row) {
                return row.id;
            });

            swal({
                title: "Deseja realmente excluir a(s) área(s)? \n[ "+ids+" ]",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#2F3233",
                confirmButtonText: "Confirmar",
                closeOnConfirm: false
            },
            function(){
                $.ajax({           
                    url: 'Areas/removerarea',
                    type: 'POST',
                    data: {ids},
                    error: function(asd) {
                        sweetAlert("Erro ao tentar remover área(s)","error");
                           // alert("Erro ao tentar remover area(s)");
                    },
                    success: function(){
                        swal({
                                title: "Área(s) removida(s) com sucesso!",
                                type: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#2F3233"
                            });
                        //alert('Area removida com sucesso!');
                        $('#tableareas').bootstrapTable('remove', {
                            field: 'id',
                            values: ids
                        }); 
                        $('#botaoremoverarea').prop('disabled', true);
                    }
                })
            });
        });

        $('#botaoremovercurso').click(function () {
                  
            var ids = $.map($('#tabelacursos').bootstrapTable('getSelections'), function (row) {
                return row.idcurso;
            });

            if(confirm("Deseja realmente excluir o(s) curso(s)? \n[ "+ids+" ]") == true){
                $.ajax({           
                    url: 'Areas/removercurso',
                    type: 'POST',
                    data: {ids},
                    error: function() {
                        alert('Erro ao tentar remover curso!');
                    },
                    success: function(){
                        alert('Curso(s) removido(s) com sucesso!');
                        $('#tabelacursos').bootstrapTable('remove', {
                            field: 'idcurso',
                            values: ids
                        }); 
                        $('#botaoremovercurso').prop('disabled', true);
                    }
                });
            }else{
                return false;
            }
        });

        $('#botaoaddarea').click(function(){
            $('#myModal').appendTo("body");
        })

             


        $('#nomecurso').on('keyup', function(){
            $('#botaoaddcurso').prop('disabled', ($(this).val()==( /[^a-z]/))); 
        });

        $('#nomearea').on('keyup', function(){
            $('#botaochecknamearea').prop('disabled', ($(this).val() == 0)); 
        });

        $('#adicionarcurso').submit(function () {
            event.preventDefault();
            $.ajax({           
                url: 'Areas/adicionarcurso',
                type: 'POST',
                data: $('#adicionarcurso').serialize(),
                datatype:'json',
                error: function(asd) {
                    alert(asd);
                },
                 success:function(retorno){
                    alert(JSON.stringify(retorno));
                    var data=retorno;

                    $("#tabelacursos").bootstrapTable('load', data);

                }
                
            });
        });
    });
