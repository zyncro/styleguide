
# [Zyncro Styleguide](http://zyncro.github.io/styleguide/#/styleguide)
[Preview](http://zyncro.github.io/styleguide/#/styleguide)
[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"


## Prerequisites


```
sudo apt-get install -y ruby
sudo gem install sass
```

### Clone

```
git clone https://github.com/zyncro/styleguide.git
cd styleguide
```

### Install Dependencies

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/main/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-web-starter changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

---


## Automatic TPL includes width gulp-inject
gulp-inject adds every tpl from patternTemplates to styles.html



## Matched Proejct dependencies width styleguide ;)

```
{
  "dependencies": {
    "angular": "1.2.28",
    "angular-animate": "~1.2.0",
    "angular-route": "1.2.28",
    "angular-loader": "1.2.28",
    "angular-mocks": "1.2.28",
    "angular-sanitize": "1.2.28",
    "angular-bootstrap": "~0.12.0",
    "angular-bootstrap-colorpicker": "~3.0.17",
    "angular-bootstrap-toggle-switch": "~0.5.2",
    "angular-ui-select": "0.13.0",
  }
}
```



## Tasks

###Dev
```
 gulp serv
```

###Publish to git pages gulp gh-pages (Wait for DNS propagation on github)
```
 gulp deploy-pages
```
[Preview](http://zyncro.github.io/styleguide/#/styleguide)

### Publish Dist
#### Everything will be compiled to src/ folder
  
  - Fonts
  - Icons
  - Images
  - CSS

```
TODO: gulp task
gulp deploy-src && git add . && git commit -am"message" && git push origin master
```

## Main App

```
zyncro-styleguide/
  |- app/
  |  |- main/
```

## Vendors

```
zyncro-styleguide/
  |- app/
  |  |- main/
  |  |  |- bower_components/
```

## Directives

```
zyncro-styleguide/
  |- app/
  |  |- main/
  |  |  |- components/
```

## Pages (sections/states)

```
zyncro-styleguide/
  |- app/
  |  |- main/
  |  |  |- styleguide/
  |  |  |- layout/
  |  |  |- icons/
```

## Document CSS (Just for github-pages)

```
zyncro-styleguide/
  |- app/
  |  |- main/
  |  |  |- styles/
  |  |  |  |- doc.scss/
```



## Components
Just add a new html file to the path and the gulp task will do everything for you

- Automatic generated menu
- Automatic code snippets
- Automatic Inject Templates



#### TEMPLATES (patternTemplates):

```
zyncro-styleguide/
  |- app/
  |  |- patternTemplates (HTML)
```

##### Requires


```
<section id="Box" class="styleguide">
<h1>
<div class="code-sample">
```


##### Example:

```
<section id="Box" class="styleguide">
    <h1>Box</h1>
    <div class="code-sample">
        <h2>Box-single</h2>
        <div class="box">Default Box</div>
        <div class="box box-white">White Box</div>
        <h2>Box-compound</h2>
        <hr/>
        <div class="box-compound">
            <div class="box box-compound-top box-white">Small Boxx</div>
            <div class="box box-compound-bottom">Default Bo</div>
        </div>
    </div>
</section>
```


#### Styles (patternStyles):

```
zyncro-styleguide/
  |- app/
  |  |- patternStyles (SASS)
  |  |	|- mains.scss
```

##### Add new component to app/patternStyles/mains.scss:

```
@import "components/componentName";
```


## Ui-boostrap controller functions for dics are inside  styleguide.js:

```
zyncro-styleguide/
  |- app/
  |  |- main/
  |  |  |- styleguide/
  |  |  |  |- styleguide.js
```



## update styleguide in zbase

```
 bower update zyncro-styleguide
```

#### Good practices:

- Follow Boostrap guidelines
- No Id for styling
- Avoid double DOM versions for mobile
- Keep HTML as clean as posible, less DOM elements
- Most direct selectors, less is better.
- Use less classes names, less combinations
- Use @extend and @mixins
- Use theme classes & styling classes
- Always take care of Key selector (Performance ordered)
  - AVOID -> ID, e.g. #header 
  - Class, e.g. .promo 
  - Type, e.g. div 
  - Adjacent sibling, e.g. h2 + p 
  - Child, e.g. li > ul 
  - AVOID -> Descendant, e.g. ul a 
  - AVOID -> Universal, i.e. * 
  - AVOID -> Attribute, e.g. [type="text"] 
  - Pseudo-classes/-elements, e.g. a:hover


#### External Reference (Vendors)
  
[Bootstrap](http://getbootstrap.com/css)
[Ui Bootstrap](https://angular-ui.github.io/bootstrap/)
[ui select](https://github.com/angular-ui/ui-select)
[x editable](https://vitalets.github.io/angular-xeditable)
[googlecharts](http://angular-google-chart.github.io/)


