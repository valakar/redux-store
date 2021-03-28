export const Actions = {
    ADD_TODO: '[Todo] Add Todo',
    DELETE_TODO: '[Todo] Delete Todo'
}

export class AddTodoAction {
    readonly type = Actions.ADD_TODO;

    constructor(public payload: {label: string, complete: boolean}) {
    }
}

export class DeleteTodoAction {
    readonly type = Actions.DELETE_TODO;

    constructor(public payload: {label: string, complete: boolean}) {
    }
}

export type ActionUnion = AddTodoAction | DeleteTodoAction;