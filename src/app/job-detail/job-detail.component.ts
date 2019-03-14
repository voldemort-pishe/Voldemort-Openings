import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobModel } from '../models/job.model';
import { JobType } from '../models/job-type';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  JobType: typeof JobType = JobType;

  @Input() model: JobModel;
  @Output() backClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  back(): void {
    this.backClicked.emit();
  }

  apply(): void {

  }
}
