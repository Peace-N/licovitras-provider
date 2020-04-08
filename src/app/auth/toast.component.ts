import { Injectable } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})

export class ToastComponent {

    constructor(private toastController: ToastController) { }

    public presentToaster(message: string) {
        let toast = this.toastController.create({
            message: message,
            duration: 3000,
            position: 'bottom',
            color: "danger"
        });
        toast.then(toast => toast.present());
    }

    public dismissToaster() { }

}