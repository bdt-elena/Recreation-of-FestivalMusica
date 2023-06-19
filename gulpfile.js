const {src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const {plumber} =require("gulp-plumber");
const autoprefixer = require('autoprefixer'); //Analiza si algo de css tiene soporte en otros navegadores
const cssnano = require('cssnano'); //comprime codigo css
const postcss = require('gulp-postcss');

//Imagenes
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const imagemin = require("gulp-imagemin");

function css(done){
   
    src('src/scss/**/*.scss')//Identificar el archivo SASS
        //.pipe(plumber) 
        .pipe(sass())   //Compila
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe(dest('build/css'))  //Almacenar en el disco duro

  
    done();
}

function images(done){

    const opcs = {
        optimizationLevel: 3 //Optimizamos las imagenes en un nivel 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opcs)))
        .pipe(dest("build/img"))

    done();
}

function imagestoWebp(done){

    const opcs = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opcs))
        .pipe(dest('build/img'))

    done();
}

function imagestoAvif(done){

    const opcs = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opcs))
        .pipe(dest('build/img'))

    done();
}

function javaScript(done){

    src("src/js/**/*.js")
        .pipe(dest('build/js'));

    done();
}
function dev(done){

    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javaScript);

    done();
}


exports.css = css;
exports.js = javaScript;
exports.images = images;
exports.imagestoWebp = imagestoWebp;
exports.imagestoAvif = imagestoAvif;
exports.dev = parallel(images, imagestoWebp, imagestoAvif, javaScript, dev);
/*function tarea(done){
    console.log("Mi primera tare");
    done();
}

exports.tarea = tarea;*/