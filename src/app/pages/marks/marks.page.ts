import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.page.html',
  styleUrls: ['./marks.page.scss'],
  standalone: false,
})
export class MarksPage implements OnInit {
  isResult: boolean = false;
  examData:any;
    totalMarks = 0;
  subjects:any=[];
   maxMarks = 0;
  isLoading: boolean = false;
  marks: any = [];
  subjectNameMap: Record<string, string> = {
  TEL: 'Telugu',
  ENG: 'English',
  HIN: 'Hindi',
  MATH: 'Maths',
  NS: 'Natural Science',
  PS: 'Physical Science',
  COMP: 'Computer',
  SOC: 'Social Studies'
};
  constructor(private navCtrl: NavController, private router: Router, private langandparmisionService: LangandparmisionService) { }

  ngOnInit() {
    this.getMarks();
  }
  getMarks() {
    this.isLoading = true;
    this.langandparmisionService.getMarks().subscribe((data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        this.marks = data.data.marks;
        this.marks = Object.keys(data.data.marks).map(exam => ({
          examName: exam,
          subjects: data.data.marks[exam]
        }));
        console.log(this.marks);

      }
    });
  }
getSubjects(subjects: Record<string, Record<string, string>>): { name: string; marks: string | null }[] {
  const classKey = '9'; // update based on class level
  return Object.entries(subjects).map(([name, markObj]) => ({
    name,
    marks: markObj[classKey] || null
  }));
}

getTotalMarks(subjects: Record<string, Record<string, string>>): number {
  const classKey = '9'; // update as needed
  let total = 0;

  Object.values(subjects).forEach((markObj:any) => {
    const mark = parseInt(markObj.marks[classKey]);
    if (!isNaN(mark)) {
      total += mark;
    }
  });

  return total;
}
  navigateHome() {
    if (this.isResult)
      this.isResult = false;
    else
      this.router.navigate(['/home'], { replaceUrl: true });
  }
  gotoResult(data:any) {
    this.isResult = true;
    this.examData =data;
    this.totalMarks = 0;
    if (this.examData && this.examData.subjects) {
      const classKey = '9'; // replace with dynamic class if needed

      // Extract subjects array
      this.subjects = Object.entries(this.examData.subjects).map(([name, markObj]: any) => {
        const marks = parseInt(markObj.marks[classKey]) || 0;
        const subjectName = this.subjectNameMap[name] || name;
        this.totalMarks += marks;
        return { name: subjectName, marks, totalmarks: markObj.max_mark};
      });

      this.subjects.forEach((subject:any)=>{
       this.maxMarks = +this.maxMarks + +subject.totalmarks
      })

    }
  }


    get percentage(): number {
    return (this.totalMarks / this.maxMarks) * 100;
  }

  get feedback(): string {
    if (this.percentage >= 75) {
      return 'Excellent';
    } else if (this.percentage >= 50) {
      return 'Good';
    } else {
      return 'Needs Improvement';
    }
  }
  
}
