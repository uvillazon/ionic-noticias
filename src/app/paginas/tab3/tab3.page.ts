import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page  {
  noticias: Article[] = [];
  enFavoritos = true;
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
  constructor(public dataLocalService: DataLocalService) {
    // console.log('dataLocalService conbstrucftor', this.dataLocalService.noticias);
  }

  // ngOnInit() {
  //   console.log('datalocalt tab3', this.dataLocalService.noticias);
  //   // this.dataLocalService.cargarFavorito().then(notic => {
  //   //   this.noticias = notic
  //   // });
  //   // this.noticias = this.dataLocalService.noticias;
  // }
}
