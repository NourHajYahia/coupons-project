// Handling customers AppState
import CustomerModel from "../Models/CustomerModel";

// customers AppState
export class CustomersState {
    public customers: CustomerModel[] = []; // creating initial object
}

// ----------------------------------------------------------

// customers Action Types:
export enum CustomersActionType {
    CustomersDownloaded = "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted"
}

// -----------------------------------------------------------

// customer Action - an object that holding the action data
export interface CustomersAction {
    type: CustomersActionType;
    payload: any;
}

// --------------------------------------------------------------

// customers Action Creators: functions which takes payload and action type and returns the action object

export function CustomersDownloadedAction(customers: CustomerModel[]): CustomersAction {
    return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}

export function CustomerAddedAction(customers: CustomerModel): CustomersAction {
    return { type: CustomersActionType.CustomerAdded, payload: customers };
}

export function CustomerUpdatedAction(customers: CustomerModel): CustomersAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customers };
}

export function CustomerDeletedAction(id: number): CustomersAction {
    return { type: CustomersActionType.CustomerDeleted, payload: id };
}

// -----------------------------------------------------------------------

// customer Reducer: 
export function customersReducer(currentState: CustomersState = new CustomersState(), action: CustomersAction): CustomersState {
    const newState = { ...currentState }; // Spread Operator - making a copy of the object

    switch (action.type) {
        case CustomersActionType.CustomersDownloaded:
            newState.customers = action.payload; // Here payload is all customers!
            break;
        case CustomersActionType.CustomerAdded:
            newState.customers.push(action.payload); // Here payload is added customer!
            break;
        case CustomersActionType.CustomerUpdated:
            newState.customers.forEach((customer, index) => {
                if (customer.id === action.payload.id) {
                    newState.customers.splice(index, 1, action.payload);
                }
            })
            break;
        case CustomersActionType.CustomerDeleted:
            newState.customers.forEach((customer, index) => {
                if (customer.id === action.payload) {
                    newState.customers.splice(index, 1);
                }
            })
            break;

    }


    return newState;
}