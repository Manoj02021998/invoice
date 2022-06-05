import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { BasicService } from 'src/app/Services/basic.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  result: any;
  payload: any;
  constructor(private fb: FormBuilder,
    private basicService: BasicService,
    private token: TokenService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.loginform = this.fb.group({
  
      email: [null, Validators.required],
      password: [null,Validators.compose([Validators.required])],
      
    })
   }

  ngOnInit() {
    
  }


  login(values){
    if(this.loginform.valid){
    
      this.basicService.login(values).subscribe(
        data => {
          if(data['type'] == 'Success'){
            this.token.handle(data['token']);
            this.auth.changeStatus(true);
        
            this.payload = this.token.payload(data['token']);
            
            const role = this.payload['role_id'];
        
            switch (role) {
              case 1: {
                this.router.navigateByUrl('/invoices');
                break;
              }
              default: {
                this.auth.logout();
              }
            }
          }else{
            this.toastr.error(data['reason']);
          }
        }
      )

    }else{
      alert("Please enter all the values!")
    }
  }
}
