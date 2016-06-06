// -*- js -*-
import S from './stream'
import InfernoDOM from 'inferno-dom'

// renders vdom with inferno
export function makeInfernoDriver (container) {
  function infernoDriver (vdom$) {
    function render (past, present) {
      InfernoDOM.render(present, past)
      return present
    }
    return S.scan(render, container, vdom$)
  }
  return infernoDriver
}
