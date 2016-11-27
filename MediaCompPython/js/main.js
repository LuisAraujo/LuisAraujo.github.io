window.movimento = 0;
window.controle = 0;
window.aparencia = 0;
window.sensores = 0;
window.operadores = 0;
window.variaveis = 0;
window.som = 0;
window.caneta = 0;

window.qtdvar = 0;

callfunctionrecussive = 0;
currentProject = 0;
lastprojectprinted = -1;

var printing=null;

//lista dos projetos obtivo via diretório
projectList = null;

$(document).ready(function(){
    $("#bt-start").click( function(){

        $("#table-body").html("");
        resetAllvariables();

        var jqxhr = $.post( "php/getListDir.php", {dir: $("#dir").val() },function() {
        })
        .done(function(data){
             projectList = jQuery.parseJSON(data);

             if(projectList.length > 0)
                startCounting();
              else
                 $("#modal-erro").modal();

        })
        .fail(function() {
            alert( "error get list file" );
        })
    });
});

function resetAllvariables(){
    currentProject = 0;
    printing= null;
}


function resetForNextCount(){
    window.movimento = 0;
    window.controle = 0;
    window.aparencia = 0;
    window.sensores = 0;
    window.operadores = 0;
    window.variaveis = 0;
    window.som = 0;
    window.caneta = 0;
    window.qtdvar = 0;
    lastprojectprinted= -1;
    callfunctionrecussive = 0;

}

function startCounting(){
    resetForNextCount();

    if(currentProject < projectList.length){
        var path = projectList[currentProject++];

        window.project = new sb.Project(path);
            project.open(function (success) {
                printInfo();
            });
    }
}


function printInfo(){

    //nome = project.path.split("/");
    //$("#projectname").html("<b>Nome: </b> "+nome[nome.length-1]);
    //$("#projectauthor").html("<b>Autor: </b>"+project.info.author);
    //$("#projectpath").html("<b>Caminho:</b>"+project.path);

    objetos = project.stage.children;
   console.log(objetos.length);
    objetos[objetos.length] = project.stage;

    //quantidade de objetos

    //$("#objectsproject").html("<b>Lista: </b> <br>");

    objetos.forEach(function(item, index){
         if(item.scripts != undefined){

           //$("#objectsproject").append(item.objName+"; ");

             qtdvar += item.variables.length;

             item.scripts.forEach(function(subitem, subindex){
                    subitem[2].forEach(function(subitem2, subindex2){
                        recussiveCall(subitem2);
                    });
             });
         }


    });

    //quantidade de variáveis
    //$("#qtdvar").html(qtdvar);

    printing = setInterval(function(){printQtd()}, 100);

}

function printQtd(call){

    if(callfunctionrecussive === 0){

     if(lastprojectprinted >= currentProject)
        return;

        clearInterval(printing);

        str = "<tr><th scope='row'>"+project.info.author+"</th>"+
        "<td>"+movimento+"</td>"+
        "<td>"+controle+"</td>"+
        "<td>"+aparencia+"</td>"+
        "<td>"+sensores+"</td>"+
        "<td>"+operadores+"</td>"+
        "<td>"+variaveis+"</td>"+
        "<td>"+som+"</td>"+
        "<td>"+caneta+"</td>"+
        "<td>"+qtdvar+"</td> </tr>";

        $("#table-body").append(str);

        lastprojectprinted = currentProject;

        startCounting();

    }
}


