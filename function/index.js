'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var fs = require('fs');
var path = require('path')


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
  var prompts = [
  {
    type: 'list',
    name: 'file',
    message: 'Choose file',
    choices: files
  },
  {
    type: 'list',
    name: 'area',
    message: 'File area',
    default: 0,
    choices: [
      'Private',
      'Public',
      'Bottom'
    ]
  },
  {
    type: 'input',
    name: 'name',
    message: 'Function name'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Function feature description'
  },
  {
    type: 'expand',
    name: 'sync',
    message: 'Sync/Async',
    default: 1,
    choices: [
      {
        key: 's',
        name: 'Synchronous',
        value: 'Synchronous'
      },
      {
        key: 'a',
        name: 'Asynchronous',
        value: 'Asynchronous'
      }
    ]
  }];

  this.prompt(prompts, function (props) {
    props.isSync = (props.sync == 'Synchronous');
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
        this.params = {
          params: params,
          joinedParams: this._.pluck(params, 'name').join(', ') + (this.generalAnswers.isSync ? '' : ', callback')
        };
        cb();
      }
    }.bind(this));
  }.bind(this);
  askForParam();
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
      message: (this.generalAnswers.sync == 'Synchronous' ? 'Returns' : 'Calls back with'),
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
      message: 'Description of ' + (this.generalAnswers.sync == 'Synchronous' ? 'returned object' : 'callback parameter')
    }
  ];
  this.prompt(prompts, function(props){
    this.returns = props;
    cb();
  }.bind(this));
};

RedapecommentsGenerator.prototype.createFile = function createFile() {
  // Compile the template
  var asString = this.engine(this.readFileAsString(this.sourceRoot() + '/function.js'), this);
  // Open the file
  var original = this.readFileAsString(this.generalAnswers.file);
  var modified;
  // Which area?
  if(this.generalAnswers.area == 'Private') {
    modified = original.replace( '// -------', '// -------\n' + asString + '\n');
  } else if( this.generalAnswers.area == 'Public' ) {
    modified = original.replace( 'module.exports = {', 'module.exports = {\n\t' + asString  + '\n');
  } else {
    modified = original + '\n' + asString;
  }
  this.write(this.generalAnswers.file, modified);
};
