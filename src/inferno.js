// -*- js -*-
import S from './stream'
import InfernoDOM from 'inferno-dom'

// renders vdom with inferno
export function makeInfernoDriver (container) {
  function infernoDriver (vdom$) {
    function render (past, present) {
      console.log('RENDER', {past, present})
      InfernoDOM.render(present, container)
      return present
    }
    return S.scan(render, container, vdom$)
  }
  return infernoDriver
}
