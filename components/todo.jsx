import { useState } from 'react';

class Item {
  id = Math.random() + '-' + Date.now();
  checked = false;
  text = '-default-';
  constructor(text) {
    Object.assign(this, { text }); //this.text = text;
  }
  toggleCheck() {
    this.checked = !this.checked;
    return this;
  }
}


export function ToDoApp() {
  console.log('ToDo render');
  const
    [list, setList] = useState([new Item('Дело 1'), new Item('Дело 2')]),
    addItem = text =>
      setList(prev => [...prev, new Item(text)]),
    delItem = id =>
      setList(prev => prev.filter(el => id !== el.id)),
    toggleCheck = id => setList(prev => {
      const
        index = prev.findIndex(el => id === el.id),
        elem = prev[index];
      return prev.with(index, elem.toggleCheck());
    })


  return <>
    <Form addItem={addItem} />
    <List list={list} delItem={delItem} toggleCheck={toggleCheck} />
  </>
}

function Button({ onClick, children }) {
  console.log('Button render');
  return <button onClick={onClick}>{children}</button>
}

function Form({ addItem }) {
  const
    [value, setValue] = useState('-text-');
  console.log('Form render');
  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={event => setValue(event.target.value)} />
    <Button onClick={() => addItem(value)}>Add</Button>
  </fieldset>
}

function List({ list, delItem, toggleCheck }) {
  console.log('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <ToDoItem key={item.id} item={item} delItem={delItem} toggleCheck={toggleCheck} />)}
    </ol>
  </fieldset>
}


/**
 * 
 * @param {object} props
 * @param {Item} props.item
 * @param {(string)=>void} props.delItem
 * @returns {JSX.Element}
 */
function ToDoItem({ item, delItem, toggleCheck }) {
  console.log('Item render');
  return <li>
    <label>
      <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(item.id)} />
      {item.text}
      {item.checked && '✔'}
    </label>
    <Button onClick={() => delItem(item.id)}>❌</Button>
  </li>
}





