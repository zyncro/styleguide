##Dev
```
 gulp serv
```

##Publish to git pages gulp gh-pages (Wait for DNS propagation on github)
```
 gulp deploy-pages
```

##Publish Dist
```
TODO: gulp task
gulp deploy-src && git add . && git commit -am"message" && git push origin master
```


## Prerequisites


```
sudo apt-get install -y ruby
sudo gem install sass
```

### Clone

Clone the angular-web-starter repository using [git][git]:

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

