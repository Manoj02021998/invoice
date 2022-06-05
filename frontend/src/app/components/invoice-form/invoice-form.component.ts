import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicService } from 'src/app/Services/basic.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;
  result: any;
  constructor(private fb: FormBuilder,
    private basicService: BasicService,
    private toaster: ToastrService,
    private router: Router) {
    this.invoiceForm = this.fb.group({
      invoice_number: [null,Validators.compose([Validators.required, Validators.pattern(/[0-9]/)])],
      party_name: [null, Validators.compose([Validators.required, Validators.pattern(/^[A-Za-z ]+$/)])],
      invoice_date: [null, Validators.compose([Validators.required])],
      pan: [null, Validators.compose([Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)])],
      rate: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*-?\d+(\.\d{1,2})?\s*$/)])],
      tax: [null,Validators.compose([Validators.required, Validators.pattern(/^\s*-?\d+(\.\d{1,2})?\s*$/)])],
      total: [null]
    })

    this.invoiceForm.controls.rate.valueChanges.subscribe(
      value => {
        if(this.invoiceForm.controls.tax.value){
          this.invoiceForm.controls.total.setValue((value + this.invoiceForm.controls.tax.value).toFixed(2));
        }
      }
    )

    this.invoiceForm.controls.tax.valueChanges.subscribe(
      value => {
        if(this.invoiceForm.controls.rate.value){
          this.invoiceForm.controls.total.setValue((value + this.invoiceForm.controls.rate.value).toFixed(2));
        }
      }
    )
   }

  ngOnInit() {
    
  }


  submitInvoice(values){
    let invoice_date = new Date(this.invoiceForm.controls.invoice_date.value)
    if((invoice_date).toString() == 'Invalid Date'){
      this.toaster.error("Invalid date!")
      return;
    }
    if(invoice_date > new Date()){
      this.toaster.error("Invoice date cannot be greater then today's date!")
      return;
    }else{
      let date = new Date("1990-01-01");
      if(invoice_date < date){
        this.toaster.error("Invoice date cannot be less than 1st Jan 1990!");
        return;
      }
    }
    
    if(this.invoiceForm.valid){
      this.basicService.addInvoice(values).subscribe(
        data => {
          if(data['type'] == 'Success'){
            this.toaster.success(data['reason']);
            this.router.navigateByUrl('/invoices');
          }else{
            this.toaster.error(data['reason']);
          }
        }
      )

    }else{
      alert("Please enter all the values!")
    }
  }

  isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode >= 48 && charCode <= 57)
      return true;

    return false;
  }

  isCharKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode >= 48 && charCode <= 57){
      return false;
    }
    return true;
  }

}
