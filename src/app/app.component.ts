import { Component } from '@angular/core';
import { DataLocalService } from './services/data-local.service';
import { NoticiasService } from './services/noticias.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private noticiasService:NoticiasService , private datalocaService:DataLocalService) {

    
  }
}
