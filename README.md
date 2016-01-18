#Dev
```
 gulp serv
```

#Publish to git pages gulp gh-pages
```
 gulp pages
```


#Publish Dist
```
TODO: gulp task
gulp dist && git add . && git commit -am"message" && git push origin stable
```


# angular-web-starter

[Angular-seed](https://github.com/angular/angular-seed) merged with [Google Web Starter Kit](https://github.com/google/web-starter-kit)! Oh yeah.

## Getting Started

To get you started you can simply clone the angular-web-starter repository and install the dependencies:

### Prerequisites

You need `git` to clone the angular-web-starter repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

```
sudo apt-get install -y git
```

We also use a number of `node.js` tools to initialize and test angular-web-starter. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

```
sudo apt-get install -y npm nodejs nodejs-legacy
```

Finnaly, angular-web-starter uses `Sass` to make style guide nice and modular,
but Sass requires `Ruby`. For those new to Sass, the project describes itself as a “CSS extension language”.
First check if you have Ruby already with 
ruby -v

If you get an error or a version number less than 1.8.7, you need to install Ruby by visiting the Ruby downloads page.
Once you have Ruby, install Sass with the following command: `gem install sass`

```
sudo apt-get install -y ruby
sudo gem install sass
```

### Clone angular-web-starter

Clone the angular-web-starter repository using [git][git]:

```
git clone https://github.com/osixia/angular-web-starter.git
cd angular-web-starter
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

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

