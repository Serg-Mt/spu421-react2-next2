import { memo, useState, useCallback, useRef } from 'react';

class Item {
  id = Math.random() + '-' + Date.now();
  checked = false;
  text = '-default-';
  constructor(text) {
    Object.assign(this, { text }); //this.text = text;
  }
  toggleCheck() {
    return Object.assign(new Item, this, { checked: !this.checked });
  }
}


const Button = memo(function Button({ onClick, children }) {
  console.log('Button render', children);
  return <button onClick={onClick}>{children}</button>
});

function Form0({ addItem }) { // управляемый input
  const
    [value, setValue] = useState('-text-'),
    ref = useRef(null),
    onClick = useCallback(() => addItem(ref.current), []);
  ref.current = value;
  console.log('Form render', value);
  return <fieldset>
    <legend>Form 0</legend>
    <input value={value} onInput={event => setValue(event.target.value)} />
    <Button onClick={onClick}>Add</Button>
  </fieldset>
};

function Form1({ addItem }) { // ref
  console.log('Form 1 render');
  const
    ref = useRef(null),
    onClick = useCallback(() => addItem(ref.current.value), []);
  return <fieldset>
    <legend>Form 1</legend>
    <input ref={ref} />
    <Button onClick={onClick}>➕</Button>
  </fieldset>
}

function Form2({ addItem }) { // form
  console.log('Form 2 render');
  return <fieldset>
    <legend>Form 2</legend>
    <form onSubmit={event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      addItem(formData.get('input-name'));
    }} >
      <input name='input-name' />
      <button type="submit">➕</button>
    </form>
  </fieldset>
}


const Form = [memo(Form0), memo(Form1), memo(Form2)][0];


/**
 * 
 * @param {object} props
 * @param {Item} props.item
 * @param {(string)=>void} props.delItem
 * @returns {JSX.Element}
 */
function ToDoItem({ item, delItem, toggleCheck }) {
  console.log('Item render', item);
  const onClick = useCallback(() => delItem(item.id), []);
  return <li>
    <label>
      <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(item.id)} />
      {item.text}
      {item.checked && '✔'}
    </label>
    <Button onClick={onClick}>❌</Button>
  </li>
}

const PureToDoItem = memo(ToDoItem);

function List({ list, delItem, toggleCheck }) {
  console.log('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <PureToDoItem key={item.id} item={item} delItem={delItem} toggleCheck={toggleCheck} />)}
    </ol>
  </fieldset>
};

export function ToDoApp() {
  const
    [list, setList] = useState([new Item('Дело 1'), new Item('Дело 2')]),
    addItem = useCallback(text =>
      setList(prev => [...prev, new Item(text)]), []),
    delItem = useCallback(id =>
      setList(prev => prev.filter(el => id !== el.id)), []),
    toggleCheck = useCallback(id => setList(prev => {
      const
        index = prev.findIndex(el => id === el.id),
        elem = prev[index];
      return prev.with(index, elem.toggleCheck());
    }), []);


  return <>
    <Form addItem={addItem} />
    <List list={list} delItem={delItem} toggleCheck={toggleCheck} />
  </>
}




