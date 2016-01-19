
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
* `app/scripts/bower_components` - contains the angular framework files

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

##Dev
```
 gulp serv
```

##Publish to git pages gulp gh-pages (Wait for DNS propagation on github)
```
 gulp deploy-pages
```

## Publish Dist
```
TODO: gulp task
gulp deploy-src && git add . && git commit -am"message" && git push origin master
```

---

## Components
Just add a new html file to the path and the gulp task will do everything for you
- Automatic generated menu
- Automatic code snippets
- Automatic Inject Templates



```
zyncro-styleguide/
  |- app/
  |  |- patternStyles (SASS)
  |  |- patternTemplate (HTML)
```


#### patternTemplate Requires:
```
<section id="" class="">
<h1>
<div class="code-sample">
```

#### Example:

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


#### patternStyles Requires:
```
zyncro-styleguide/
  |- app/
  |  |- patternStyles (SASS)
  |  |	|- mains.scss
```

@import "components/componentName";

