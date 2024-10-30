import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  AbstractControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  registroForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(7),
          ],
        ],
        confirmaPassword: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
      },
      { validators: this.passwordsMatchValidator } as AbstractControlOptions
    );
  }

  public registrar() {
    console.log(this.registroForm.value);
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
    return password == confirmaPassword ? null : { passwordsMismatch: true };
  }
}
