import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobModel } from '../models/job.model';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-apply-dialog',
  templateUrl: './apply-dialog.component.html',
  styleUrls: ['./apply-dialog.component.scss']
})
export class ApplyDialogComponent implements OnInit {

  form: FormGroup;
  fileIdControl: FormControl;
  subDomain: string;
  job: JobModel;
  selectedFile: File;
  uploadPercentage: number;

  get isFileUploaded(): boolean {
    return this.fileIdControl.valid;
  }

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ApplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { subDomain: string, job: JobModel },
  ) {
    this.subDomain = data.subDomain;
    this.job = data.job;
  }

  ngOnInit() {
    this.fileIdControl = new FormControl(null, Validators.required);
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      cellphone: new FormControl(null, Validators.required),
      fileId: this.fileIdControl,
      jobUniqueId: new FormControl(null, Validators.required),
    });

    this.form.patchValue({ jobUniqueId: this.job.uniqueId });
  }

  onFileChange(fileList: FileList): void {
    this.form.patchValue({ fileId: null });

    this.selectedFile = fileList[0];
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post<any>(`${environment.baseUrl}career-page/file/${this.subDomain}`, formData, { reportProgress: true })
      .subscribe(r => {
        if (r.type === HttpEventType.UploadProgress) {
          this.uploadPercentage = Math.round(100 * r.loaded / r.total);
          console.log(`File is ${this.uploadPercentage}% uploaded.`);
        }
        else if (r instanceof HttpResponse) {
          this.form.patchValue({ fileId: r.body.id });
        }
      });
  }

  submit(): void {
    this.http.post<any>(`${environment.baseUrl}career-page/candidate/${this.subDomain}`, this.form.value)
      .subscribe(r => {
        this.snackBar.open(r.message, null, { duration: 3000 });
        this.dialogRef.close();
      });
  }
}
