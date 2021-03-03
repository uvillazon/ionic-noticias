import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos;
  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialShare: SocialSharing,
    private datalocal: DataLocalService
  ) {}

  ngOnInit() {}

  onAbrirNoticia() {
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async presentActionSheet() {
    let guardarBorrarBtn;
    if (!this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Favoritos',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.datalocal.guardarNoticia(this.noticia);
        },
      };
    } else {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar clicked');
          this.datalocal.borrarNoticia(this.noticia);
        },
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');
            this.socialShare.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            );
          },
        },
        guardarBorrarBtn,
        {
          text: 'Cancel',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
}

//   async lanzarMenu() {
//     console.log('lanzar menyu');
//     const actionSheet = await  this.actionSheetCtrl.create({
//       buttons: [
//         {
//           text: 'Compartir',
//           icon: 'share',
//           // cssClass : 'action-dark',
//           handler: () => {
//             console.log('Share clicked');
//           },
//         },
//         ,
//         {
//           text: 'Favorite',
//           icon: 'start',
//           // cssClass : 'action-dark',
//           handler: () => {
//             console.log('Favorite clicked');
//           },
//         },
//         {
//           text: 'Cancelars',
//           icon: 'close',
//           handler: () => {
//             console.log('Cancel clicked');
//           },
//         },
//       ],
//     });

//     await actionSheet.present();

//   }
// }
