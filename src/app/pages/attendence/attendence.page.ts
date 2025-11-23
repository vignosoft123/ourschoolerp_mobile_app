import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
  standalone: false,
})
export class AttendencePage implements OnInit {
  isLoading:boolean = false;
  currentMonth: string = '';
  isFirstMonth = false;
isCurrentMonth = false;
  currentDate: string = '';
  constructor(private navCtrl: NavController,private router: Router,
    private langandparmisionService: LangandparmisionService,) { }
    attendanceData:any;
  attendanceMonth: any = {};
  currentMonthKey: string = '';
  months: any[] = [];
  currentMonthIndex: number = 0;
  
  ngOnInit() {
    const loggedinData:any  = localStorage.getItem('loggedinData');
  
   
      const loggedData = JSON.parse(loggedinData);
      if(loggedData.usertype.usertype == "Student")
        this.getAttendence(loggedData.class.classesID)
    
    const date = new Date();
    this.currentMonth = date.toLocaleString('default', { month: 'long' });
    this.currentDate = date.toLocaleString('default', { weekday: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear();
    this.isCurrentMonth = true;
  }
  navigateHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
  getAttendence(classId:any){
    this.isLoading = true;
    this.langandparmisionService.getStudentAttendence(classId).subscribe((data: any) => {   
        if (data.status === true) {
            setTimeout(() => {
                this.isLoading = false;
            }, 1);

            this.attendanceData = data.data.attendance;
           
            // Dynamically create months array if not provided
            this.months = Object.keys(this.attendanceData).map(monthKey => ({
                monthkey: monthKey,
                monthname: new Date(monthKey + "-01").toLocaleString('default', { month: 'long', year: 'numeric' })
            }));

            // Set the current month as default
            const today = new Date();
            const currentMonthStr = today.toISOString().slice(0, 7).split('-').reverse().join('-');
            this.currentMonthIndex = this.months.findIndex(month => month.monthkey === currentMonthStr);
            
            // If the current month isn't found, set to the latest available month
            if (this.currentMonthIndex === -1) {
                this.currentMonthIndex = this.months.length - 1;
            }

            this.setAttendanceMonth();
             this.calculateMonthlyAttendance(); 
        }
    });
}

  

setAttendanceMonth(): void {
  if (!this.months || this.currentMonthIndex === -1) {
      console.error("Months data is missing or currentMonthIndex is invalid.");
      return;
  }

  const monthKey = this.months[this.currentMonthIndex].monthkey;
  this.currentMonthKey = monthKey;
 // Set the current month and date display
  const [month, year] = monthKey.split('-').map(Number);
  const date = new Date(year, month - 1, 1);  // Set to the first day of the selected month
  this.currentMonth = date.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Set the first visible date (usually 1st of the selected month)
  const firstDay = new Date(year, month - 1, 1);
  this.currentDate = firstDay.toLocaleString('default', { weekday: 'long' }) + ' 1, ' + year;

   // Update button visibility
  this.isFirstMonth = this.currentMonthIndex === 0;
  this.isCurrentMonth = this.currentMonthIndex === this.months.length - 1;

  // Use the top-level attendanceData directly
  this.attendanceMonth = this.attendanceData[monthKey] || {};
  console.log(this.attendanceMonth);
}


goToPreviousMonth(): void {
  if (this.currentMonthIndex > 0) {
    this.currentMonthIndex--;
    this.setAttendanceMonth();
    this.calculateMonthlyAttendance(); 
  }
}

goToNextMonth(): void {
  if (this.currentMonthIndex < this.months.length - 1) {
    this.currentMonthIndex++;
    this.setAttendanceMonth();
    this.calculateMonthlyAttendance(); 
  }
}
getDayClass(day: any) {
  if (!day) return '';

  const status = this.attendanceMonth[day] || 'N/A';
  
  switch (status) {
    case 'P':
      return 'present';
    case 'A':
      return 'absent';
      case 'H':
      return 'holiday';
    case 'W':
      return 'weekend';
    case 'N/A':
    default:
      return 'na';
  }
}
get daysWithOffset(): (number | null)[] {
  if (!this.currentMonthKey) return [];
  
  const monthYear = this.currentMonthKey.split('-');
  const year = parseInt(monthYear[1]);
  const month = parseInt(monthYear[0]) - 1;
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add offset for the first week
  const daysArray = Array(firstDayOfMonth).fill(null);

  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return daysArray;
}


yearlyAttendanceSummary = {
  present: 0,
  absent: 0,
  holidays: 0,
  totalDays: 0
};

calculateMonthlyAttendance(): void {
  if (!this.attendanceMonth) return;

  let presentCount = 0;
  let absentCount = 0;
  let holidayCount = 0;
  let totalDays = 0;

  Object.values(this.attendanceMonth).forEach((status: any) => {
    totalDays++;
    switch (status) {
      case 'P':
        presentCount++;
        break;
      case 'A':
        absentCount++;
        break;
      case 'H':
        holidayCount++;
        break;
      default:
        break;
    }
  });

  this.yearlyAttendanceSummary = {
    present: presentCount,
    absent: absentCount,
    holidays: holidayCount,
    totalDays: totalDays
  };
}


}


