import { Component, effect, inject, signal } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Buttons } from '../../shared/components/buttons/buttons';
import { Navbar } from "../../layout/navbar/navbar";
import { UserService } from '../../core/services/user-service';
import { Users } from '../../shared/models/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    Buttons,
    MatRadioModule,
    Navbar
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.sass',
})
export class Profile {

  private userService = inject(UserService);
  optNotification: boolean = false; // Valor por defecto para el medio de notificación
  // readonly userName = signal<string>('');
  readonly dataUser = signal<Users[]>([]);
  readonly buttonName = signal<string>('');

  profileForm = new FormGroup({
    idUser: new FormControl<string>(''),
    userName: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9-._]+@[a-z0-9-]+\.[a-z0-9-.]{2,}$')
    ]),
    cellphone: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern('^3[0,1,2,3,5][0-9][0,1,2,3,4,5,6,7,8,9][0-9][0-9][0-9][0-9][0-9][0-9]*$')
    ]),
    method: new FormControl<boolean>(false, [Validators.required])
  });

  constructor() {
    this.getUser();
    effect(() => {
      this.setterDataUser();
    });
  }

  /***
   * Metodo para obtener el nombre del usuario, a nivel de prueba se
   * utiliza un ID fijo
   **/
  getUser() {
    this.userService.getUserById('FZn3eAOPqyU').subscribe({
      next: (res) => {
        if (res) {
          this.dataUser.set(res);
        }
      }, error: (error) => {
        Swal.fire({
          icon: 'error',
          title: `Se presento error ${error} al cargar el usuario.`
        });
      }
    });
  }

  setterDataUser() {
    this.profileForm.markAsUntouched();
    this.profileForm.markAsPristine();
    if (this.dataUser()[0]) {
      this.optNotification = !!this.dataUser()[0].method;
      this.profileForm.patchValue(this.dataUser()[0]);
      this.profileForm.controls.method.setValue(!!this.optNotification);
      this.buttonName.set('Actualizar');
    } else {
      this.profileForm.reset();
      this.buttonName.set('Guardar');
    }
  }

  saveUser() {
    this.profileForm.controls.method.setValue(!!this.optNotification);

    if (this.profileForm.valid) {
      const formUser = this.profileForm.getRawValue();
      const currentUser = this.dataUser()[0];
      const body: Users = {
        userName: formUser.userName ?? '',
        lastName: formUser.lastName ?? '',
        email: formUser.email ?? '',
        cellphone: formUser.cellphone ?? 0,
        method: formUser.method ?? false
      }

      // Verifica si el usuario ya existe
      if (currentUser?.id) {
        this.updateUser(currentUser.id, body);
      } else {
        this.createUser(body);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, complete correctamente todos los campos.'
      });
    }
  }

  createUser(body: Users) {
    this.userService.addUser(body).subscribe({
      next: (res) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario guardado exitosamente'
          });
          this.getUser();
        }
      }, error: (error) => {
        Swal.fire({
          icon: 'error',
          title: `Se presento error ${error} al crear el usuario.`
        });
        this.profileForm.reset();
      }
    });
  }

  updateUser(id: string, body: Users) {
    this.userService.updateUser(id, body).subscribe({
      next: (res) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario guardado exitosamente'
          });
          this.getUser();
        }
      }, error: (error) => {
        Swal.fire({
          icon: 'error',
          title: `Se presento error ${error} al guardar el usuario.`
        });
        this.profileForm.reset();
      }
    });
  }
}
