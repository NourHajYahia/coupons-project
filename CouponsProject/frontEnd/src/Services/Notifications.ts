import { Notyf } from "notyf";
import { logoutAction } from "../Redux/AuthState";
import store from "../Redux/Store";


class Notify {

    private notification = new Notyf({ duration: 4000, position: { x: "left", y: "top" } });

    public success(message: string) {
        this.notification.success(message);

    }

    public error(err: any) {
        const message = this.extractMessage(err);
        this.notification.error(message);
    }

    private extractMessage(err: any): string {

        if (typeof err === "string") {
            return err;
        }

        if (typeof err?.response?.data.message === "string") { // Backend exact error
            if (err.response.data.status === 401) {
                store.dispatch(logoutAction());
            }
            return err.response.data;
        }

        if (Array.isArray(err?.response?.data)) { // Backend exact errors
            return err.response.data[0];
        }

        if (typeof err?.message === "string") {
            return err.message;
        }

        return "Some error occurred, please try again.";
    }


}

const notify = new Notify();

export default notify;