'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');



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

  var prompts = [{
    type: 'input',
    name: 'title',
    message: 'Title'
  },
  {
    type: 'input',
    name: 'filename',
    message: 'File name (without .js)',
    default: function(answers) {
      return _s.slugify(answers.title);
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version',
    default: '0.0.1'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author',
    default: user
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description'
  },
  {
    type: 'checkbox',
    choices: [
      'async',
      'config',
      'express',
      'lodash',
      'moment',
      'mongoose',
      'redis'
    ],
    name: 'nodeDependencies',
    message: 'Node dependencies'
  },
  {
    type: 'input',
    name: 'appDependencies',
    message: 'App dependencies (comma separated)'
  }];

  this.prompt(prompts, function (props) {
    props.appDependencies = props.appDependencies.split(',');
    props.titleSub = _s.repeat('=', props.title.length);
    this.answers = props;
    cb();
  }.bind(this));
};

RedapecommentsGenerator.prototype.createFile = function createFile() {
  this.template('file.js', this.answers.filename + '.js');
};
