import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEndPoint } from 'src/app/config/config';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';
@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.page.html',
  styleUrls: ['./home-work.page.scss'],
  standalone: false,
})
export class HomeWorkPage implements OnInit {
  isLoading:boolean=false;
  assignmentList:any =[];
  isDetails:boolean =false;
  islist: boolean = true;
  selectedHomework: any = null
  viewMode: 'list' | 'detail' = 'list';
  apiEndPoint:any =  ApiEndPoint
  selectedFile: File | null = null;

  constructor(private router: Router,private apiservice: LangandparmisionService) { }

  ngOnInit() {
    this.getAssignmentList();
  }
   
  getAssignmentList() {
  this.isLoading = true;
  this.apiservice.getAssignmentList().subscribe(
    (data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        this.assignmentList = data.data.homework; // ✅ set homework array
      }
    },
    (error) => {
      this.isLoading = false;
      console.error('API Error:', error);
    }
  );
}

viewHomework(hw: any) {
  this.viewMode = 'detail';
  this.isLoading = true;

  this.apiservice.viewAssignment(hw.assignmentID, hw.classesID).subscribe(
    (data: any) => {
      this.isLoading = false;
      if (data.status === true) {
        // Merge list item (hw) with API details (assignmentanswers)
        this.selectedHomework = {
          ...hw, // keeps title, subject, description, deadline, etc.
          ...data.data // adds assignmentanswers, classesID, etc.
        };
      }
    },
    (error) => {
      this.isLoading = false;
      console.error('API Error:', error);
    }
  );
}


  navigateHome() {
  if (this.viewMode === 'detail') {
    this.viewMode = 'list';
  } else if (this.isDetails) {
    this.islist = true;
    this.isDetails = false;
  } else {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

submitHomework() {
  if (!this.selectedFile || !this.selectedHomework) {
    alert('Please select a file first.');
    return;
  }

  const formData = new FormData();
  formData.append('answerfile', this.selectedFile, this.selectedFile.name);

  this.isLoading = true;
  this.apiservice
    .submitAssignmentAnswer(this.selectedHomework.assignmentID, this.selectedHomework.classesID, formData)
    .subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res.status === true) {
          alert('Homework submitted successfully!');
          // reload details to see uploaded file
          this.viewHomework(this.selectedHomework);
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Submit Error:', error);
        alert('Failed to submit homework.');
      }
    );
}



}
