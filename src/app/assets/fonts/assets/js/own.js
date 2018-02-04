
function info_msg(msg) {
    $("#info_msg").html(msg);
    $("#append_info").html($("#info").html());
    $(".alert-info").show();  
    $(".alert-success").hide();
    fechar_info();
}

function hide_info() {
    
}

function success_msg(msg) {
    $("#sucesso_msg").html(msg);
    $("#append_success").html($("#success").html());
    $(".alert-success").show();
    $(".alert-info").hide();
    fechar_sucesso();
}

function hide_success() {
    
}

function fechar_sucesso() {
    $(".close-success").bind("click", function() {
        $(".alert-success").hide();
    });
}

function fechar_info() {
    $(".close-info").bind("click", function() {
        $(".alert-info").hide();
    });
}

function fechar_alert() {
    $(".close-danger").bind("click", function() {
        $(".alert-danger").hide();
    });
}

function excluir(url) {
    $(".excluir").bind('click', function() {
    
        var rs = $(this).attr("result");
        var match = $(this).attr("match");
        
        var round = $("#round").val();
        var champ = $("#champ").val();        
        
        $("#panel_palpites_palpites_feitos").attr("style","display:none");
        $("#gif").attr("style","display:yes");
        $.post(url,{ result : rs, champ : champ, round : round, match :match}, function(response) {

            console.log(response);
            $("#ronda_total_palpitado").html(parseFloat(response.total).toFixed(2));
            $("#cash_usuario").html(parseFloat(response.total_usuario).toFixed(2));
            $("#campeonato_total_palpitado").html(parseFloat(response.total_campeonato).toFixed(2));

            $(".ac_"+match).html(parseFloat(response.total_match).toFixed(2));

            $('#result1pf_'+match).val(0);
            $('#result2pf_'+match).val(0);

            $('#rs_dados_'+match).attr("style","display:none"); 
            $('#fila_'+match).attr("style","display:yes");
            $("#panel_palpites_palpites_feitos").attr("style","display:yes");
            $("#gif").attr("style","display:none");
        }); 
    });
}

function box_mais_info() {
    $(".box_palpite").bind("click", function() {

        var box_opcoes = $(this).attr("id_opcoes");
        var icone = $("#icone_"+box_opcoes);

        if ($("#"+box_opcoes).is(":visible")) {
             $("#"+box_opcoes).hide();    
             icone.removeClass("fa-chevron-down");
             icone.addClass("fa-chevron-right");
        } else {
             $("#"+box_opcoes).show();
             icone.removeClass("fa-chevron-right");
             icone.addClass("fa-chevron-down");
         }
    }) 
};


function aceitar_teamusername(link) {
    $("#aceitar_teamusername").bind("click", function() {
        alert("Hola");
        var name = $('#team_coracao').find(":selected").text();
        var id = $('#team_coracao').find(":selected").val();   
        var champ = $('#champ').val();
        $("#teamusername_popup").css("display","none");

        $.post(link,{idteam : id, nameteam : name}, function(response) {
            if (response == 200) {
                $("#teamcoracao_nome").html(name);
                $("#teamcoracao_nome").attr("href","http://localhost/penca/public/penca/bolao?team="+id+"&champ="+champ);
                $("#head_timecoracao").html(name);
                $("#teamcoracao_pick").css("display","none");
            }
            console.log(response);
        });
    });
};
    
    
function fechar_teamcoracao() {
    $("#btn_cancel_teamcoracao").bind("click", function() {
        $("#teamcoracao_pick").css("display","none");
    });
};
    
function teamusername_click() {
    $("#teamusername").bind("click", function() {
        $("#teamcoracao_pick").css("display","block");
    });
};

function abrir_time() { 
    $("#teamusername").bind("click", function() {
        $("#teamcoracao_pick").show();    
    });
alert("hola");
}

function ganadores_jogo() {
    $(".ganadores").bind("click", function() {
        var match = $(this).attr("match");
        
        if ($("#dvInfo_"+match).attr("style") === "display:none") {        
            $.post("ganadoresjogo", {match_id : match}, function(response) {
               console.log(response);
               var tabela = '<table class="table">';
               for (var i = 0; i < response.length; i = i + 1) {
                   var j = i + 1;

                   tabela = tabela + "<tr>";

                   tabela = tabela + "<td>"+j+"</td>";               
                   tabela = tabela + "<td>"+response[i].rs_points+"</td>";
                   tabela = tabela + "<td>"+response[i].us_username+"</td>";

                   tabela = tabela + "</tr>";
               } 
               tabela = tabela + "</table>";
               
               $("#dvInfo_"+match).attr("style","display:block");
               if (response.length > 0) {
                   $("#dvInfo_"+match).html(tabela);
               } else {
                   $("#dvInfo_"+match).html("Sem ganadores");
               }
               
               
               
            });
        } else {
            $("#dvInfo_"+match).attr("style","display:none");
        }
    })
}