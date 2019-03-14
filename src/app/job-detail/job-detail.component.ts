import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobModel } from '../models/job.model';
import { JobType } from '../models/job-type';
import { MatDialog } from '@angular/material';
import { ApplyDialogComponent } from '../apply-dialog/apply-dialog.component';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  JobType: typeof JobType = JobType;

  @Input() subDomain: string;
  @Input() model: JobModel;
  @Output() backClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  back(): void {
    this.backClicked.emit();
  }

  apply(): void {
    this.dialog.open(ApplyDialogComponent, {
      width: '400px',
      data: { subDomain: this.subDomain, job: this.model },
    });
  }
}
