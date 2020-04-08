import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
  })
  
export class LoaderComponent {

  private loader: HTMLIonLoadingElement;
  private loaderLoading = false;

  constructor(public loading: LoadingController) { }

  public presentLoading(message: string) {
    this.loaderLoading = true;
    this.loading.create({
        message,
        showBackdrop: true
    }).then(load => {
        this.loader = load;
        load.present().then(() => { this.loaderLoading = false; });
    });
}

public dismissLoading() {
    const interval = setInterval(() => {
        if (this.loader || !this.loaderLoading) {
            this.loader.dismiss().then(() => { this.loader = null; clearInterval(interval); });
        } else if (!this.loader && !this.loaderLoading) {
            clearInterval(interval);
        }
    }, 500);
}

}
