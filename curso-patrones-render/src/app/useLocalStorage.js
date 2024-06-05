import React, { useReducer } from 'react';

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = useReducer(reducer, initialState(initialValue));

  const {
    wasAppUpdated,
    error,
    loading,
    item,
  } = state

  console.log(state);

  const onError = (error) => dispatch({type: actionTypes.error, payload: error});
  const onSuccess = (parsedItem) => dispatch({type: actionTypes.success, payload: parsedItem});
  const onSave = (newItem) => dispatch({type: actionTypes.save, payload: newItem});
  const onSync = () => dispatch({type: actionTypes.sync})

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 3000);
  }, [wasAppUpdated]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error)
    }
  };

  const sincronize = () => {
    onSync()
  }

  return {
    item,
    saveItem,
    loading,
    error,
    sincronize
  };
}

const initialState = (initialValue) => ({
  wasAppUpdated: false,
  error: false,
  loading: true,
  item: initialValue
});

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'SAVE',
  sync: 'SYNC'
}

const reducerObject = (state, action) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    item: action.payload,
    loading: false,
    wasAppUpdated: true
  },
  [actionTypes.save]: {
    ...state,
    item: action.payload,
  },
  [actionTypes.sync]: {
    ...state,
    loading: true,
    wasAppUpdated: false,
  }
})

const reducer = (state, action) => {
  return reducerObject(state, action)[action.type] || state;
}

export { useLocalStorage };
