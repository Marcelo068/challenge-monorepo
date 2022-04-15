import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  @Input() id!: any
  @Input() index!: number
  @Input() itemToDisplay!: number
  @Input() excluir!: Function

  path = this.router.url.split('/')

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  editar() {
    this.router.navigate([`produtos/editar/${this.id}`])
  }
}
