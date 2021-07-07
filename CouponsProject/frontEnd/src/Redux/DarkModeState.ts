
// Dark Mode State
export class DarkModeState {
    public darkModeOn: boolean = false;
    public constructor() {
        const storedDarkModeOn = JSON.parse(localStorage.getItem("darkMode"));
        if (storedDarkModeOn) {
            this.darkModeOn = storedDarkModeOn;
        }
    }
}

// ----------------------------------------------------------

// Dark Mode Action Types:
export enum DarkModeType {
    toggle = "toggle",

}

// -----------------------------------------------------------

// Dark Mode Action - an object that holding the action data
export interface DarkModeAction {
    type: DarkModeType;
}

// --------------------------------------------------------------

// Dark Mode Action Creators: functions which takes payload and action type and returns the action object
export function darkModeToggle(): DarkModeAction {
    return { type: DarkModeType.toggle };
}




export function darkModeReducer(currentState: DarkModeState = new DarkModeState(), action: DarkModeAction): DarkModeState {
    const newState = { ...currentState };

    if (action.type === DarkModeType.toggle) {
        newState.darkModeOn = !newState.darkModeOn;
        localStorage.setItem("darkMode", JSON.stringify(newState.darkModeOn));
    }

    return newState;
}





