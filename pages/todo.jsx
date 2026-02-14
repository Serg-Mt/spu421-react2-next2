import { ToDoApp } from '../components/todo';
import { ToDoDelegation } from '../components/todo-delegation';

export default function ToDoPage() {
  return <>
    <h3>ToDo list</h3>
    <ToDoApp />
    <h3>with Delegation:</h3>
    <ToDoDelegation />
  </>
}