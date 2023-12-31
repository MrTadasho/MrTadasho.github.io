var clockHolder = document.getElementById("clockHolder");
var tileHolder = document.getElementById("tileHolder");
var ClockTile=document.getElementById('clocktile');
var textHolder=document.getElementById('textHolder');

var matiereObj = document.getElementById("form-matiere");
var groupeObj = document.getElementById("form-groupe");
var professeurObj = document.getElementById("form-professeur");
var dureeObj = document.getElementById("form-duree");
var dureeAnticipeObj2=0;
var dureeTiersObj2 = 0;
var dureeDebutObj= document.getElementById('form-duree-deb');
var dss = [[ClockTile,null,null,null,null,null,null,null,'',false],[textHolder,null,null,null,null,null,null,null,'',false]];
var selecteds = [false,false];
var lockds = [true,true];
var tileList= [null,null];
var AllTile=[null,null];

var dsIsRunning = false;
var dsStatusButton = document.getElementById("statusButton");
var IsDeleted=false;

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  clockHolder.innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
    var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function updateTime(k) {
  if(k==00){
	  return("00")
  }
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

tileHolder.appendChild(ClockTile);
tileHolder.appendChild(textHolder);
function createTile() {
	AllTile.push([1,2,3,4]);
	dureeTiersObj2 = addTemps(document.getElementById("form-duree").value.split(":"),getTiers(document.getElementById("form-duree").value.split(":")));
    dureeAnticipeObj2 = addTemps(getTiers(document.getElementById("form-duree").value.split(":")),getTiers(document.getElementById("form-duree").value.split(":"))); 
	var tile = document.createElement("div");
    tile.className = "card text-black bg-white mb-3 mx-2 col-sm col-xs-12";
	tile.idName = "box";
	tile.style.position="relative";

    var header = document.createElement("div");
    header.className = "card-header d-flex align-items-center";


    header.innerHTML = '<p class="my-1 uptiletext">DSHERE</p><div class="form-check ml-imp-1"><input class="form-check-input" type="checkbox" value="' + (selecteds.length + 1) + '" id="flexCheckDefault" checked onclick="changeselect(this.value);" /></div><div class="form-check ml-imp-1"><input class="form-check-input" type="checkbox" value="' + (selecteds.length + 1) + '" id="flexCheckDefault" unchecked onclick="changelock(this.value);" /></div>';
    header.innerHTML = header.innerHTML.replace("DSHERE", matiereObj.value);

    var bodyTile = document.createElement("div");
    bodyTile.className = "card-body";

	var tileStart = document.createElement("div");
	tileStart.className = "card-pairs";
	var tileEnd = document.createElement("div");
	tileEnd.className = "card-pairs";
	var tilePreview = document.createElement("div");
	tilePreview.className = "card-pairs";
	var tileTier = document.createElement("div");
	tileTier.className = "card-pairs";
    var title = document.createElement("h5");
    title.className = "card-title secondtiletext";
    title.innerHTML = professeurObj.value;
	var boutton = document.createElement("button");
	boutton.className ="btn btn-outline-dark";
	boutton.innerHTML="";
	boutton.id=selecteds.length;
	boutton.style.display="inline-block";
	boutton.addEventListener('click',function(){if(lockds[this.id]==false){tileStart.remove();AllTile[this.id].shift();testTile(AllTile[this.id],this.id);}});
	var startTime = document.createElement("p");
    startTime.className = "card-text my-1 texttiletext";
    startTime.innerHTML = "<i>Heure de début: </i>" + "<b><u>En attente</u></b>";
    startTime.id = "starttime-" + (selecteds.length + 1);
	startTime.style.display="inline-block";
	startTime.style.marginLeft="10px";
	var boutton2 = document.createElement("button");
	boutton2.className ="btn btn-outline-dark";
	boutton2.id=selecteds.length;
	boutton2.innerHTML="";
	boutton2.style.display="inline-block";
	boutton2.addEventListener('click',function(){if(lockds[this.id]==false){tileEnd.remove();AllTile[this.id].shift();testTile(AllTile[this.id],this.id);}});
	var endTime = document.createElement("p");
    endTime.className = "card-text my-1 texttiletext";
    endTime.innerHTML = "<i>Heure de fin: </i>" + "<b><u>En attente (" + dureeObj.value.replace(":", "h") + ")</u></b>";
    endTime.id = "endtime-" + (selecteds.length + 1);
	endTime.style.display="inline-block";
	endTime.style.marginLeft="10px";
	var boutton3 = document.createElement("button");
	boutton3.className ="btn btn-outline-dark";
	boutton3.id=selecteds.length;
	boutton3.innerHTML="";
	boutton3.style.display="inline-block";
	boutton3.addEventListener('click',function(){if(lockds[this.id]==false){tilePreview.remove();AllTile[this.id].shift();testTile(AllTile[this.id],this.id);}});
	var previewEndTime = document.createElement("p");
    previewEndTime.className = "card-text my-1 texttiletext";
    previewEndTime.innerHTML = "<i>Sortie anticipée: </i>" + "<b><u>En attente (" + fusionTemps(dureeAnticipeObj2).replace(":", "h") + ")</u></b>";
    previewEndTime.id = "previewendtime-" + (selecteds.length + 1);
    previewEndTime.style.display="inline-block";
	previewEndTime.style.marginLeft="10px";
	var boutton4 = document.createElement("button");
	boutton4.className ="btn btn-outline-dark";
	boutton4.id=selecteds.length;
	boutton4.innerHTML="";
	boutton4.addEventListener('click',function(){if(lockds[parseInt(this.id)]==false){tileTier.remove();AllTile[parseInt(this.id)].shift();testTile(AllTile[parseInt(this.id)],parseInt(this.id));}});
	boutton4.style.display="inline-block";
	var tiersEndTime = document.createElement("p");
    tiersEndTime.className = "card-text my-1 texttiletext";
    tiersEndTime.innerHTML = "<i>Tiers-temps: </i>" + "<b><u>En attente (" + fusionTemps(dureeTiersObj2).replace(":", "h") + ")</u></b>";
    tiersEndTime.id = "tiersendtime-" + (selecteds.length + 1);
	tiersEndTime.style.display="inline-block";
	tiersEndTime.style.marginLeft="10px";
	var dstp=[];
	for(var i=0;i<nbttsup;i++){
		var n =document.getElementById("form-temps-supp "+nbttsup);
		var res=addTemps(dureeObj.value.split(':'),getTiers(dureeObj.value.split(':'),n));
		var tiersEndTime2 = document.createElement("p");
		tiersEndTime2.className = "card-text my-1 texttiletext";
		tiersEndTime2.innerHTML = "<i>Tiers-temps: </i>" + "<b><u>En attente (" + fusionTemps(res).replace(":", "h") + ")</u></b>";
		tiersEndTime2.id = "tiersendtime-" + (selecteds.length + 1);
		tiersEndTime2.style.display="inline-block";
		tiersEndTime2.style.marginLeft="10px";
		dstp.push([tiersEndTime2,res]);
	}
    tile.appendChild(header);
	bodyTile.appendChild(title);
	tileStart.appendChild(boutton);
    tileStart.appendChild(startTime);
	bodyTile.appendChild(tileStart);
	tileEnd.appendChild(boutton2);
	tileEnd.appendChild(endTime);
    bodyTile.appendChild(tileEnd);
	console.log(dureeAnticipeObj2);
	console.log(dureeTiersObj2);
    if (dureeAnticipeObj2[0] >= 1) {
	  tilePreview.append(boutton3);
	  tilePreview.append(previewEndTime);
      bodyTile.appendChild(tilePreview);
    }
    if (dureeTiersObj2.value != "") {
	  tileTier.append(boutton4);
	  tileTier.append(tiersEndTime);
      bodyTile.appendChild(tileTier);
    } 

    tile.appendChild(bodyTile);

    tileHolder.appendChild(tile);
	tileList.push([tile,header,bodyTile,title,startTime,endTime,previewEndTime,tiersEndTime])
    dss.push([tile, dureeObj.value.split(":"), dureeAnticipeObj2, dureeTiersObj2, startTime, endTime, previewEndTime, tiersEndTime,dureeDebutObj.value.split(":"),false])
	selecteds.push(true);
	lockds.push(false);

}

function buttonDS() {

  if (dsIsRunning) {
    pauseDS();
  } else {
    startDS();
  }

}

function startDS() {
  //dsStatusButton.innerHTML = "Mettre en pause le DS";
  //dsIsRunning = true;
  
  for (var i = 0; i < selecteds.length; i++) {
    if (selecteds[i]) {
	  if(lockds[i]==false){
      var a = dss[i][4];

      var date = new Date(); /* creating object of Date class */
      var origindate = new Date();
	  if(dss[i][8]!=''){
		  origindate.setHours(dss[i][8][0]);
		  origindate.setMinutes(dss[i][8][1]);
		  origindate.setSeconds(dss[i][8][2]);
	  }
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
	  if(dss[i][8]==''){
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);}
	  else{
	  hour=dss[i][8][0];
	  min=dss[i][8][1];
	  sec=dss[i][8][2];
	  hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
	  }
      a.innerHTML = "<i>Heure de début: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  var date2 = new Date();
	  date2.setHours(hour);
	  date2.setMinutes(min);
	  date2.setSeconds(sec);
      date.setTime(date2.getTime() + (parseInt(dss[i][1][0]) * 60+ parseInt(dss[i][1][1])) * 60 * 1000);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][5].innerHTML = "<i>Heure de fin: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  
      date.setTime(origindate.getTime() + (parseInt(dss[i][2][0]) * 60 + parseInt(dss[i][2][1])) * 60 * 1000);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][6].innerHTML = "<i>Sortie anticipée: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";

      date.setTime(origindate.getTime() + (parseInt(dss[i][3][0]) * 60 + parseInt(dss[i][3][1])) * 60 * 1000);
      hour = date.getHours();
      min = date.getMinutes();
      sec = date.getSeconds();
      hour = updateTime(hour);
      min = updateTime(min);
      sec = updateTime(sec);
      dss[i][7].innerHTML = "<i>Tiers-temps: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  /*for(var i=0;i<nbttsup;i++){
		  date.setTime(origindate.getTime() + (parseInt(dss[i][3][0]) * 60 + parseInt(dss[i][3][1])) * 60 * 1000);
		  hour = date.getHours();
		  min = date.getMinutes();
		  sec = date.getSeconds();
		  hour = updateTime(hour);
		  min = updateTime(min);
		  sec = updateTime(sec);
		  dss[i][7].innerHTML = "<i>Tiers-temps: </i><b><u>" + hour + ":" + min + ":" + sec + "</u></b>";
	  }*/

	  }
    }
  }
}

