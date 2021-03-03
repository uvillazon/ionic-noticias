import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  noticias:Article[]=[];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticia();
    // this.noticiasService.getTitulares().subscribe((resp) => {
    //   console.log(resp);
    //   this.noticias.push(... resp.articles);
    // });
  }

  loadData(event){
    console.log('eee');
    console.log(event);
    this.cargarNoticia(event);
  }
  cargarNoticia(event?){
    this.noticiasService.getTitulares().subscribe((resp) => {
      // console.log(resp.noticias);
      if(resp.articles.length === 0 ){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push(... resp.articles);
      console.log(this.noticias);
      if(event){
        event.target.complete();
      }
    });
  }
}
