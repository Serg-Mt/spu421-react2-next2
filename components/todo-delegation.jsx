import { memo, useRef, useState } from 'react';

const
  ADD = 'add',
  DEL = 'del',
  TOGGLE = 'toggle';


class ToDoItem {
  id = Math.random(); //+ '_' + Date.now();
  checked = false;
  text = '-default-';

  constructor(text) {
    Object.assign(this, { text });  // this.text = text;
  }

  toggleCheck() {
    const
      clone = Object.assign(new ToDoItem, this, { checked: !this.checked });
    return clone;
  }
}


const Button = memo(function ({ action, children }) {
  console.log('Button render', children);
  return <button data-action={action}>
    {children}
  </button>
});

// function Form0({ addItem }) { // управляемый input

//   const
//     [value, setValue] = useState('-start-'),
//     ref = useRef(null),
//     onClick = useCallback(() => addItem(ref.current), []);
//   ref.current = value;
//   console.log('Form 0 render', value);
//   return <fieldset>
//     <legend>Form 0</legend>
//     <input value={value} onInput={event => setValue(event.currentTarget.value)} />
//     <Button onClick={onClick}>➕</Button>
//   </fieldset>
// }

function Form1({ ref }) { // ref
  console.log('Form 1 render');
  return <fieldset>
    <legend>Form 1</legend>
    <input ref={ref} />
    <Button action={ADD}>➕</Button>
  </fieldset>
}

// function Form2({ addItem }) { // form
//   console.log('Form 2 render');
//   return <fieldset>
//     <legend>Form 2</legend>
//     <form onSubmit={event => {
//       event.preventDefault();
//       const formData = new FormData(event.currentTarget);
//       addItem(formData.get('input-name'));
//     }} >
//       <input name='input-name' />
//       <button type="submit">➕</button>
//     </form>
//   </fieldset>
// }

const Form = memo(Form1);


export function ToDoDelegation() {
  const
    ref = useRef(null),
    [list, setList] = useState([]),
    addItem = text => setList(prev => [...prev, new ToDoItem(text)]),
    delItem = id => setList(prev => prev.filter(item => id !== item.id)),
    toggleCheck = id => setList(prev => {
      const
        index = prev.findIndex(item => id === item.id),
        elem = prev[index];
      return prev.with(index, elem.toggleCheck());
    }),
    onClick = event => {
      const
        target = event.target.closest('[data-action]');
      if (!target) return;
      const
        action = target.dataset.action,
        id = +target.closest('[data-id]')?.dataset?.id;
      console.log({ target, action, id, ref });
      switch (action) {
        case ADD:
          addItem(ref.current.value);
          return;
        case DEL:
          delItem(id);
          return;
        case TOGGLE:
          toggleCheck(id);
          return;
      }
    };


  return <fieldset onClick={onClick}>
    <Form ref={ref} />
    <List list={list} />
  </fieldset>
}


/**
 * 
 * @param {object} props
 * @param {ToDoItem} props.item 
 * @param {function} props.delItem 
 * @param {function} props.toggleCheck 
 * @returns {JSX.Element}
 */
function Item({ item }) {
  console.log('Item render', item);
  return <li data-id={item.id}>
    <label>
      <input readOnly checked={item.checked} type="checkbox" data-action={TOGGLE} />
      {item.text}
      <Button action={DEL}>❌</Button>
      {item.checked && '✔'}
    </label>
  </li >;
}

const PureItem = memo(Item);

/**
 * 
 * @param {object} props
 * @param {ToDoItem[]} props.list
 * @param {function} props.delItem 
 * @param {function} props.toggleCheck 
 * @returns {JSX.Element}
 */
function List({ list }) {
  console.log('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <PureItem key={item.id} item={item} />)}
    </ol>
  </fieldset>
}





