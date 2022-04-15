import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  confirm = new Subject<boolean>();

  constructor() { }

  showSuccessNotification(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: true,
    }).then((result) => {
      this.confirm.next(result.value)
    })
    return this.confirm.asObservable()
  }

  showErrorNotification(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: true,
    }).then((result) => {
      this.confirm.next(result.value)
    })
    return this.confirm.asObservable()
  }

}
