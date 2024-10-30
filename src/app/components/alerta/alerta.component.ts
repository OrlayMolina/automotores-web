import { Component, Input } from '@angular/core';
import { AlertaDTO } from '../../dto/alerta-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {

  @Input() alerta!: AlertaDTO | null;

  public ocultar() {
    this.alerta = null;
  }

  public getAlertClass(tipo: string): string {
    console.log("Tipo de alerta:", tipo);
    switch (tipo) {
      case 'success':
        return 'bg-green-600 text-white border text-center text-xl p-4 rounded-xl';
      case 'danger':
        return 'bg-red-600 text-white border text-center text-xl p-4 rounded-xl';
      case 'info':
        return 'bg-blue-600 text-white border text-center text-xl p-4 rounded-xl';
      case 'warning':
        return 'bg-yellow-600 text-white border text-center text-xl p-4 rounded-xl';
      default:
        return 'bg-gray-600 text-white border text-center text-xl p-4 rounded-xl';
    }
  }
}
