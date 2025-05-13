import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType, PieController, ArcElement,Tooltip,Legend,Title,BarController, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { FotoService } from 'src/app/services/foto.service';
import { IonHeader, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { SupabaseService } from 'src/app/services/supabase.service';

Chart.register(PieController, ArcElement, Tooltip, Legend, Title,BarElement,BarController, CategoryScale, LinearScale);

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonToolbar, IonHeader]
})
export class GraficosComponent implements OnInit {
  @Input() tipo: 'linda' | 'fea' = 'linda';
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;
  chartData!: ChartData<'pie' | 'bar'>;
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };
  chartType!: ChartType;

  constructor(private supabase : SupabaseService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.generarGrafico(); // Esperar a que la vista esté lista
    }, 0);
  }

  async generarGrafico() {
    const votos = await this.supabase.obtenerVotosPorTipo(this.tipo);
    console.log('Votos obtenidos:', votos);
    const labels = votos.map((f: any) => {
      const partes = f.nombre.split('_'); // ["usuario@usuario.com", "2025-05-13T17:48:44.396Z.jpg"]
      const usuario = partes[0].split('@')[0]; // "usuario"
      const fechaIso = partes[1]?.split('T')[0]; // "2025-05-13"
      return `${usuario} (${fechaIso})`;
    });
    
    const data = votos.map((f: any) => f.votos);

    this.chartType = this.tipo === 'linda' ? 'pie' : 'bar';
    this.chartData = {
      labels,
      datasets: [{
        label: 'Votos',
        data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }]
    };

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions
    });
  }
}
