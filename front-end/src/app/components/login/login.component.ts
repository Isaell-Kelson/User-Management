import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegister = false;
  email = '';
  password = '';
  name = '';
  status = 'ativo';

  toggleForm() {
    this.isRegister = !this.isRegister;
  }

  onLogin() {
    // Lógica de login
    console.log('Login:', this.email, this.password);
  }

  onRegister() {
    // Lógica de cadastro
    console.log('Cadastro:', this.name, this.email, this.password, this.status);
  }
}
