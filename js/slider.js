function slider(slider) {
	let contSlider = document.querySelector(slider);

	// Se recoge el número de imagenes que tiene el contenedor en una constante. Es necesario para iterar entre los elementos y darle funcionalidad.
	const imagesCount = contSlider.children.length - 1;
	// console.log('imagesCount: ' + imagesCount);

	// Se añade a contendor de las imágenes la clase slider-itt que contiene los estilos creados para el slider.
	contSlider.classList.add("slider-itt");

	// Se recoge los elementos hijos del contenedor en una variable. Children devuelve una colección Viva de elementos hijos del nodo. El contendor debe tener como nodos hijos img o nodos con imágenes.
	images = contSlider.children;

	// Se recorre la coleción y se añade a cada elemento las clases que se aplicaran para que contienen los stylos propios definidos para las imágenes del slider.
	for (let i = 0; i < images.length; i++) {
		images[i].classList.add('images', `img_${i}`);

		// Se captura la etiqueta Alt de cada imagen y se añade como un elemento <span> para mostrarlo tambíen en el slider.
		images[i].innerHTML+= `<span class="tit">${images[i].getElementsByTagName('img')[0].getAttribute('alt')}</span>`;
	}

	// Compruebo por consola el contenido de de la colección con los estilos aplicados. Al ser una collección viva, apareceran los siguientes elementos que insertamos en el DOM necesarios para el funcionamiento del slider, como los controles y la lista con los dots o puntos que indicaran que imagen está activa en ese momento.
		// console.log(images);

	// Controles
		// Creo un template para los botones que controlaran el slider que se cargara al leer el slider.

		// Botones de paginación.
			let extraHtml = `
				<div class="prev"><i class="arrow-right"></i><span class="imageMini"><img src="#"/></span></div>
				<div class="next"><i class="arrow-left"></i><span class="imageMini"><img src="#"/></span></div>
			`;

		// Paginación (dots)
			// Apertura del ul.
			extraHtml 	+= '<ul class="dots">';

			// Se crean los li. Se añaden tantos elementos como imagenes cotiene el elemento padre.
			for (let i = 0; i < images.length; i++) {
				extraHtml 	+= `<li class="dot img_${i}"></li>
				`;
			}
			// Cierrre del ul
	 		extraHtml 	+= "</ul>";

		// Se inserta los controles en el DOM
		contSlider.innerHTML += extraHtml;

		// Una vez creado se capturan
		let prev = contSlider.querySelector('.prev');
		let next = contSlider.querySelector('.next');
		// Con querrySelectorAll me devuelve un array de todos los elementos que contienen la clase .dot, es decir todos los li de la paginación.
		let dots = contSlider.querySelectorAll('.dot');

		// Compruebo por consola el contenido de las variables declaradas.
			// console.log(prev);
			// console.log(next);
			// console.log(dots);

		// Se añade la clase active para empezar en un elemnto aleatorio del slider.
			// Se genera un numero aleatorio.
			let imageActivePosition = parseInt(Math.random()*5);
			// console.log(aleatorio);

			// Se le añade al elemento en la posición del numero aleatorio la clase active, para mostrar el primer elemento.
			images[imageActivePosition].classList.add('active');
			dots[imageActivePosition].classList.add('active');
			prenextImage();

			// Se recoge la imagen activa en este momento, así como el dot activo que indica su posición.
			let imageActive = images[imageActivePosition],
				dotActive = dots[imageActivePosition];

		// Funcionalidad de los controles. Botones Prev(anterior) y Next(siguiente).
			// Compruebo por consola si pasa por la función y la imagen activa antes y despudes.
			prev.addEventListener('click', function () {
				// console.log('pasa Prev');
				let index = imageActiveIndex();
				if ((index <= imagesCount) && (index > 0)) {
					addClassActive(index - 1);
					// console.log(imageActiveIndex());
				} else {
					addClassActive(imagesCount);
					// console.log(imageActiveIndex());
				}
			});

			next.addEventListener('click', function () {
				// console.log('Pasa Next');
				let index = imageActiveIndex();
				if ((index < imagesCount) && (index >= 0)) {
					addClassActive(index + 1);
					// console.log(imageActiveIndex());
				} else {
					addClassActive(0);
					// console.log(imageActiveIndex());
				}
			});

		// Controles. Paginación. Dots. Utilio un forEach para recorrer el array, esta forma con Arrow Functions, y se le asigna a cada uno el evento que activara la imagen correspondiente. i seria el indice en el foreach.
		dots.forEach((element, i) => {
			// console.log(element);
			// Se añade una previsualización al dots para mostrar en el hover la imagen que se mostrará en el slider.
			element.innerHTML = `<span class="imageMini"><img src="${images[i].getElementsByTagName('img')[0].src}"/></span>`;
			// console.log(images[i].getElementsByTagName('img')[0].src);

			// Se crea un evento click para todos los dos para que al hacer click active la foto correspondiente.
			// Como la función tiene argumento, tengo que implementarla en el evento mediante callback, llamandola a través de una función anonima.
			element.addEventListener('click', function () {
				//console.log(`Pasa dots: ${i}`);
  				addClassActive(i);
			});
		});

		// Función que muestra la imagen en el prev y next.
			function prenextImage() {
				if ((imageActivePosition < imagesCount) && (imageActivePosition != 0)) {
					next.getElementsByTagName('img')[0].src = images[imageActivePosition + 1].getElementsByTagName('img')[0].src;
					prev.getElementsByTagName('img')[0].src = images[imageActivePosition - 1].getElementsByTagName('img')[0].src;
				}
				else if (imageActivePosition === imagesCount) {
					next.getElementsByTagName('img')[0].src = images[0].getElementsByTagName('img')[0].src;
					prev.getElementsByTagName('img')[0].src = images[imageActivePosition - 1].getElementsByTagName('img')[0].src;
				}
				else {
					next.getElementsByTagName('img')[0].src = images[imageActivePosition + 1].getElementsByTagName('img')[0].src;
					prev.getElementsByTagName('img')[0].src = images[imagesCount].getElementsByTagName('img')[0].src;
				}
			}

		// Función que retorna la posición de la imagen activa
			function imageActiveIndex() {
				let i = imageActive.className.indexOf('img_') + 4;
				let index = imageActive.className.slice(i, i + 1);
				//console.log(imageActive.className);
				//console.log(index);
				return parseInt(index);
			}

	// Funcion para activar la imagen.
		function addClassActive (i) {
			// Se Elimina la clase activa al elemento actual
			imageActive.classList.remove('active');
			dotActive.classList.remove('active');

			// Se le asigna la clase activa al nuevo elemento
			images[i].classList.add('active');
			dots[i].classList.add('active');
			next.getElementsByTagName('img')[0].src = images[i+1].getElementsByTagName('img')[0].src;

			// Se guardan el nuevo elemento activo
			imageActive = images[i];
			dotActive = dots[i];
			imageActivePosition = i;
			prenextImage();
		}

	// Funciónes para ejecutar el slider en modo automatico cuando el raton esta fuera del contenedor, y se para cuando el ratón está dentro.
		// Ejecuta el slider de modo automático. Pasamos la función setInternal por variable para poder realizar la interruión del setInteval con clearInteval.
		function autoSlider(){
			auto = setInterval(function () {
				//console.log('Pasa automatic');
				if (imageActivePosition < imagesCount) {
					addClassActive(imageActivePosition + 1);
				}
				else {
					addClassActive(0);
					imageActivePosition = 0;
				}
			}, 4000);
			auto;
		}
		// Se inicializa la variabale auto a 0 y se ejecuta la función para arrancar el modo automático.
		let auto = 0;
		autoSlider();

		// Se utiliza mouseleave y mouseenter porque el contenedor padre tiene nodoos hijos.
		// Cuando el raton esta fuera del contendor del slider, se ejecuta la función y arranca el modo automático.
		contSlider.addEventListener('mouseleave', function () {
			//console.log('raton out');
			// console.log(autoSlider);
			autoSlider();
		});

		// Cuando el ratón esta dentro del contendor del slider, se para la ejecución del setInterval() con clearInterval(auto) y retorna 1. Se inicializa luego a 0 para que cuando el ratón este fuera del contenedor del slider se vuelva a activar el modo automático.
		contSlider.addEventListener('mouseenter', function () {
			//console.log('raton over');
			clearInterval(auto);
			auto = 0;
		});}

// Se lanza la función slider pasandole como argumento la clase del div que contiene las imágenes para realizar el slider.
slider('.slider');