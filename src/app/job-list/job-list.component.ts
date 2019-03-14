import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JobModel } from '../models/job.model';
import { JobType } from '../models/job-type';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnChanges {

  JobType:typeof JobType=JobType;

  @Input() subDomain: string;
  jobs: JobModel[];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.http.get<JobModel[]>(`${environment.baseUrl}career-page/job/${this.subDomain}`).subscribe(r => {
      console.log(r);
      this.jobs = r;
    });
    this.http.get<JobModel[]>(`${environment.baseUrl}career-page/job/details/1/${this.subDomain}`).subscribe(r => {
      console.warn(r);
      this.jobs = r;
    });
  }
}
