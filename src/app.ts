import { renderTodos } from './utils';
import * as fromStore from './store';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

interface ToDo {
  label: string;
  complete: boolean;
}

interface AppState {
  todos: {
    loaded: boolean;
    loading: boolean;
    data: ToDo[];
  }
}

const reducers = {
    todos: fromStore.reducer
};

const store = new fromStore.Store<AppState>(reducers);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    store.dispatch(new fromStore.AddTodoAction({
      label: input.value,
      complete: false
    }))

    input.value = '';
  },
  false
);

const unsubscribe = store.subscribe((state) => {
  renderTodos(state.todos?.data);
});

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    const todo = JSON.parse(target.dataset.todo as any);
    store.dispatch(new fromStore.DeleteTodoAction(todo))
  }
});

destroy.addEventListener(
  'click',
  unsubscribe,
  false
);

store.subscribe((state) => console.log('state', state));