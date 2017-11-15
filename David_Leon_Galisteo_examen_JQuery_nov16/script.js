var contadorNubes = 0; //se contará el total de nubes creadas
var contadorTractores = 0;
var contadorBarcos = 0;
var clickedWind = false; //booleano para parar o animar las nubes
var clickedSun = false;
var haceViento = false;
var haceSol = false;

$(document).ready(function() {
	//llama a la función "cambiaColor" al modificar el valor
  $("#colorCielo").change(cambiarColor);
  $("#nubeBtn").on("click", addCloud);
  $("#windBtn").on("click", viento);
  $("#sunBtn").on("click", derretir);
  $("#seaBtn").on("click", mar);
  $("#fieldBtn").on("click", campo);
  $("#tractorBtn").on("click", addTractor);
  $("#boatBtn").on("click", addBoat);
});

function cambiarColor() {
	//cambia el color del cielo según el VALor que tenga el input type="color"
	$("#cielo").css("background-color", $("#colorCielo").val());
}

function addCloud() {
	var nube = $("<div></div>").addClass("nube");

	var x = parseInt(Math.random()*637) + 10; //posicion aleatoria de la nube 
	var y = parseInt(Math.random()*123);
	nube.css({top: y, left: x}); //modificamos las coordenadas de la nube

	contadorNubes++; //aumentamos en 1 por cada nube creada
	$("#cuentaNubes").text(contadorNubes);//cambiamos el contador en el documento HTML

	$("#cielo").append(nube); //añadimos la nube al documento

	if (haceViento) {
		viento();
	} else if (haveSol) {
		derretir();
	}
}

function viento() {
	var wind = $("<div></div>").addClass("viento");

	$("#cielo").append(wind);

	if (!clickedWind) { //si AÚN NO se ha hecho click en la nube, se inicia la animación
		$(".nube").animate({left: 647}, 2000);
		$(".viento").css("opacity", "1");
		clickedWind = true;	
		haceViento = true;	
	} else { //si YA se ha hecho click en la nube, se para la animación
		$(".nube").stop();
		$(".viento").css("opacity", "0");
		clickedWind = false;
		haceViento = false;
	}	
}

function derretir() {
	var sun = $("<div></div>").addClass("sol");
	$("#cielo").append(sun);

	
	if (!clickedSun) { //si AÚN NO se ha hecho click en la nube, se inicia la animación
		$(".nube").animate({opacity: 0}, 3000); //hace desaparecer las nubes POCO A POCO
		$(".sol").css("opacity", "1");
		clickedSun = true;
		haceSol = true;
	} else { //si YA se ha hecho click en la nube, se para la animación
		$(".nube").stop();
		$(".sol").css("opacity", "0"); //oculta al sol
		clickedSun = false;
		haceSol = false;
	}
}

function mar() {
	//se resetea todo lo que tenga que ver con los tractores///////////	
	
	$("#tractorBtn").css("opacity", "0");
	$("#cuentaTractores").css("opacity", "0");
	$(".tractor").stop();

	if (contadorTractores > 1) {
		$(".tractor").fadeOut(2000, function() {
			$("#suelo").css("background-image", "url(img/sea.png)");
		});	
	} else {
		$("#suelo").css("background-image", "url(img/sea.png)");
	}
	
	contadorTractores = 0;
	$("#contadorTractores").text("Barcos creados: " + contadorTractores);
	///////////////////////////////////////////////////////////////////	
	
	$("#boatBtn").css("opacity", "1");
	$("#cuentaBarcos").css("opacity", "1");
	
}

function campo() {
	//se resetea todo lo que tenga que ver con los barcos////////////

	$("#boatBtn").css("opacity", "0");
	$("#cuentaBarcos").css("opacity", "0");
	$(".boat").stop();

	if (contadorBarcos > 1) {
		$(".boat").fadeOut(2000, function() {
			$("#suelo").css("background-image", "url(img/field.jpg)");
		});	
	} else {
		$("#suelo").css("background-image", "url(img/field.jpg)");
	}
		
	contadorBarcos = 0;
	$("#contadorBarcos").text("Barcos creados: " + contadorBarcos);
	//////////////////////////////////////////////////////////////	
	
	$("#tractorBtn").css("opacity", "1");
	$("#cuentaTractores").css("opacity", "1");
}

function addTractor() {
	var tractor = $("<div></div>").addClass("tractor");

	var x = parseInt(Math.random()*637) + 10; //posicion aleatoria del tractor
	var y = parseInt(Math.random()*305) + 200;
	tractor.css({top: y, left: x}); //modificamos las coordenadas del tractor

	contadorTractores++; //aumentamos en 1 por cada nube creada

	//cambiamos el contador en el documento HTML
	$("#cuentaTractores").text("Tractores creados: " + contadorTractores);


	$("#suelo").append(tractor); //añadimos la nube al documento


	
	//tiempo aleatorio del movimiento de los vehículos
	var tiempo = parseInt(Math.random()*4000)+1000; 

	animacion(); 

	function animacion() { //hacemos que el tractor se mueva de izquierda a derecha contínuamente
		tractor.animate({left: 1}, tiempo, function() {
		tractor.animate({left: 649}, tiempo, animacion);
		});
	}	
}


function addBoat() { //añade barco
	var barco = $("<div></div>").addClass("boat");

	var x = parseInt(Math.random()*637) + 10; //posicion aleatoria del barco
	var y = parseInt(Math.random()*290) + 200;
	barco.css({top: y, left: x}); //modificamos las coordenadas del barco

	contadorBarcos++; //aumentamos en 1 por cada nube creada

	//cambiamos el contador en el documento HTML
	$("#cuentaBarcos").text("Tractores creados: " + contadorBarcos);


	$("#suelo").append(barco); //añadimos la nube al documento

	//tiempo aleatorio del movimiento de los vehículos
	var tiempo = parseInt(Math.random()*4000)+1000; 

	animacion(); 

	function animacion() { //hacemos que el tractor se mueva de izquierda a derecha contínuamente
		barco.animate({left: 1}, tiempo, function() {
		barco.animate({left: 649}, tiempo, animacion);
		});
	}

}