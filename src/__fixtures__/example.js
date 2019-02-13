function declaration() {
  function innerFunctionOfDeclaration() {

  }
}

var expression = function() {
  function innerFunctionOfExpression() {

  }
}
global.expression = expression
global.declaration = declaration
