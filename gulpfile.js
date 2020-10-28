let projectFolder = "dist";
let sourceFolder = "src";

let path = {
  build:{
    html:`${projectFolder}/`,
    css:`${projectFolder}/css/`,
    js:`${projectFolder}/js/`,
    img:`${projectFolder}/img/`,
    fonts:`${projectFolder}/fonts/`,
    icons:`${projectFolder}/icons/`,
    layouts:`${projectFolder}/layouts/`,
  },
  src:{
    html:[`${sourceFolder}/*.html`,`!${sourceFolder}/_*.html`],
    css:`${sourceFolder}/scss/style.scss`,
    js:`${sourceFolder}/js/**/*.js`,
    img:`${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    fonts:`${sourceFolder}/fonts/*.ttf`,
    icons:`${sourceFolder}/icons/**/*.{jpg,png,svg,gif,ico,webp}`,
    layouts:`${sourceFolder}/layouts/**/*.html`,
  },
  watch:{
    html:`${sourceFolder}/**/*.html`,
    css:`${sourceFolder}/scss/**/*.scss`,
    js:`${sourceFolder}/js/**/*.js`,
    img:`${sourceFolder}/img/**/*.{jpg,png,svg,gif,ico,webp}`,
    icons:`${sourceFolder}/icons/**/*.{jpg,png,svg,gif,ico,webp}`,
    layouts:`${sourceFolder}/layouts/**/*.html`,
  },
  clean:`./${projectFolder}/`,
}

const {src,dest} = require('gulp'),
      gulp = require('gulp'),
      browsersync = require('browser-sync').create(),
      fileinclude = require('gulp-file-include'),
      del = require('del'),
      scss = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      groupMedia = require('gulp-group-css-media-queries'),
      cleanCss = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify-es').default,
      imagemin = require('gulp-imagemin'),
      babel = require('gulp-babel');

function browserSync(){
  browsersync.init({
    server:{
      baseDir:`./${projectFolder}/`
    },
    port:3000,
    notify:false
  })
}

function html(){
  return src(path.src.html)
     .pipe(fileinclude())
     .pipe(dest(path.build.html))
     .pipe(browsersync.stream())
}

function layouts(){
  return src(path.src.layouts)
    .pipe(dest(path.build.layouts))
    .pipe(browsersync.stream())
}

function css(){
  return src(path.src.css)
    .pipe(scss({
      outputStyle:"expanded"
    }))
    .pipe(groupMedia())
    .pipe(autoprefixer({
      overrideBrowserslist:["last 5 versions"],
      cascade:true
    }))
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
      extname:".min.css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js(){
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname:".min.js"
    }))
    .pipe(babel({
      presets: ['@babel/env']
  }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images(){
  return src(path.src.img)
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 3,
      svgoPlugins: [{removeViewBox: false}
    ]
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function icons(){
  return src(path.src.icons)
    .pipe(dest(path.build.icons))
    .pipe(browsersync.stream())
}

function watchFiles(){
  gulp.watch([path.watch.html],html);
  gulp.watch([path.watch.layouts],layouts);
  gulp.watch([path.watch.css],css);
  gulp.watch([path.watch.js],js);
  gulp.watch([path.watch.img],images);
  gulp.watch([path.watch.icons],icons);
}

function clean(){
  return del(path.clean)
}

let build = gulp.series(clean,gulp.parallel(js,css,html,layouts,images,icons));
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.icons = icons;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.layouts = layouts;
exports.build = build;
exports.watch = watch;
exports.default = watch;