const gulp = require('gulp');
const ts = require('gulp-typescript');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});


gulp.task('watch', gulp.series(['scripts']), () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', () => {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

// gulp.task('test', () => gulp
//     .src('./build/test/**/*.js', { read: false })
//     .pipe(mocha({ 
//         reporter: 'spec',
//         timeout: 5000,
//         require: ['source-map-support/register'],
//     }))
//     .on('error', onErrorHandler)
// );

gulp.task('default',  gulp.series(['watch', 'assets']), () => {});