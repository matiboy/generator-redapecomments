// <%= answers.title %>
// <%= answers.titleSub %>
// <%= answers.filename %> v<%= answers.version %>
// Authors: <%= answers.author %>

// Dependencies
// ------------
// ###Node
<% _.each(answers.nodeDependencies, function(item){ %>var <%= item %> = require('<%= item %>');
<% }); %>

// ###App specific
<% _.each(answers.appDependencies, function(item){ %>var <%= item %> = require('./<%= item %>');
<% }); %>

// Private
// -------

// Public
// ------
var exp = module.exports = {

};