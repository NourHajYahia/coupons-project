import ClientModel from '../Models/ClientModel';

// Auth State
export class AuthState {
    public client: ClientModel = null;
    public constructor() {
        const storedClient = JSON.parse(sessionStorage.getItem("client"));
        if (storedClient) {
            this.client = storedClient;
        }
    }
}

// ----------------------------------------------------------

// Auth Action Types:
export enum AuthActionType {
    login = "login",
    logout = "logout"
}

// -----------------------------------------------------------

// Auth Action - an object that holding the action data
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// --------------------------------------------------------------

// Auth Action Creators: functions which takes payload and action type and returns the action object
export function loginAction(client: ClientModel): AuthAction {
    return { type: AuthActionType.login, payload: client };
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.logout };
}


export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.login:
            newState.client = action.payload;
            sessionStorage.setItem("client", JSON.stringify(newState.client));
            break;
        case AuthActionType.logout:
            newState.client = null;
            sessionStorage.removeItem("client");
            break;
    }

    return newState;
}





