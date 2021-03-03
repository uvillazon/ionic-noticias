import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  noticias: Article[] = [];
  noticia: Article = {
    source: { id: 'cnn', name: 'CNN' },
    author:
      'Lindsay Isaac, Laura Smith-Spark, Angela Dewan and Max Foster, CNN',
    title:
      '1Buckingham Palace to investigate allegations that Meghan, Duchess of Sussex, bullied UK staff - CNN ',
    description:
      'Buckingham Palace said Wednesday it would investigate allegations that Meghan, the Duchess of Sussex, bullied several staff members after a British media report cited unnamed royal aides saying a complaint had been made against her in 2018.',
    url:
      'https://www.cnn.com/2021/03/03/uk/meghan-harry-bullying-allegations-smear-gbr-intl/index.html',
    urlToImage:
      'https://cdn.cnn.com/cnnnext/dam/assets/201011050533-meghan-markle-prince-harry-super-tease.jpg',
    publishedAt: '2021-03-03T19:38:00Z',
    content: 'London (CNN)Buckingham Palace said es … [+3730 chars]',
  };
  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    // this.noticias = [];
    // console.log('constructorDataLocalService',this.noticias);
    // this.noticia.title ='hola';

    this.guardarNoticia(this.noticia);
    this.cargarFavorito();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000,
    });
    toast.present();
  }

  guardarNoticia(noticia: Article) {
    // console.log('guardarNoticiaaaaaaaaaaaaaaaaa');
    // console.log('guardar Noticia',this.noticias);
    // if (!this.noticias) {
    console.log('guardarNoticia', this.noticia);
    const existe = this.noticias.find((noti) => noti.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('se agrego a favoritos');
    } else {
      this.presentToast('existe el favorito. Intente con otra noticia');
    }
    // } else {
    //   console.log('guardarNoticia',noticia);
    //   this.noticias.unshift(noticia);
    //   this.storage.set('favoritos', noticia);
    //   this.presentToast('se agrego a favoritos');
    // }
  }
  async cargarFavorito() {
    console.log('async');
    const favoritos = await this.storage.get('favoritos');
    console.log('await favoritos', favoritos);
    this.noticias = favoritos;
    console.log('await this.noticias', this.noticias);
    // const favoritos = await this.storage.get('favoritos');
    // if (favoritos) {
    //   this.noticias = favoritos;
    // }
    // return this.noticias;
    // this.noticias = favoritos;
    // console.log('noticias', this.noticias);
    // this.storage.get('favoritos').then((favoritos) => {
    //   console.log('favoritos',favoritos);
    //   this.noticias = favoritos;
    // });
  }
  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(
      (noti) => noti.title !== noticia.title
    );
    this.storage.set('favoritos', this.noticias);
    this.presentToast('se elimino de favoritos');
  }
}
