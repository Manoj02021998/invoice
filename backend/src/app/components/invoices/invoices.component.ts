import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasicService } from 'src/app/Services/basic.service';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices: any;

  constructor(private basicService: BasicService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basicService.getInvoices().subscribe(
      data => {
        if(data['type'] == 'Success'){
          this.invoices = data['invoices'];
        }else{
          this.toastr.error(data['reason']);
        }
      }
    )
  }

  generateInvoice(id){
    this.basicService.generateInvoice(id).subscribe(
      data => importedSaveAs(data,'invoice.pdf')      
    )
  }

}
