import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { LoaderComponent } from '../loader.component';
import { ToastComponent } from '../toast.component';
import { NetworkService} from '../../services/networkservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private loader: LoaderComponent, private toast: ToastComponent,     private networkService: NetworkService,
    ) { }

  ngOnInit() {
    this.networkService.initializeNetworkEvents();
  }

  login(form) {
    this.loader.presentLoading('Please wait ..');
    this.authService.login(form.value).subscribe(

      (res) => {
        this.loader.dismissLoading();
        this.router.navigateByUrl('home');
      },
      error => {
        this.loader.dismissLoading();
        this.toast.presentToaster("Login failed check email and password")
      });
  }
}
