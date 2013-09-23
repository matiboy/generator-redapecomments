// ####<a id="<%= generalAnswers.id %>""><%= generalAnswers.url %></a>
// <%= generalAnswers.METHOD %>
// <%= generalAnswers.description %>
//
// Parameters
// <% _.each(params, function(item){ %>
//  - <%= item.name %> // <%= item.description %><% }); %>
// 
// Returns: <%= returns.type %><% if(returns.type == 'Array') { %> of <%= returns.subtype %><% } %> <%= returns.description %>
// <% if(returns.type == 'Array') { %>
//      [
//        
//      ]<% } else if( returns.type == 'Object') { %>
//      {
//        
//      }<% } else { %>
//      
//      <% } %>
//
// Status:
// <% _.each(status, function(item) { %>
// - <%= item.name %>: <%= item.description %> <% }); %>
//
app.<%= generalAnswers.method %>('<%= generalAnswers.url %>', <%= generalAnswers.function %>);
