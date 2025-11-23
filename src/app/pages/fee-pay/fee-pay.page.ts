import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';

@Component({
  selector: 'app-fee-pay',
  templateUrl: './fee-pay.page.html',
  styleUrls: ['./fee-pay.page.scss'],
  standalone: false
})
export class FeePayPage implements OnInit {
  invoiceList: any[] = [];
  isLoading: boolean = false;

  // Full-page invoice detail
  selectedInvoice: any = null;
  payments: any[] = [];
  showDetail: boolean = false;
 constructor(
    public navCtrl: NavController,
    private router: Router,
    private apiservice: LangandparmisionService
  ) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.isLoading = true;
    this.apiservice.getInvoiceList().subscribe(
      (data: any) => {
        this.isLoading = false;
        if (data.status && data.data.maininvoices.length > 0) {
          this.invoiceList = data.data.maininvoices.map((inv: any) => ({
            maininvoiceID: inv.maininvoiceID,
            student: inv.srname,
            father: inv.srfathername || 'N/A',
            class: inv.srclasses.replace(' TH CLASS', 'th'),
            section: inv.srsection,
            total: inv.totalamount,
            balance: inv.balance,
            date: this.formatDate(inv.maininvoicedate),
            paidstatus: this.getPaidStatus(inv),
          }));
        }
      },
      (err) => {
        this.isLoading = false;
        console.error('Invoice API error:', err);
      }
    );
  }

  viewInvoice(invoice: any) {
    this.isLoading = true;
    this.apiservice.getInvoicePaymentList(invoice.maininvoiceID).subscribe(
      (data: any) => {
        this.isLoading = false;
        if (data.status) {
          this.selectedInvoice = invoice;
          this.payments = data.data.paymentlists;
          this.showDetail = true; // Show full-page detail
        }
      },
      (err) => {
        this.isLoading = false;
        console.error('Payment API error:', err);
      }
    );
  }

  goBack() {
    this.showDetail = false;
    this.selectedInvoice = null;
    this.payments = [];
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric' } as const;
    return date.toLocaleDateString('en-GB', options);
  }

  getPaidStatus(invoice: any): number {
    const paid = parseFloat(invoice.totalpayment) || 0;
    const balance = parseFloat(invoice.balance) || 0;
    if (paid === 0) return 0;
    if (balance === 0) return 2;
    return 1;
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

  back(){
    if(this.showDetail){
      this.showDetail = false;
    }else if(!this.showDetail){
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }
}
