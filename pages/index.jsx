import { Component, useState } from 'react';
import classes from '../index.module.css'

export default function Page() {
  const
    [state, setState] = useState('***'),
    send1 = p => setState(prev => p + prev),
    send2 = p => setState(prev => prev + p);
  return <>
    <Converter />
    {state} <br />
    <SmartInput send={send1} />
    <br />
    <SmartInput send={send2} />
    <hr />
    <LikeButton color="red" />
    <LikeButton size={'bi' + 'g'} start={100} big />
    <LikeButton step="10" border />
  </>
}

function LikeButton({ color, size, start = 0, step = 1, border }) {
  const
    [likes, setLikes] = useState(+start),
    [bordered, setBordered] = useState(!!border),
    className = [
      classes.like,
      'big' === size && classes.big,
      bordered && classes.border
    ].filter(Boolean)
      .join(' '),
    style = { color }
  return <button className={className}
    style={{color}}
    onClick={() => setLikes(prev => +step + prev)}
    onContextMenu={() => setBordered(prev => !prev)}
  >
    Like:{likes}
  </button>
}

class LikeButton1 extends Component {
  constructor(p) {
    super(p);
    this.state = {
      likes: +this.props.start || 0,
      bordered: !!this.props.border
    };
  }

  render() {
    const
      step = +this.props.step || 1;
    // console.log(this.state,this.props,step);
    return <button
      style={{ color: this.props.color }}
      onClick={() => this.setState(({ likes }) => ({ likes: likes + step }))}
    >
      Like:{this.state.likes}
    </button>
  }
}

function SmartInput({ send }) {
  const
    [value, setValue] = useState('-start-');
  return <>
    <input value={value} onInput={event => setValue(event.currentTarget.value)} />
    <button onClick={() => send(value)}>send</button>
    {value}
  </>
}

function Converter() {
  const
    [meters, setMeters] = useState(1111),
    updateKm = km => setMeters(1000 * km),
    updateMile = mile => setMeters(1482 * mile);
  return <fieldset>
    <legend>Convert {meters}m</legend>
    <Length unit="km" value={meters / 1000} update={updateKm} />
    <Length unit="miles" value={meters / 1482} update={updateMile} />
  </fieldset>
}

function Length({ value, unit, update }) {
  /**
   * 
   * @param {SubmitEvent} event 
   */
  function onSubmit(event) {
    event.preventDefault();
    const
      formData = new FormData(event.currentTarget);
    update(formData.get('val'));
  };

  return <>
    {value} {unit}
    <form onSubmit={onSubmit}>
      <input name="val" type="number" size="4" />{unit}
      <button type="submit">update</button>
    </form>
  </>
}