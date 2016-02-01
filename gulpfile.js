/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 */

'use strict';

//TODO: Optimize tasks


// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var debug = require('gulp-debug');
var inject = require('gulp-inject');
var ngannotate = require('gulp-ng-annotate')
var concat = require('gulp-concat');
var deploy = require('gulp-gh-pages');
var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

/**
 * Push build to gh-pages
 */
gulp.task('pages', function () {
  return gulp.src("pages/**/*")
    .pipe(deploy())
});



// This will run in this order: 
// * build-clean 
// * build-scripts and build-styles in parallel 
// * build-html 
// * Finally call the callback function 
gulp.task('deploy-pages', function(callback) {
  runSequence('clean',
              ['build-scripts', 'build-styles'],
              'inject', 'concat', 'fontsTemp', 'styles','pages',
              callback);
});



gulp.task('deploy-pages', function(done) {
    runSequence('default', 'pages', function() {
        done();
    });
});

// Build Production Files, the Default Task
gulp.task('deploy-src', ['clean'], function(cb) {
    runSequence(['concatSrc','stylesSrc', 'fontsSrc'], cb);
});


// Lint JavaScript
gulp.task('jshint', function() {
    return gulp.src(['app/main/**/*.js', '!app/main/bower_components/**'])
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('pages/images'))
        .pipe($.size({
            title: 'images'
        }));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function() {
    return gulp.src([
            'app/*',
            '!app/*.html',
            'node_modules/apache-server-configs/pages/.htaccess'
        ], {
            dot: true
        }).pipe(gulp.dest('pages'))
        .pipe($.size({
            title: 'copy'
        }));
});


// Copy Web Fonts To dev
gulp.task('fontsTemp', function() {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dev/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});

// Copy Web Fonts To src
gulp.task('fontsSrc', function() {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('src/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});


// Copy Web Fonts To pages
gulp.task('fonts', function() {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('pages/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});

gulp.task('concat', function() {
    var scssStream = gulp.src(['app/patternStyles/main.scss','app/main/styles/docs.scss'])
        .pipe(concat('zyncro-styleguide.scss'))
        .pipe(gulp.dest('app/patternStyles'));
    return scssStream;
});

gulp.task('concatSrc', function(concatSrc) {
    var scssStream = gulp.src(['app/patternStyles/main.scss'])
        .pipe(concat('zyncro-styleguide.scss'))
        .pipe(gulp.dest('app/patternStyles'));
    return scssStream;
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function() {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
            'app/patternStyles/zyncro-styleguide.scss'
        ])
        .pipe(debug())
        .pipe($.changed('styles', {
            extension: '.scss'
        }))
        .pipe($.rubySass({
                style: 'expanded',
                precision: 10
            })
            .on('error', console.error.bind(console))
        )
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dev/styles'))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('pages/styles'))
        .pipe($.size({
            title: 'styles'
        }));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('stylesSrc', function() {

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
            'app/patternStyles/zyncro-styleguide.scss'
        ])
        .pipe(debug())
        .pipe($.changed('styles', {
            extension: '.scss'
        }))
        .pipe($.rubySass({
                style: 'expanded',
                precision: 10
            })
            .on('error', console.error.bind(console))
        )
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dev/styles'))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('src/styles'))
        .pipe($.size({
            title: 'styles'
        }));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function() {
    var assets = $.useref.assets({
        searchPath: '{dev,app}'
    });

    return gulp.src('app/**/*.html')
        .pipe(assets)
        // Concatenate And Minify JavaScript
        .pipe($.if('*.js', $.uglify(
        {
            preserveComments: 'some',
            mangle: false,
            compress: true
        }
        )))

        // Remove Any Unused CSS
        // Note: If not using the Style Guide, you can delete it from
        // the next line to only include styles your project uses.
        .pipe($.if('*.css', $.uncss({
            html: [
                'app/index.html',
                'app/styleguide.html'
            ],
            // CSS Selectors for UnCSS to ignore
            ignore: [
                /.navdrawer-container.open/,
                /.app-bar.open/
            ]
        })))
        // Concatenate And Minify Styles
        // In case you are still using useref build blocks
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
        // // Update Production Style Guide Paths
        // .pipe($.replace('components/components.css', 'components/main.min.css'))
        // Minify Any HTML
        .pipe($.if('*.html', $.minifyHtml()))
        // Output Files
        .pipe(gulp.dest('pages'))
        .pipe($.size({
            title: 'html'
        }));
});


gulp.task('inject', function() {
    gulp.src('app/main/styleguide/styleguide.html')
        .pipe(debug())
        .pipe(inject(gulp.src(['app/patternTemplates/{,*/}*.html']), {
            starttag: '<!-- inject:head:{{ext}} -->',
            transform: function(filePath, file) {
                // return file contents as string
                return file.contents.toString('utf8');
            }
        }))
        .pipe(gulp.dest('app/main/styleguide/'));

});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dev', 'pages', 'src', '.publish']));

// hjs to pages
gulp.task('hjs2pages', function() {
    return gulp.src(['app/main/bower_components/highlightjs/styles/paraiso.dark.css'])
        .pipe(gulp.dest('pages/main/bower_components/highlightjs/styles/'))
});

// Watch Files For Changes & Reload
gulp.task('serve', ['inject', 'concat', 'fontsTemp', 'styles'], function() {
    browserSync({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['dev', 'app']
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/**/**/*.html'], reload);
    //Include patterns in styleguide
    gulp.watch('app/patternTemplates/**/*.html').on('change', function() {
        gulp.src('app/main/styleguide/styleguide.html')
            .pipe(debug())
            .pipe(inject(gulp.src(['app/patternTemplates/{,*/}*.html']), {
                starttag: '<!-- inject:head:{{ext}} -->',
                transform: function(filePath, file) {
                    // return file contents as string
                    return file.contents.toString('utf8');
                }
            }))
            .pipe(gulp.dest('app/main/styleguide/'));
    });
    gulp.watch(['app/patternStyles/**/*.{scss,css}','app/main/styles/docs.scss'], ['concat', 'styles', reload]);
    gulp.watch(['app/main/**/*.js'], ['jshint']);
    gulp.watch(['app/images/**/*'], reload);
});



// Build Production Files, the Default Task
gulp.task('default', ['clean'], function(cb) {
    runSequence('styles', ['jshint','inject', 'concat', 'hjs2pages', 'html', 'images', 'fonts', 'copy' ], cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
    // By default, we use the PageSpeed Insights
    // free (no API key) tier. You can use a Google
    // Developer API key if you have one. See
    // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
    url: 'https://example.com',
    strategy: 'mobile'
}));



// Load custom tasks from the `tasks` directory
try {
    require('require-dir')('tasks');
} catch (err) {}
