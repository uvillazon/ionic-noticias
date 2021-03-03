import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment,{static:true}) segmento:IonSegment;
  categorias: any[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
noticias:Article[]=[];
  constructor(private noticiasService:NoticiasService) {}
  ngOnInit() {
    this.segmento.value = this.categorias[3];
    console.log('enttros tiger is g.y');
    this.cargarNoticia(this.categorias[1]);
   
  }
  loadData(event){

    this.cargarNoticia(this.segmento.value , event)
  }
  segmentChanged(event){
    this.noticias = [];
    console.log(event.detail.value);
    this.cargarNoticia(event.detail.value);
  }
  cargarNoticia(categoria:string , event?){
    this.noticiasService.getCategorias(categoria).subscribe((resp) => {
      // console.log(resp.noticias);
      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push(... resp.articles);
      if(event){
        event.target.complete();
      }
    });
  }
}
