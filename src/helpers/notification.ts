import { store } from "react-notifications-component";

export function notify(title: string, message: string) {
    store.addNotification({
        title: title || 'Successful!!',
        message: message || 'Item Successfully added..',
        type: title === 'Successful!!' ? 'success' : 'danger',
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false
        }
      });
}
