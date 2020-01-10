import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-feature',
  templateUrl: './main-feature.component.html',
  styleUrls: ['./main-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFeatureComponent implements OnInit {

  constructor() { }

  @Input() fileName: string;
  @Input() svgName: string;
  @Input() title: string;
  @Input() content: string;

  ngOnInit() {

  }

}
