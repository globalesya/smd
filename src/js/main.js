// /* ------------------------ *
//  *         CAROUSEL         *
//  *------------------------- */
let flickityCarousel = document.querySelectorAll('[data-flickity-carousel]');
let flickityConfig = {
	contain: true,
	cellAlign: 'center',
	prevNextButtons: false,
	wrapAround: true,
	pageDots: true,
	selectedAttraction: 0.2,
	friction: 0.8,
	groupCells: false,
	arrowShape: {
		x0: 0,
		x1: 45, y1: 50,
		x2: 50, y2: 45,
		x3: 10
	}
};

if (matchMedia('screen and (min-width: 1200px)').matches) {
	flickityConfig.draggable = false;
}

if (matchMedia('screen and (min-width: 768px)').matches) {
	flickityConfig.prevNextButtons = true;
	flickityConfig.cellAlign = 'left';
	flickityConfig.groupCells = true;
	flickityConfig.wrapAround = false;
	flickityConfig.pageDots  = false;
}

if (flickityCarousel) {
	flickityCarousel.forEach((element) => {
		new Flickity(element, flickityConfig);
	});
}


let flickityMobiCarousel = document.querySelector('.tariffs__carousel');

if (flickityMobiCarousel) {
	new Flickity(flickityMobiCarousel, {
		watchCSS: true,
		cellAlign: 'center',
		prevNextButtons: false,
		initialIndex: 1,
		pageDots: true,
		selectedAttraction: 0.2,
		friction: 0.8,
	});
}


// /* ------------------------ *
//  *  MAIN SLIDER             *
//  *------------------------- */

let flickityConfigSlider = {
	cellAlign: "center",
	contain: true,
	friction: 0.8,
	selectedAttraction: 0.2,
	wrapAround: true,
	prevNextButtons: true,
	arrowShape: {
		x0: 0,
		x1: 45, y1: 50,
		x2: 50, y2: 45,
		x3: 10
	}
};

if (matchMedia('screen and (min-width: 760px)').matches) {
	flickityConfigSlider.cellAlign = 'left';
	flickityConfigSlider.pageDots = false;
}

let elem = document.querySelector('.reviews__carousel');

if (elem) {
	new Flickity(elem, flickityConfigSlider);
}



window.onload = function() {
	let formName = document.querySelector('input[name=name]');
	let formEmail = document.querySelector('input[name=email]');
	let formMessage = document.querySelector('textarea[name=message]');

	document.querySelector('#send-message').onclick = function () {
		let params = 'name=' + formName.value + '&' +'email=' + formEmail.value + '&' + 'message=' + formMessage.value;
		ajaxPost(params);
	}
}


function ajaxPost(params) {
	let request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText == '1') {
				document.querySelector("#result").innerHTML = '<div class="grid-cell col-xs-4 col-sm-12">Сообщение успешно отправлено!</div>';
				document.querySelector(".js-form").style.display = 'none';
			} else {
				document.querySelector("#result").innerHTML = '<div class="grid-cell col-xs-4 col-sm-12">' + request.responseText + '</div>';
			}

		}
	}

	request.open('POST', 'http://smd.local/app_dev.php');
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send(params);
}