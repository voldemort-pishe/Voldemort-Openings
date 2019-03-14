import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompanyInfoModel } from '../models/company-info.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit, OnChanges {

  @Input() subDomain: string;
  model: CompanyInfoModel;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.http.get<CompanyInfoModel>(`${environment.baseUrl}career-page/company/${this.subDomain}`).subscribe(r => {
      this.model = r;
    });
  }

}
