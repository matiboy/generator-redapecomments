// <%= answers.title %>
// <%= answers.titleSub %>
// <%= answers.filename %> v<%= answers.version %>
// Authors: <%= answers.author %>
//
// <%= answers.description %>
// 
// Test file for <%= features.main.name %>
//
// ###Sub features
<% _.each(features.sub, function(item) { %>// - item.name
<% }); %>

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

// Tests
// -----
// ###Main feature
// <%= features.main.description %>
describe('<%= features.main.name %>', function() {
  <% _.each(features.sub, function(item){ %>// ####<%= item.name %>
  // <%= item.description %>
  describe('<%= item.name %>', function() {

  });

  <% }); %>
});