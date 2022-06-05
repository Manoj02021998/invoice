import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicService } from 'src/app/Services/basic.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  result: any;
  constructor(private fb: FormBuilder,
    private basicService: BasicService,
    private router: Router) {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      mobile: [null, Validators.required],
      role: [1, Validators.required],
      password: [null,Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('(?=^.{6,}$)(?=.*[0-9])(?![.\n])(?=.*[@!#$%^&*-+:;_=,.<>~`/()\\[\\{}])(?=.*[A-Z])(?=.*[a-z]).*$')])],
      password_confirmation: [null, Validators.required]
    })
   }

  ngOnInit() {
    
  }


  registerSubmited(values){
    if(this.registerForm.valid){
    
      this.basicService.register(values).subscribe(
        data => {
          if(data['message'] == 'Success'){
            alert(data['reason']);
            this.router.navigateByUrl('/login');
          }else{
            alert(data['reason']);
          }
        }
      )

    }else{
      alert("Please enter all the values!")
    }
  }
}
