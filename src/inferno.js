// -*- js -*-
import S from './stream'
import InfernoDOM from 'inferno-dom'

export function makeInfernoDriver (container) {
  return function infernoDriver (vdom$) {
    const render = (prev, next) => InfernoDOM.render(next, container)
    return S.scan(render, container, vdom$)
  }
}
