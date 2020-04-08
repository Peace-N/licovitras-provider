import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RestService } from "../services/rest.service";
import { LoaderComponent } from '../auth/loader.component';
import { ToastComponent } from '../auth/toast.component';



@Component({
  selector: 'app-cases',
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
})
export class CasesPage implements OnInit {

  public province: string;
  public activeCases: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private restProvider: RestService, private loader: LoaderComponent, private toast: ToastComponent) { }

  ngOnInit() {
    this.province = this.route.snapshot.paramMap.get("province")
    this.loader.presentLoading("Getting Active Cases");
    this.getActiveCases();
  }

  navigateToMap() {
    this.router.navigateByUrl('map');
  }

  getActiveCases() {
    this.restProvider.getActiveCases().subscribe(
      (data) => {
        this.activeCases = data;
        console.log(this.activeCases, this.activeCases.length);
        if (this.activeCases) {
          this.loader.dismissLoading();
        }
      },
      error => {
        this.loader.dismissLoading();
        this.toast.presentToaster("Could not get Active Cases, Check Connection");
      }
    );
  }

refreshData() {
  this.loader.presentLoading("Fetching More Cases");
  this.getActiveCases();
}

}
