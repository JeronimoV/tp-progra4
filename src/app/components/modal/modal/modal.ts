import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  @Input() modalAbierto: boolean = false;
  @Input() titulo: string = "Hola";
  @Input() mensaje: string = "Este es un mensaje de prueba";

  @Output() cambioModal = new EventEmitter<boolean>();

  cerrarModal() {
    this.cambioModal.emit(false);
    this.modalAbierto = false;
  }
}
