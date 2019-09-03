const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

function buildCss() {
  return gulp.src('src/client/client.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
}

function buildJs() {
  return browserify('src/client/client.js')
    .bundle()
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
}

const server = require('./src/server/server');
const getDb = require('./src/server/db');
let db, running;
function serve() {
  db = db || getDb();
  const app = server({ db });
  function startServer() {
    running = app.listen(3000, () => {
      console.log('Listening at http://localhost:3000');
    });
  }
  if (running) {
    running.close(startServer);
  } else {
    startServer();
  }
}

function watchAll() {
  gulp.watch('src/client/client.scss', buildCss);
  gulp.watch('src/client/**/*.js', buildJs);
  serve();
  gulp.watch('src/server/**/*.js', serve);
  gulp.watch('dist/client.js', serve);
}

exports.build = gulp.parallel(buildCss, buildJs);
exports.serve = serve;
exports.watch = watchAll;
