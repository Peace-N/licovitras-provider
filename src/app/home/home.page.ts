import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from  "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private  router:  Router) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Province',
      buttons: [{
        text: 'Gauteng',
        handler: () => {
          this.navigator('Gauteng');
        }
      }, {
        text: 'North West',
        handler: () => {
          this.navigator('North West');
        }
      }, {
        text: 'Northern Cape',
        handler: () => {
          this.navigator('Northern Cape');
        }
      }, {
        text: 'Western Cape',
        handler: () => {
          this.navigator('Western Cape');
        }
      },
      {
       text: 'Eastern Cape',
       handler: () => {
         this.navigator('Eastern Cape');
       }
     },
     {
      text: 'Mpumalanga',
      handler: () => {
        this.navigator('Mpumalanga');
      }
    },
    {
     text: 'Limpopo',
     handler: () => {
       this.navigator('Limpopo');
     }
   },
   {
    text: 'Kwazulu Natal',
    handler: () => {
      this.navigator('Kwazulu Natal');
    }
  },
  {
   text: 'Free State',
   handler: () => {
     this.navigator('Free State');
   }
 },
   {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  navigator(province: string) {
    this.router.navigateByUrl('cases/' + province);
  }

}
