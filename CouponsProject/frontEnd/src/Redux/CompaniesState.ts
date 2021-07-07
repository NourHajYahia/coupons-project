// Handling Companies AppState
import CompanyModel from "../Models/CompanyModel";

// Companies AppState
export class CompaniesState {
    public companies: CompanyModel[] = []; // creating initial object
}

// ----------------------------------------------------------

// Companies Action Types:
export enum CompaniesActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted"
}

// -----------------------------------------------------------

// Company Action - an object that holding the action data
export interface CompaniesAction {
    type: CompaniesActionType;
    payload: any;
}

// --------------------------------------------------------------

// Companies Action Creators: functions which takes payload and action type and returns the action object

export function CompaniesDownloadedAction(companies: CompanyModel[]): CompaniesAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
}

export function CompanyAddedAction(companies: CompanyModel): CompaniesAction {
    return { type: CompaniesActionType.CompanyAdded, payload: companies };
}

export function CompanyUpdatedAction(companies: CompanyModel): CompaniesAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: companies };
}

export function CompanyDeletedAction(id: number): CompaniesAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

// -----------------------------------------------------------------------

// Company Reducer: 
export function companiesReducer(currentState: CompaniesState = new CompaniesState(), action: CompaniesAction): CompaniesState {
    const newState = { ...currentState }; // Spread Operator - making a copy of the object

    switch (action.type) {
        case CompaniesActionType.CompaniesDownloaded:
            newState.companies = action.payload; // Here payload is all Companies!
            break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload); // Here payload is added Company!
            break;
        case CompaniesActionType.CompanyUpdated:
            newState.companies.forEach((company, index) => {
                if (company.id === action.payload.id) {
                    newState.companies.splice(index, 1, action.payload);
                }
            })
            break;
        case CompaniesActionType.CompanyDeleted:
            newState.companies.forEach((company, index) => {
                if (company.id === action.payload) {
                    newState.companies.splice(index, 1);
                }
            })
            break;

    }


    return newState;
}