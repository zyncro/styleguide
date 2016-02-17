/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 */

'use strict';

/**
 *
 *  TODO:
 *  Optimizar tareas, sequence & juntar tareas y luego copiarlas a carpeta
 *
 */

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
        .pipe(gulp.dest('dev/images'))
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
        }).pipe(gulp.dest('dev'))
        .pipe($.size({
            title: 'copy'
        }));
});


// Copy Web Fonts
gulp.task('fonts', function() {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dev/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});




/**
 *
 * SRC
 * 
 */



// Copy Web Fonts
gulp.task('fontsSrc', function() {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('src/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});


// Compile and Automatically Prefix Stylesheets
gulp.task('stylesSrc', function() {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
            'app/patternStyles/main.scss'
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
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('src/styles'))
        .pipe($.size({
            title: 'styles'
        }));
});


// Build docs
gulp.task('stylesDocs', function() {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
            'app/patternStyles/concatenated.scss'
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
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dev/patternStyles'))
        .pipe($.size({
            title: 'styles'
        }));
});

gulp.task('concatDocs', function() {
    var scssStream = gulp.src(['app/patternStyles/main.scss', 'app/main/styles/docs.scss'])
        .pipe(concat('concatenated.scss'))
        .pipe(gulp.dest('app/patternStyles'));
    return scssStream;
});


// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function() {
    var assets = $.useref.assets({
        searchPath: '{dev,app}'
    });

    return gulp.src('app/**/*.html')
        .pipe(assets)
        // Concatenate And Minify JavaScript
        .pipe($.if('*.js', $.uglify({
            preserveComments: 'some',
            mangle: false,
            compress: true
        })))

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
    .pipe(gulp.dest('dev'))
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
        .pipe(gulp.dest('dev/main/bower_components/highlightjs/styles/'))
});



gulp.task('serve', function(cb) {
    runSequence(
        'clean',
        'concatDocs',
        'browserSync',
        cb);
});

// Watch Files For Changes & Reload
gulp.task('browserSync', [
        'stylesDocs',        
        'hjs2pages',
        'html',
        'images',
        'copy',
        'inject',
        'fonts',
    ], function() {


    browserSync({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['dev']
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
    gulp.watch(['app/patternStyles/**/*.{scss,css}', 'app/main/styles/docs.scss'], ['concatDocs', 'stylesDocs', reload]);
    gulp.watch(['app/main/**/*.js'], ['jshint']);
    gulp.watch(['app/images/**/*'], reload);
});

// // Build Production Files, the Default Task
// gulp.task('default', ['clean'], function(cb) {
//     runSequence('styles', ['jshint','inject', 'concat', 'hjs2pages', 'html', 'images', 'fonts', 'copy' ], cb);
// });


/**
 * Push build to gh-pages
 */
gulp.task('pages', function() {
    return gulp.src("dev/**/*")
        .pipe(deploy())
});

gulp.task('deploy-pages', function(cb) {
    runSequence(
        'clean',
        'concatDocs',
        'stylesDocs',
        'hjs2pages',
        'html',
        'images',
        'copy',
        'inject',
        'fonts',
        'pages',
        cb);
});

// Build Production Files, the Default Task
gulp.task('deploy-src', ['clean'], function(cb) {
    runSequence(['stylesSrc', 'fontsSrc'], cb);
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