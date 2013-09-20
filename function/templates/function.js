// ###<%= generalAnswers.name %>
// <%= generalAnswers.sync %>
// <%= generalAnswers.description %>
//
// Parameters
// <% _.each(params.params, function(item){ %>
//  - <%= item.name %> // <%= item.description %><% }); %>
// 
// <% if(generalAnswers.isSync) { %>Returns: <% } else { %>Calls back with: <% } %><%= returns.type %><% if(returns.type == 'Array') { %> of <%= returns.subtype %><% } %> <%= returns.description %>
// 
<% if(returns.type == 'Array') { %>
//      [
//        
//      ]<% } else if( returns.type == 'Object') { %>
//      {
//        
//      }<% } else { %>
//      
<% } %><% if(generalAnswers.area == 'Public') { %>	<%= generalAnswers.name %>: function(<%= params.joinedParams %>) {
		<% if(generalAnswers.isSync) { %>return null;<% } else { %>callback( null, null );<% } %>
	},<% } else { %>var <%= generalAnswers.name %> = function(<%= params.joinedParams %>) { 
	<% if(generalAnswers.isSync) { %>return null;<% } else { %>callback( null, null );<% } %>
};<% } %>