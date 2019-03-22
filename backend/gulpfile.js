const gulp = require('gulp');
const ts = require('gulp-typescript');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});


gulp.task('watch', gulp.series(['ts']), () => {
  gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('assets', () => {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('webresources', () => {
    return gulp.src(['src/web/**/*'], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
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

gulp.task('default',  gulp.series(['watch', 'assets', 'webresources']), () => {});

gulp.task('scripts',  gulp.series(['ts', 'webresources']), () => {});