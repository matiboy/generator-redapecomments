// ####<%= generalAnswers.function %>
// Serves the [generalAnswers.url](../<%= htmlfile %>#<%= generalAnswers.id) API point
// <%= generalAnswers.description %>
//
<%= generalAnswers.function %>: function( req, res, next ) {
  res.jsonp({
    status: 0,
    message: 'Yeeha'
  });
},