function pauseDS() {
  dsStatusButton.innerHTML = "Démarrer le DS";
  dsIsRunning = false;
}

function changeselect(k) {
  selecteds[k - 1] = !selecteds[k - 1];
}
function changelock(k){
	lockds[k-1] = !lockds[k-1];
}

function delTile(){
	for (var i = 0; i < selecteds.length; i++) {
		if (selecteds[i]) {
			if (lockds[i]==false){
			for(var j=0; j< tileList[i].length;j++){
				tileList[i][j].remove();
			}}
			dss[i][9]=true;
		}
	}
}

//card text-black bg-white mb-3 mx-2 col-sm col-xs-12
function getTiers(k,n=3){
	var heureTier = k[0];
	var heureTierdef = 0;
	var minTier = k[1];
	var minTierdef = 0;
	var secTier = k[2];
	var secTierdef = 0;
	var ListeHeure = [];
	heureTierdef=Math.floor(heureTier/n);
	minTierdef=Math.floor(minTier/n)+(heureTier%n)*20;
	secTierdef=Math.floor(secTier/n)+(minTier%n)*20;
	ListeHeure.push(updateTime(heureTierdef));
	ListeHeure.push(updateTime(minTierdef));
	ListeHeure.push(updateTime(secTierdef));
	return ListeHeure;
}
function addTemps(k,x){
	var h1=parseInt(k[0]);
	var h2=parseInt(x[0]);
	var m1=parseInt(k[1]);
	var m2=parseInt(x[1]);
	var s1=parseInt(k[2]);
	var s2=parseInt(x[2]);
	var hf=0;
	var mf=0;
	var sf=0;
	hf=h1+h2+Math.floor((m1+m2)/60);
	mf=((m1+m2)%60)+Math.floor((s1+s2)/60);
	sf=((s1+s2)%60);
	return([updateTime(hf),updateTime(mf),updateTime(sf)]);
}
function fusionTemps(k){
	var res=k[0].toString();
	for(var i=1;i<k.length;i++){
		res=res+":"+k[i].toString();
	}
	return(res)
}
function testTile(k,i){
	if(k.length==0){
		for(var j=0; j< tileList[i].length;j++){
				tileList[i][j].remove();
			}
		dss[i][8]=true;
	}
}
var fontclo = 79
function fontplus(){
	clockHolder.style.fontSize=fontclo+2+'px';
	fontclo+=2;
}
function fontmoins(){
	clockHolder.style.fontSize=fontclo-2+'px';
	fontclo-=2;
}
var yd=0;
var yf=0;
var d= document.getElementById('selctpose');
d.addEventListener('mousedown',function(event){
	yd = event.clientY;
});
d.addEventListener('mouseup', function(event) {
  yf = event.clientY;
  move(yd,yf);
});
function move(y1,y2){
	console.log('a');
	var div1=null;
	var n2=null;
	var n1=null;
	var fin=false;
	for(var i=0;i<dss.length;i++){
		if(dss[i][9]==false){
			const myDiv = dss[i][0];
			const rect = myDiv.getBoundingClientRect();
			const bottomY = rect.top + rect.height;
			const topY = rect.top;
			if(y1>=topY && y1<= bottomY){
				div1=myDiv;
				n1=i;
			}
			if(y2>=topY && y2<= bottomY){
				n2=i;
			}
			if(i==dss.length-1){
				if(y2>=bottomY){
					fin=true;
					n2=i;
				}
			}
		}
	}
	if(div1==null){
		return;
	}
	if(n2==null && fin==false){
		return;
	}
	tileHolder.removeChild(div1);
	if(fin){
		tileHolder.appendChild(div1);
		var stock=dss[n1];
		dss.splice(n1,1);
		dss.splice(0,0,stock);
	}
	else{
	tileHolder.insertBefore(div1, tileHolder.childNodes[n2]);
	var stock=dss[n1];
	dss.splice(n1,1);
	dss.splice(n2,0,stock);
	}
	}
	
