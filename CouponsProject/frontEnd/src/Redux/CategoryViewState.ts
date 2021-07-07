import { Category } from './../Models/CouponModel';

// Category State
export class CategoryViewState {
    public viewOpen: boolean = false;
    public category: Category | null = null;
}

// ----------------------------------------------------------

// Category Action Types:
export enum CategoryViewActionType {
    toggleView = "toggleView",
    setCategory = "setCategory"
}

// -----------------------------------------------------------

// Category Action - an object that holding the action data
export interface CategoryViewAction {
    type: CategoryViewActionType;
    payload: any;
}

// --------------------------------------------------------------

// Category Action Creators: functions which takes payload and action type and returns the action object
export function toggleViewAction(viewOpen: boolean): CategoryViewAction {
    return { type: CategoryViewActionType.toggleView, payload: viewOpen };
}
export function setCategoryAction(category: Category): CategoryViewAction {
    return { type: CategoryViewActionType.setCategory, payload: category };
}



export function categoryViewReducer(currentState: CategoryViewState = new CategoryViewState(), action: CategoryViewAction): CategoryViewState {
    const newState = { ...currentState };

    switch (action.type) {
        case CategoryViewActionType.toggleView:
            newState.viewOpen = action.payload;
            break;
        case CategoryViewActionType.setCategory:
            newState.category = action.payload;
            break;
    }

    return newState;
}





