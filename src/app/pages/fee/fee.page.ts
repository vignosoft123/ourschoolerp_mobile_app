import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.page.html',
  styleUrls: ['./fee.page.scss'],
   standalone: false,
})
export class FeePage implements OnInit {
  paymentList: any[] = [];
showPaymentPopup: boolean = false;
  islist:boolean = true;
  isSummary:boolean = false;
  ispayment:boolean = false;
  siteinfos:any
  invoiceList: any[] = [];
  createuser: any;
 invoices: any;
    maininvoice: any;
     grandtotalandpayment: any;
    student: any;
    permission: any;
    language: any;


viewMode: 'list' | 'detail' = 'list'; // default is list view
isLoading:boolean=false;
selectedInvoice: any = null;
  constructor(private navCtrl: NavController,private router: Router,private apiservice: LangandparmisionService) { }

  ngOnInit() {
    this.getInvoiceList();
  }
   
  getInvoiceList() {
    this.isLoading = true;
    this.apiservice.getInvoiceList().subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === true && data.data.maininvoices.length>0) {
         
            this.invoiceList = data.data.maininvoices.map((invoice: any) => {
            return {
               maininvoiceID:invoice.maininvoiceID,
              student: invoice.srname,
              father: 'N/A', // Replace if father's name is available in API
              class: invoice.srclasses.replace(' TH CLASS', 'th'), // Format: "10 TH CLASS" to "10th"
              section: invoice.srsection,
              total: invoice.totalamount,
              discount: invoice.totaldiscount,
              paid: invoice.totalpayment,
              balance: invoice.balance,
              date: this.formatDate(invoice.maininvoicedate),
              paidstatus: this.getPaidStatus(invoice),
             
            };
          });
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('API Error:', error);
      }
    );
  }

 formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric' } as const;
    return date.toLocaleDateString('en-GB', options); // Format: "27 Jul 2025"
  }

  getPaidStatus(invoice: any): number {
    const total = parseFloat(invoice.totalamount) || 0;
    const paid = parseFloat(invoice.totalpayment) || 0;
    const balance = parseFloat(invoice.balance) || 0;

    if (paid === 0) return 0; // Not Paid
    if (balance === 0) return 2; // Fully Paid
    return 1; // Partially Paid
  }

navigateHome() {
  if (this.viewMode === 'detail') {
    // Go back from detail to list
    this.viewMode = 'list';
  } else if (this.ispayment) {
    this.ispayment = false;
    this.isSummary = true;
  } else if (this.isSummary) {
    this.islist = true;
    this.isSummary = false;
  } else {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
  gotoSummary(){
    this.isSummary = true;
    this.islist = false;
  }
  paynow(){
    if(this.isSummary){
    this.ispayment = true;
    this.isSummary = false;
    }
      
  }

    viewInvoice(invoice: any) {
    this.selectedInvoice = invoice;
    this.viewMode = 'detail';
     this.isLoading = true;
    this.apiservice.viewInvoice(invoice.maininvoiceID).subscribe((data: any) => {
      this.isLoading = false;
      if(data.status === true){
         this.siteinfos = data.data.siteinfos;
        this.student = data.data.student;
              this.invoices = data.data.invoices;
              this.grandtotalandpayment = data.data.grandtotalandpayment;
              this.createuser = data.data.createuser;
              this.maininvoice = data.data.maininvoice;
            
             
      }
      console.log(data)
    });

  }

  getStatusColor(status: number): string {
    switch (status) {
      case 0: return 'danger';
      case 1: return 'warning';
      case 2: return 'success';
      default: return 'medium';
    }
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 0: return 'Not Paid';
      case 1: return 'Partially Paid';
      case 2: return 'Fully Paid';
      default: return 'Unknown';
    }
  }

 

goBackToList() {
  this.viewMode = 'list';
}

viewInvoiceList(invoice: any) {
  this.selectedInvoice = invoice;
  this.isLoading = true;

  this.apiservice.getInvoicePaymentList(invoice.maininvoiceID).subscribe(
    (data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        // You can store the payment list in a variable
        this.paymentList = data.data.paymentlists;
        console.log('Payment List:', this.paymentList);

        // Optionally, open a modal or set a flag to show popup
        this.showPaymentPopup = true;
      } else {
        console.error('Failed to fetch payment list');
      }
    },
    (error) => {
      this.isLoading = false;
      console.error('API Error:', error);
    }
  );
}

  closePaymentPopup() {
    this.showPaymentPopup = false;
  }
}
