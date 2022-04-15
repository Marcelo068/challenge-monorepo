import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit {

  @Input() form: any

  constructor() { }

  ngOnInit(): void {
  }

}
