var UF = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG', 'PR', 'PB', 'PA', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SE', 'SP','TO'];
var listaDep = [];
var votacaoTema = [];
var listTemasDep = [{tema:"PEC 241", legislatura:"55"}];
var listTemasSen = [];
var baseCargoAtual = "";
var temaBuscaAtual = "";
var qtdnao=0;
var qtdsim=0;

$(document).ready( function(){
    for(var i=0; i<UF.length; i++)
        $("#ul-list-uf").append('<li><a  href="#">'+UF[i]+'</a></li>');

    setDepList();

    $("#op-cam-dep").click(function(){
        $("#inp-select-tema").removeAttr("disabled");
        baseCargoAtual = "dep";
    });
    $("#op-sen").click(function(){
        $("#inp-select-tema").removeAttr("disabled");

        baseCargoAtual = "sen";
    });

    $("#bt-pesquisa").click(function(){
        $("#div-proj").hide();
        setTema(temaBuscaAtual, baseCargoAtual, showVotoTema);
        alert("Aviso: a base de dados esta sendo populado - Cadastrados apenas Deputados dos Estado: AC, AL e AP. Além da Mesa Diretora.");
    });

    $("#inp-select-tema").bind('input propertychange', function(){
        $("#bt-pesquisa").attr("disabled","");
        qtdnao =0;
        qtdsim=0;
        buscaTemas($(this).val());


    });

    $("#cont-item-tema").hide();





})



function setDepList(){
    $("#a").load("listasPoliticos/dep/"+getAtuallegislatura('dep')+"/listDep.html", function(){
        text = document.getElementById("a").innerText.toString();
        var lines = text.split(';');
        for(var i = 0; i<lines.length-1; i++){
            attr = lines[i].split(',');
            listaDep.push( {nome:attr[0], part: attr[1], uf: attr[2], imagem: attr[3]} );
        }
    });

};


function setTema(tema,cargo, cb){
    votacaoTema = [];
    $("#t").load("listaTema/"+cargo+"/list"+tema.replace(/\s/g,'')+".html", function(){
        text = document.getElementById("t").innerText.toString();
        var lines = text.split(';');

        for(var i = 0; i < lines.length-1; i++){
            attr = lines[i].split(',');
            votacaoTema.push( {nome:attr[0], voto:attr[1]});
            console.log(votacaoTema[votacaoTema.length-1]);
        }

        $("#titulo-tema").html("<h2>"+tema+"</h2>");
        $("#div-sim").show();
        $("#div-nao").show();
        $("#div-abs").show();
        cb(votacaoTema, cargo);
    });

}


function showVotoTema(list, cargo){
    $("#c-div-sim").html("");
    $("#c-div-nao").html("");
    $("#c-div-abs").html("");

    var strNao = "";
    var strSim = "";
    var strAbs = "";

    for(var i=0; i<list.length; i++){
        var d = getDados(list[i].nome, cargo);
        var img = d.imagem.replace(/\s/g,'');
        var urlimg = "listasPoliticos/"+cargo+"/"+getAtuallegislatura('dep')+"/images/"+img;
        var partido = d.part;
        var uf = d.uf

        if(list[i].voto == "Sim"){
            qtdsim++;
            strSim += '<div class="cont-dep"><div style = "background-image: url('+urlimg+')"  class="dep a" ></div><span>'+list[i].nome+" - "+d.part +'/'+ d.uf+'</span> </div>';
        }else if(list[i].voto == "Não"){
            qtdnao++;
            strNao += '<div class="cont-dep"><div style = "background-image: url('+urlimg+')" class="dep a" ></div><span>'+list[i].nome+" - "+d.part +'/'+ d.uf+'</span> </div>';
        }else if(list[i].voto == "Abs"){
            strAbs += '<div class="cont-dep"><div style = "background-image: url('+urlimg+')" class="dep a" ></div><span>'+list[i].nome+" - "+d.part +'/'+ d.uf+'</span> </div>';
        }

    }
    strSim += '<div style="clear: both;"></div>';
    strNao += '<div style="clear: both;"></div>';
    strAbs += '<div style="clear: both;"></div>';

    $("#titulo-tema").append(" Sim: "+qtdsim+" | Não:"+qtdnao);
    $("#c-div-sim").html(strSim);
    $("#c-div-nao").html(strNao);
    $("#c-div-abs").html(strAbs);



}


function getDados(politico, cargo){
    if(cargo == "dep"){
        for(var i=0; i<listaDep.length;i++){
           //console.log(politico,listaDep[i].nome );
           if(politico ==  listaDep[i].nome){
               r = {imagem: listaDep[i].imagem, part: listaDep[i].part, uf: listaDep[i].uf};
               //console.log(r)
               return r
           }
        }
    }

    return {imagem: "Dep.jpg", part: "NULL", uf: "NULL"};

}


function getAtuallegislatura(cargo){
    if(cargo == "dep")
       return "55leg";

}


function  buscaTemas(val){
    var arrReturn = [];
    if(val == "")
       return;
    if(baseCargoAtual == "dep"){
        for(var i=0; i<listTemasDep.length; i++){
            flag = true;
            for(var j=0; j< val.length; j++){
                if(listTemasDep[i].tema.charAt(j) != val.charAt(j)){
                    flag = false;
                    break
                }
            }
            if(flag == true){
                arrReturn.push(listTemasDep[i].tema)
            }
        }
    }else  if(baseCargoAtual == "sen"){
        for(var i=0; i<listTemasSen.length; i++){
            flag = true;
            for(var j=0; j< val.length; j++){
                if(listTemasSen[i].tema.charAt(j) != val.charAt(j)){
                    flag = false;
                    break
                }
            }
            if(flag == true){
                arrReturn.push(listTemasSen[i].tema)
            }
        }
    }



    showListTema (arrReturn);
}


function showListTema(list){
    $("#cont-item-tema").html("");
    for(var i=0; i<list.length; i++){
       $("#cont-item-tema").append('<span class="item-tema" >'+list[i]+'</span>');
    }

    $("#cont-item-tema").show();

    $("#cont-item-tema").click(function(){
        temaBuscaAtual =  $(this).text()
        $("#inp-select-tema").val(temaBuscaAtual);
        $("#bt-pesquisa").removeAttr("disabled");
        $("#cont-item-tema").hide();
    });
};