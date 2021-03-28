import * as fromStore from './';

interface State {
    loaded: boolean;
    loading: boolean;
    data: {label: string, complete: boolean}[];
}

export const initialState: State = {
    loaded: false,
    loading: false,
    data: [
        {label: 'Eat pizza', complete: false}
    ]
};

export function reducer(
    state = initialState, 
    action: fromStore.ActionUnion
): State {
    switch(action.type) {
        case fromStore.Actions.ADD_TODO: {
            const todo = action.payload;
            const data = [...state.data, todo];
            return {
                ...state,
                data
            }
        }
        case fromStore.Actions.DELETE_TODO: {
            const todoToDelete = action.payload;
            const data = state.data.filter(todo => todo.label !== todoToDelete.label);
            
            return {
                ...state,
                data
            }
        }
    }
    return state;
};