const colorPicker = document.querySelector('#exampleColorInput');
colorPicker.addEventListener('change', function() {
	console.log(colorPicker.value);
    const selectedColor = colorPicker.value;
	const div=document.getElementById('exampleFormControlTextarea1');
    div.style.color=selectedColor; // Output the selected color to the console
  });
const textfontsize = document.getElementById('form-police');
textfontsize.addEventListener('change',function(){
	const div=document.getElementById('exampleFormControlTextarea1');
	div.style.fontSize=this.value+'px';
});
const sizefamily=document.getElementById('form-family');
sizefamily.addEventListener('change',function(){
	const div=document.getElementById('exampleFormControlTextarea1');
div.style.fontFamily=this.value;});
var bold=false;
var under=false;
var ital=false;
var shdpe=false;
function gras(){
	const div=document.getElementById('exampleFormControlTextarea1');
	if(!bold){
	div.style.fontWeight="bold";
	bold=true;}
	else{
		div.style.fontWeight="normal";
	bold=false;
	}
}
function sous(){
	const div=document.getElementById('exampleFormControlTextarea1');
	if(!under){
	div.style.textDecoration="underline";
	under=true;}
	else{
	div.style.textDecoration="none";
	under=false;
	}
}
function itali(){
	const div=document.getElementById('exampleFormControlTextarea1');
	if(!ital){
	div.style.fontStyle = 'italic';
	ital=true;}
	else{
	div.style.fontStyle="normal";
	ital=false;
	}
}
function shodepe2(){
	if(shdpe){
		shdpe=false;
		const div = document.getElementById('changecolor');
		div.style.visibility='hidden';
	}
	else{
		shdpe=true;
		const div = document.getElementById('changecolor');
		div.style.visibility='visible';
	}
}
var isHide=false;
function Hide(){
	var but = document.getElementById('hide');
	var lis = [bplus,bmns,shodepe,bpl,statusButton,statusButton2];
	for(var i=0;i<lis.length;i++){
		console.log(lis[i]);
		if(isHide){
		lis[i].style.visibility='visible';
		but.style.left="460px";
		}
		else{
		lis[i].style.visibility='hidden';
		but.style.left="20px";
	}
	}
	isHide=!isHide;
}
var nbttsup = "0";
function asktempssup(){
	var div = document.createElement('div'); 
	div.style.display="flex";
	div.style.marginTop="15px";
	var spana = document.createElement('span');
	spana.className="input-group-text";
	spana.id="basic-addon1";
	spana.innerHTML="Temps supplémentaire";
	var inputa = document.createElement('input');
	inputa.type="text";
	inputa.className="form-control";
	inputa.placeholder="Temps supplémentaire";
	inputa.id="form-temps-supp "+nbttsup;
	inputa.setAttribute('aria-describedby', 'basic-addon1');
	inputa.setAttribute('aria-label', 'Temps supplémentaire');
	div.appendChild(spana);
	div.appendChild(inputa);
	var divparent = document.getElementById('container');
	divparent.appendChild(div);
	alert(inputa.id);
	nbttsup=(parseInt(nbttsup)+1).toString();
}
currentTime();
//alert(document.getElementById('clockHolder').innerHTML);
//var date = new Date;
//var date2 = new Date;
//date2.setHours(23);
//date2.setMinutes(36);
//date2.setSeconds(0);
//alert(date);
//alert(date<date2);
//createTile();
