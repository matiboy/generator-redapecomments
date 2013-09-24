'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var fs = require('fs');

var RedapecommentsGenerator = module.exports = function RedapecommentsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.on('end', function () {
    // this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(RedapecommentsGenerator, yeoman.generators.Base);

RedapecommentsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  // Attempt to get user
  var user = process.env['USER'] || '';
  var files = this._.filter(fs.readdirSync('.'), function(item) {
    return path.extname(item) == '.js';
  });
  var functionfiles = this._.filter(fs.readdirSync('./routes'), function(item) {
    return path.extname(item) == '.js';
  });
  var prompts = [
  {
    type: 'list',
    name: 'file',
    message: 'File in which to include API',
    choices: files
  },
  {
    type: 'list',
    name: 'functionfile',
    message: 'File in which to add function',
    choices: functionfiles
  },
  {
    type: 'list',
    name: 'METHOD',
    message: 'Method',
    choices: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  },
  {
    type: 'input',
    name: 'url',
    message: 'Route url'
  },
  {
    type: 'input',
    name: 'id',
    message: 'Route id (for linking)'
  },
  {
    type: 'input',
    name: 'function',
    message: 'Corresponding function'
  },
  {
    type: 'input',
    name: 'description',
    message: 'API description'
  }
  ];

  this.prompt(prompts, function (props) {
    props.method = props.METHOD.toLowerCase();
    this.generalAnswers = props;
    cb();
  }.bind(this));
};

RedapecommentsGenerator.prototype.getParams = function getParams() {
  var cb = this.async();
  var params = [];
  var askForParam = function() {
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Parameter name (leave blank to stop)',
        default: ''
      },
      {
        type: 'input',
        name: 'description',
        message: 'Parameter description',
        when: function(answers) {
          return answers.name.length;
        }
      }
    ];
    this.prompt(prompts, function(props){
      if(props.name.length) {
        params.push(props);
        askForParam();
      } else {
        this.params = params;
        cb();
      }
    }.bind(this));
  }.bind(this);
  askForParam();
};

RedapecommentsGenerator.prototype.getStatus = function getStatus() {
  var cb = this.async();
  var status = [];
  var askForStatus = function() {
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Status code (leave blank to stop)',
        default: ''
      },
      {
        type: 'input',
        name: 'description',
        message: 'Status description',
        when: function(answers) {
          return answers.name.length;
        }
      }
    ];
    this.prompt(prompts, function(props){
      if(props.name.length) {
        status.push(props);
        askForStatus();
      } else {
        this.status = status;
        cb();
      }
    }.bind(this));
  }.bind(this);
  askForStatus();
};

RedapecommentsGenerator.prototype.returns = function returns() {
  var cb = this.async();
  var params = [];
  var types = [
    'Object',
    'Array',
    'String',
    'Boolean',
    'Integer',
    'Float'
  ];
  var prompts = [
    {
      type: 'list',
      name: 'type',
      message: 'Returns',
      default: 0,
      choices: types
    },
    {
      type: 'list',
      name: 'subtype',
      message: 'An array of...',
      choices: types,
      when: function(answers) {
        return answers.type == 'Array';
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description of returned object (no need to include status)'
    }
  ];
  this.prompt(prompts, function(props){
    this.returns = props;
    cb();
  }.bind(this));
};

RedapecommentsGenerator.prototype.createFile = function createFile() {
  // Compile the template
  var asString = this.engine(this.readFileAsString(this.sourceRoot() + '/api.js'), this);
  // Open the file
  var original = this.readFileAsString(this.generalAnswers.file);
  var modified;
  modified = original + '\n\n' + asString;
  this.write(this.generalAnswers.file, modified);

  // Add the function into the function file
  asString = this.engine(this.readFileAsString(this.sourceRoot() + '/function.js'), this);
  original = this.readFileAsString('routes/' + this.generalAnswers.functionfile);
  this.htmlfile = this.generalAnswers.file.replace('.js', '.html');
  modified = original.replace('module.exports = {', 'module.exports = {\n' + asString );
  this.write('routes/' + this.generalAnswers.functionfile, modified);
};
