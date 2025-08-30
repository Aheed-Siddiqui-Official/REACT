import { createContext, useReducer } from "react"

export const TodoItemsContext = createContext([
  {
      todoItems: [],
      addNewItem: () => {},
      deleteItem: () => {},
    }
]);



const todoItemsReducer = (currTodoItems, action) => {

  let newTodoItems = currTodoItems;

  if(action.type === 'NewItem') {
    newTodoItems = [
      ...currTodoItems,
      { name: action.payload.itemName, dueDate: action.payload.itemDueDate },
    ];

  } else if (action.type === "DelItem") {

    newTodoItems = currTodoItems.filter((item) => item.name !==
    action.payload.itemName);
  }
  return newTodoItems;
}



const TodoItemsContextProvider = ({children}) => {
  
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  const addNewItem = (itemName, itemDueDate) => {

    const newItemAction = {
      type: "NewItem",
      payload: {
        itemName,
        itemDueDate,
      },
    };

    dispatchTodoItems(newItemAction);

    
  };

  const deleteItem = (todoItemName) => {
    

    const deleteItemAction = {
      type: "DelItem",
      payload: {
        itemName : todoItemName,
      }
    }

    dispatchTodoItems(deleteItemAction);
  };

  return <TodoItemsContext.Provider 
      value={{
      todoItems,
      addNewItem,
      deleteItem,
    }}>
      {children}
    </TodoItemsContext.Provider>

}

export default TodoItemsContextProvider;