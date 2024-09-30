import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-list-admin',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.css'
})
export class ListAdminComponent {
  users: any;
  private _user: any;
  notification: any;
  private _id: any;

  editUser(user: any) {
    this._user = user;

  }

  toggleUserStatus(user: any) {
    this._user = user;

  }

  deleteUser(id: any) {
    this._id = id;

  }
}
