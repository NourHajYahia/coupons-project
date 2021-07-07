import { CouponModel } from '../Models/CouponModel';
// Handling coupons AppState


// coupons AppState
export class CouponsState {
    public coupons: CouponModel[] = []; // creating initial object
}

// ----------------------------------------------------------

// coupons Action Types:
export enum CouponsActionType {
    CouponsDownloaded = "CouponsDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted"
}

// -----------------------------------------------------------

// coupon Action - an object that holding the action data
export interface CouponsAction {
    type: CouponsActionType;
    payload: any;
}

// --------------------------------------------------------------

// coupons Action Creators: functions which takes payload and action type and returns the action object

export function CouponsDownloadedAction(coupons: CouponModel[]): CouponsAction {
    return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function CouponAddedAction(coupons: CouponModel): CouponsAction {
    return { type: CouponsActionType.CouponAdded, payload: coupons };
}

export function CouponUpdatedAction(coupons: CouponModel): CouponsAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupons };
}

export function CouponDeletedAction(id: number): CouponsAction {
    return { type: CouponsActionType.CouponDeleted, payload: id };
}

// -----------------------------------------------------------------------

// coupon Reducer: 
export function couponsReducer(currentState: CouponsState = new CouponsState(), action: CouponsAction): CouponsState {
    const newState = { ...currentState }; // Spread Operator - making a copy of the object

    switch (action.type) {
        case CouponsActionType.CouponsDownloaded:
            newState.coupons = action.payload; // Here payload is all coupons!
            break;
        case CouponsActionType.CouponAdded:
            newState.coupons.push(action.payload); // Here payload is added coupon!
            break;
        case CouponsActionType.CouponUpdated:
            const couponPayload = action.payload as CouponModel;
            newState.coupons.forEach((coupon, index) => {
                if (coupon.id === couponPayload.id) {
                    newState.coupons.splice(index, 1, action.payload);
                }
            })
            break;
        case CouponsActionType.CouponDeleted:
            newState.coupons.forEach((coupon, index) => {
                if (coupon.id === action.payload) {
                    newState.coupons.splice(index, 1);
                }
            })
            break;

    }


    return newState;
}