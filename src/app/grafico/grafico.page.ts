import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GraficosComponent } from '../fotos/graficos/graficos.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, GraficosComponent]
})
export class GraficoPage implements OnInit {

  @Input() tipo: 'linda' | 'fea' = 'linda';
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tipoParam = params['tipo'];
      if (tipoParam === 'linda' || tipoParam === 'fea') {
        this.tipo = tipoParam;
      }
    });
  }

}
