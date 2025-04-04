import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.usuario || !this.contrasena) {
      this.error = 'Usuario y contraseña son requeridos';
      return;
    }

    const payload = { usuario: this.usuario, contrasena: this.contrasena };

    this.http.post('http://127.0.0.1:5000/api/autenticar', payload).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token); // Guardar el JWT en localStorage
        this.router.navigate(['/']); // Redirigir al home o dashboard
      },
      error: () => {
        this.error = 'Credenciales inválidas';
      }
    });
  }
}
