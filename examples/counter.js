// -*- mode: js -*-

import S from '../src/stream'
import R from 'ramda'

import {elmoMsg, elmoLens, updateBySubject} from '../src/elmo'

import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'

// type
const Msg = elmoMsg({
  Inc:   R.always
})

// type
const Model = elmoLens({
  count: R.lensProp('count')
})

// init : Flags -> Model
function init (flags) {
  const initialModel = { count: 0 }
  return initialModel
}

// update by msg subject
const Update = {
  Inc: (msg, model) => R.over(Model.count, R.inc, model)
}

// update : MsgStream -> Model -> Model
function update ({ Inc }, model$) {
  return updateBySubject(Update, { Inc }, model$)
}

// view : MsgComposer -> ModelRead -> Html Msg
function view ({ Inc }, modelRead$) {
  return modelRead$.map(model =>
      <div>
        <p>Count: { model.count }</p>
        <button onClick={ (e) => Inc(1) }>Inc</button>
      </div>
  )
}


const Counter = {Msg, Model, init, view, update}
export default Counter