function recussiveCall(item){
    //console.log(item);
    callfunctionrecussive++;

    if(item == undefined){

        callfunctionrecussive--;
        return;
    }


    if(item[0] == "doForever"){
        if(item[1] != null)

         item[1].forEach(function(i, id){
                recussiveCall(item[1][id]);

         });

    }else if(item[0] == "doRepeat"){

        if(item[2] != null)
        item[2].forEach(function(i, id){
            recussiveCall(item[2][id]);

        });


    }else if(item[0] == "doIfElse"){

        if(item[1] != null){
            recussiveCall(item[1]);
            //verificaSensores(item[1]);
        }

        if(item[2] != null)
        item[2].forEach(function(i, id){
            recussiveCall(item[2][id]);

        });

        if(item[3] != null)
        item[3].forEach(function(i, id){
            recussiveCall(item[3][i]);

        });


    }else if(item[0] == "doIf"){

        if(item[1] != null){
            recussiveCall(item[1]);
            //verificaSensores(item[1]);
        }
        if(item[2] != null)
        item[2].forEach(function(i, id){
            recussiveCall(item[2][id]);

        });


    }else if(item[0] == "doForeverIf"){

        if(item[1] != null){
            recussiveCall(item[1]);
            //verificaSensores(item[1]);
        }

        if(item[2] != null)
        item[2].forEach(function(i, id){
            recussiveCall(item[2][id]);

        });



    }else if(item[0] == "doUntil"){

        if(item[1] != null){
            recussiveCall(item[1]);
            //verificaSensores(item[1]);
        }

        if(item[2] != null)
        item[2].forEach(function(i, id){
            recussiveCall(item[2][id]);
            //sleep(10);
        });

    }else if(item[0] == "doWaitUntil"){

        if(item[1] != null){
            recussiveCall(item[1]);
            //verificaSensores(item[1]);
        }

    }

    sumBlocks(item[0]);

    if((item[0] == "forward:") || (item[0] =="turnRight:") || (item[0] =="turnLeft:") || (item[0] =="heading:") ||
       (item[0] =="gotoX:y:") || (item[0] =="glideSecs:toX:y:elapsed:from:") || (item[0] =="changeXposBy:") ||
       (item[0] =="xpos:") || (item[0] =="changeYposBy:") || (item[0] =="ypos:")){

        if(typeof  item[1] == "object"){
            recussiveCall(item[1]);
        }
    }

    if(( item[0] == "computeFunction:of:") || ( item[0] =="rounded") || (item[0]=="\\") ||
        (item[0] == "stringLength:") || (item[0] =="letter:of:") || (item[0] == "concatenate:with:") || (item[0] == "&") ||
        (item[0] == "not") || (item[0] == "|") || (item[0] == ">") || (item[0] == "=") || (item[0] == "<") || (item[0] == "randomFrom:to:") || (item[0] == "/") ||
        (item[0] == "*") || (item[0] == "-") || (item[0] == "+")){

        if((item[2] != undefined) && (typeof  item[1] == "object")){
            recussiveCall(item[1]);
        }

        if((item[2] != undefined) && (typeof  item[2] == "object")){
            recussiveCall(item[2]);
        }
    }else  if ((item[0]== "changeVar:by:") || (item[0] == "setVar:to:")){
        if(typeof  item[2] == "object"){
            recussiveCall(item[2]);
        }
    }else  if((item[0]== "penSize:") || (item[0] == "changePenSizeBy:") || (item[0] == "setPenShadeTo:") ||
             (item[0] == "changePenShadeBy:") || (item[0] == "setPenHueTo:") || (item[0] == "changePenHueBy:")){

        if(typeof  item[1] == "object"){
              recussiveCall(item[1]);
        }

    }else if((item[0] == "setTempoTo:") || (item[0] == "changeTempoBy:") || (item[0] == "setVolumeTo:") || (item[0] == "changeVolumeBy:") ||
    (item[0] == "midiInstrument:") || (item[0]== "rest:elapsed:from:")){
        if(typeof  item[1] == "object"){
           recussiveCall(item[1]);
        }

    }else if ((item[0] == "noteOn:duration:elapsed:from:") ||
             (item[0] == "drum:duration:elapsed:from:")){

        if(typeof  item[1] == "object"){
            recussiveCall(item[1]);
        }

        if(typeof  item[2] == "object"){
            recussiveCall(item[2]);
        }

    }

    callfunctionrecussive--;
}

