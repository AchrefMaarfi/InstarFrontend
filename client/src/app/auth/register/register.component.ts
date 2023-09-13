import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../components/auth-illustration/auth-illustration.component.css']
})
export class RegisterComponent implements OnInit {
  registerError = '';
  confirmPassword = '';
  user = { username: '', email: '', phone: '', password: '' };

  // status bar color
  isUsernameFilled: boolean = false;
  isEmailFilled: boolean = false;
  isPhoneFilled: boolean = false;
  isPasswordFilled: boolean = false;
  isConfirmPasswordFilled: boolean = false;
  
  usernameWarning: string = '';
  emailWarning: string = '';
  phoneWarning: string = '';
  passwordWarning: string = '';
  confirmPasswordWarning: string = '';

  image: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  checkUsernameField() {
    this.isUsernameFilled = this.user.username.trim() !== '';
    if (!this.isUsernameFilled) {
      this.usernameWarning = 'Please enter your Username';
    }
  }
  
  checkEmailField() {
    this.isEmailFilled = this.user.email.trim() !== '';
    if (!this.isEmailFilled) {
      this.emailWarning = 'Please enter your email';
    }
  }

  checkPhoneField() {
    this.isPhoneFilled = this.user.phone.trim() !== '';
    if (!this.isPhoneFilled) {
      this.phoneWarning = 'Please enter your phone number';
    }
  }

  checkPasswordField() {
    this.isPasswordFilled = this.user.password.trim() !== '';
    if (!this.isPasswordFilled) {
      this.passwordWarning = 'Please enter your password';
    }
    
    if (this.isPasswordFilled && !this.isEmailFilled) {
      this.emailWarning = 'Please enter your email first.';
      this.isPasswordFilled = false;
    } else {
      this.emailWarning = '';
    }
  }

  checkConfirmPasswordField() {
    this.isConfirmPasswordFilled = this.confirmPassword.trim() !== '';
    if (!this.isConfirmPasswordFilled) {
      this.confirmPasswordWarning = 'Please confirm your password';
    }
  }

  register() {
    if (!this.isUsernameFilled || !this.isEmailFilled || !this.isPhoneFilled || !this.isPasswordFilled || !this.isConfirmPasswordFilled) {
      this.registerError = 'Please fill in all required fields.';
      return;
    }
    
    if (this.user.password !== this.confirmPassword) {
      this.registerError = 'Passwords do not match.';
      return;
    }
    
    this.authService.register(this.user)
      .subscribe(
        () => {
          alert("Register Successful");
          this.router.navigate(['login']);
        },
        error => {
          alert(`Register Failed: ${error.error.message}`);
          this.registerError = error.error.message;
        }
      );
  }

  select(e: any) {
    this.image = e.target.files[0];
  }
}
