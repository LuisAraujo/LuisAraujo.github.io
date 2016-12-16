var UF = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG', 'PR', 'PB', 'PA', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SE', 'SP','TO'];
var listaDep = [];
var listaSen = [];
var votacaoTema = [];
var listTemasDep = [{tema:"PEC 241", nota:"",legislatura:"55", link:"https://www.google.com.br/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=pec%20241"}];
var listTemasSen = [{tema:"PEC 241", nota:"2º Turno.", legislatura:"55", link:"https://www.google.com.br/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=pec+241+senado"}];
var baseCargoAtual = "";
var temaBuscaAtual = "";
var qtdnao=0;
var qtdsim=0;

$(document).ready( function(){



    $(window).click(function(evt) {

        if ((evt.target.id != "bt-menu-princ") && (evt.target.id != "bt-menu-icon-princ")){
                $("#menu-princ").hide("fast");
        }else if( $("#menu-princ").css("display") != "none"){
            $("#menu-princ").hide("fast");
        }else{
            $("#menu-princ").show("fast");
        }

    });

    for(var i=0; i<UF.length; i++)
        $("#ul-list-uf").append('<li><a  href="#">'+UF[i]+'</a></li>');

    setDepList();
    setSenList();

    $("#op-cam-dep").click(function(){
        $("#inp-select-tema").removeAttr("disabled");
        baseCargoAtual = "dep";
        temaBuscaAtual = "";
    });
    $("#op-sen").click(function(){
        $("#inp-select-tema").removeAttr("disabled");
        baseCargoAtual = "sen";
        temaBuscaAtual = "";
    });

    $("#bt-pesquisa").click(function(){


        window.location.href =   window.location.href.split("?")[0]+"?tema="+temaBuscaAtual+"&cargo="+baseCargoAtual;

        if(baseCargoAtual == "dep")
            $("#modal-aviso").modal();
    });

    $("#inp-select-tema").bind('input propertychange', function(){
        $("#bt-pesquisa").attr("disabled","");
        qtdnao =0;
        qtdsim=0;
        buscaTemas($(this).val());
    });

    $("#cont-item-tema").hide();


    data = window.location.search.substring(1)

    if(data != ""){
        $("#div-proj").hide();
        vars = data.split("&");
        tema = vars[0].split("=")[1]
        cargo = vars[1].split("=")[1]
        temaBuscaAtual = tema;

        if((cargo == "sen") || (cargo == "dep"))
            baseCargoAtual = cargo;

        if((baseCargoAtual != "") && (temaBuscaAtual !="")){
            setTema(temaBuscaAtual, baseCargoAtual, showVotoTema)
        }else{
            alert("Desculpa, algo de errado ocorreu!"+cargo +" "+tema)

        }
    }
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


function setSenList(){
    $("#a").load("listasPoliticos/sen/"+getAtuallegislatura('sen')+"/listSen.html", function(){
        text = document.getElementById("a").innerText.toString();
        var lines = text.split(';');
        for(var i = 0; i<lines.length-1; i++){
            attr = lines[i].split(',');
            //console.log(attr[0]);
            listaSen.push( {nome:attr[0], part: attr[1], uf: attr[2], imagem: attr[3]} );
        }
    });

};


function setTema(tema,cargo, cb){
    votacaoTema = [];

    if(cargo == "dep"){
        $("#t").load("listaTema/"+cargo+"/list"+listTemasDep[tema].tema.replace(/\s/g,'')+".html", function(){
            text = document.getElementById("t").innerText.toString();
            var lines = text.split(';');

            for(var i = 0; i < lines.length-1; i++){
                attr = lines[i].split(',');
                votacaoTema.push( {nome:attr[0], voto:attr[1]});
            }

            $("#titulo-tema").html("<h2>"+listTemasDep[tema].tema+"</h2> <a target='_blank' href='"+listTemasDep[tema].link+"'> Deseja saber mais?</a> | ");
            $("#div-sim").show();
            $("#div-nao").show();
            $("#div-abs").show();
            cb(votacaoTema, cargo);
        });

    }else if(cargo == "sen"){
        $("#t").load("listaTema/"+cargo+"/list"+listTemasSen[tema].tema.replace(/\s/g,'')+".html", function(){
            text = document.getElementById("t").innerText.toString();
            var lines = text.split(';');

            for(var i = 0; i < lines.length-1; i++){
                attr = lines[i].split(',');
                votacaoTema.push( {nome:attr[0], voto:attr[1]});
            }

            $("#titulo-tema").html("<span style='font-size: 40px; margin-top: 5px'>"+listTemasSen[tema].tema+"</span> <span style='color: #adadad'>"+listTemasSen[tema].nota+"</span><br><a target='_blank' href='"+listTemasSen[tema].link+"'> Deseja saber mais?</a> | ");
            $("#div-sim").show();
            $("#div-nao").show();
            $("#div-abs").show();
            cb(votacaoTema, cargo);
        });
    }
}


function showVotoTema(list, cargo){
    $("#c-div-sim").html("");
    $("#c-div-nao").html("");
    $("#c-div-abs").html("");

    qtdsim = 0;
    qtdnao = 0;
    var strNao = "";
    var strSim = "";
    var strAbs = "";

    for(var i=0; i<list.length; i++){
        var d = getDados(list[i].nome, cargo);
        console.log(d, list[i].nome)
        var img = d.imagem.replace(/\s/g,'');
        var urlimg = "listasPoliticos/"+cargo+"/"+getAtuallegislatura(cargo)+"/images/"+img;
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
    //console.log($("#cont-votos").css("height"));

    $("#titulo-tema").append(" Sim: "+qtdsim+" | Não:"+qtdnao);
    $("#c-div-sim").html(strSim);
    $("#c-div-nao").html(strNao);
    $("#c-div-abs").html(strAbs);

    //$("#menu-lateral").height($("#cont-votos").css("height"));

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
    }else if(cargo == "sen"){
       for(var i=0; i<listaSen.length;i++){
            //console.log(politico,listaDep[i].nome );
            if(politico ==  listaSen[i].nome){
                r = {imagem: listaSen[i].imagem, part: listaSen[i].part, uf: listaSen[i].uf};
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
    if(cargo == "sen")
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
                if(listTemasDep[i].tema.charAt(j).toUpperCase() != val.charAt(j).toUpperCase()){
                    flag = false;
                    break
                }
            }
            if(flag == true){
                arrReturn.push({id:i, tema:listTemasDep[i].tema})
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
                arrReturn.push({id:i, tema:listTemasSen[i].tema})
            }
        }
    }

    showListTema (arrReturn);
}


function showListTema(list){

    $("#cont-item-tema").html("");
    for(var i=0; i<list.length; i++){
       $("#cont-item-tema").append('<span idtema="'+list[i].id+'"class="item-tema" >'+list[i].tema+'</span>');
    }

    $("#cont-item-tema").show();

    $(".item-tema").click(function(){
        temaBuscaAtual = $(this).attr("idtema");
        $("#inp-select-tema").val($(this).text());
        $("#bt-pesquisa").removeAttr("disabled");
        $("#cont-item-tema").hide();
    });
};