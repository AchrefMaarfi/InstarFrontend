import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../components/auth-illustration/auth-illustration.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = '';

  // status bar color

  isEmailFilled: boolean = false;
  isPasswordFilled: boolean = false;
  emailWarning: string = '';

  // Function to check if email field is filled
  checkEmailField() {
    this.isEmailFilled = this.username.trim() !== '';

    // Call the checkPasswordField() function only when the email field is filled
    if (this.isEmailFilled) {
      this.checkPasswordField();
    } else {
      // Reset isPasswordFilled when the email field is not filled
      this.isPasswordFilled = false;

      // Set the email warning message
      this.emailWarning = 'Please enter your email first.';
    }
  }

  // Function to check if password field is filled
  checkPasswordField() {
    // Ensure that this function is only called when the email field is filled
      this.isPasswordFilled = this.password.trim() !== '';
 
      if (this.isPasswordFilled && !this.isEmailFilled) {
        this.emailWarning = 'Please enter your email first.';
        this.isPasswordFilled = false;
      } else {
        this.emailWarning = '';
      }
    }
  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (data: any) => {
        // Login success, redirection handled in the service
        console.log(data);
        if (data.userRole == "user") {
          this.router.navigate(['/provider/dashboard']);
        } else if( data.userRole == "admin" ){
        this.router.navigate(['/admin/dashboard']);
        }
      },
      error => {
        // Handle login error, show error message to user
        this.password = '';
        this.loginError = error.error.message;
      }
    );
  }
}
