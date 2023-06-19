document.addEventListener('DOMContentLoaded', function(){
    iniciarAPP();
});

function iniciarAPP(){

    headerFijo();
    crearGaleria();
    scrollNav();
};

function headerFijo(){

    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){

        console.log(sobreFestival.getBoundingClientRect());

        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        };
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.nav_principal a');

    enlaces.forEach( enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth"})
        })
    })
}

function crearGaleria(){
    const galeria = document.querySelector(".galeria-imagenes");

    for(let i=1; i<=12;i++){
        const imagen = document.createElement("picture");
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="./img/${i}.jpg" alt="Imagen Galería">
        `;

        imagen.onclick = function (){
            modalimg(i);
        }
        galeria.appendChild(imagen);
    };
    
};

function modalimg(id){

    const imagen = document.createElement("picture");
        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="./grande/${id}.jpg" alt="Imagen galeria">
        `;

    console.log(id);

    //creando overlay
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Boton para cerrar modal overlay img
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('boton-cerrar');

    closeModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    
    overlay.appendChild(closeModal);

    
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    
    //Agregando la foto al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}