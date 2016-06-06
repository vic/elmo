// -*- js -*-

// renders vdom with inferno
export function makeInfernoDriver (container) {
  function infernoDriver (vdom$) {
    function render (past, present) {
      InfernoDOM.render(present, past)
      return present
    }
    return flyd.scan(render, container, vdom$)
  }
  return infernoDriver
}