function verificaSensores(item){

    /****sensores ***/
    if((item[0] != "|") && (item[0] != "&") && (item[0] != "not"))
        recussiveCall(item);
    else if (typeof item == "object"){
       item.forEach(function(itens, index){
            verificaSensores(itens);
        });
    }
}
function sumBlocks(block){
    //movimento
    if ((block  == "bounceOffEdge") || (block  == "ypos:") ||
        (block == "changeYposBy:") || (block  == "xpos:") ||
        (block  == "changeXposBy:") || (block  == "glideSecs:toX:y:elapsed:from:")||
        (block  == "gotoX:y:") || (block == "pointTowards:") ||
        (block  == "heading:") || (block  == "turnLeft:") ||
        (block  == "turnRight:") || (block  == "forward:") || (block == "heading") ||
        (block == "ypos") || (block == "gotoSpriteOrMouse:") || (block=="xpos"))
        {

             movimento++;
    //controle
    } else if ((block  == "whenGreenFlag") || (block  == "whenKeyPressed") ||
        (block == "whenClicked") || (block  == "wait:elapsed:from:") ||
        (block  == "doForever") || (block  == "doRepeat")||
        (block  == "broadcast:") || (block == "whenIReceive") ||
        (block  == "doForeverIf") || (block  == "doIf") ||
        (block  == "doUntil") || (block  == "doReturn") || (block  == "stopAll") ||
        (block  == "doIfElse") || (block  == "doWaitUntil")){

            controle++;
    //aparencia
    }else if ((block  == "goBackByLayers:") || (block == "comeToFront") ||
        (block == "hide") || (block == "show") || (block =="setSizeTo:") ||
        (block == "changeSizeBy:") || (block == "filterReset") || (block == "setGraphicEffect:to:") ||
        (block == "changeGraphicEffect:by:") || (block == "think:") || (block == "think:duration:elapsed:from:") ||
        (block == "say:") || (block == "say:duration:elapsed:from:") || (block =="nextCostume") ||
        (block == "lookLike:") || (block == "scale") || (block == "costumeIndex")){

           aparencia++;
    //sensores
    } else if ((block  == "mousePressed") || (block=="doAsk") || (block=="color:sees:") ||
              (block == "touchingColor:") || (block =="touching:") || (block=="keyPressed:") ||
              (block == "distanceTo:") || (block=="timerReset") || (block == "getAttribute:of:") ||
              (block == "sensorPressed:") || (block=="sensor:") || (block == "isLoud") || (block=="soundLevel") ||
              (block=="timer") || (block=="answer") ){

           sensores++;
    //operadores
    } else if(( block == "computeFunction:of:") || ( block =="rounded") || (block=="\\") ||
        (block == "stringLength:") || (block =="letter:of:") || (block == "concatenate:with:") || (block == "&") ||
        (block == "not") || (block == "|") || (block == ">") || (block == "=") || (block == "<") || (block == "randomFrom:to:") || (block == "/") ||
        (block == "*") || (block == "-") || (block == "+")){

           operadores++;
     //variaveis
    }else if(( block == "hideVariable:") || (block =="showVariable:") || (block == "changeVar:by:") ||
            (block == "setVar:to:") || (block == "readVariable") ){

           variaveis++;

    //caneta
    }else if((block == "penSize:") || (block == "changePenSizeBy:") || (block == "setPenShadeTo:") ||
            (block == "changePenShadeBy:") || (block == "setPenHueTo:") || (block == "changePenHueBy:") ||
            (block == "stampCostume") || (block == "penColor:") || (block == "putPenUp") || (block == "putPenDown") ||
            (block == "clearPenTrails") ){

           caneta++;

     //som
    }else if((block == "setTempoTo:") || (block == "changeTempoBy:") || (block == "setVolumeTo:") || (block == "changeVolumeBy:") ||
             (block == "midiInstrument:") || (block == "rest:elapsed:from:") || (block == "noteOn:duration:elapsed:from:") ||
             (block == "drum:duration:elapsed:from:") || (block == "volume") || (block == "tempo") || (block == "stopAllSounds") ||
             (block == "doPlaySoundAndWait") || (block == "playSound:")){

           som++;

     }

}




