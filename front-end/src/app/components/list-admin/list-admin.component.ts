import {Component, OnInit} from '@angular/core';
import axios from 'axios';
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

interface UserProps {
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

@Component({
  selector: 'app-list-admin',
  standalone: true,
  templateUrl: './list-admin.component.html',
  imports: [
    CommonModule,
    NgForOf,
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  users: User[] = [];
  private _user: User | null = null;
  notification: { message: string; success: boolean } | null = null;
  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNjE0ZDIzNy0xOWQwLTQ5MGQtOTQ1Yi0yYzA4OTI4NzU2MmUiLCJlbWFpbCI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZF9hdCI6IjIwMjQtMTAtMDFUMTg6NTU6MjEuNjA0WiIsImlhdCI6MTcyNzg3NzU0NywiZXhwIjoxNzI5NjA1NTQ3fQ.yB1i4ri84tthFJDtIbw7rkXADknporZn581mIxIDVjA';
  editingUserId: string | null = null;

  constructor() {
  }

  async ngOnInit() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await axios.get('http://localhost:3000/users/list', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      this.users = response.data.map((user: { _id: string; props: UserProps }) => ({
        id: user._id,
        name: user.props.name,
        email: user.props.email,
        status: user.props.status,
      }));

      console.log('Usuários processados:', this.users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      this.notification = {message: 'Erro ao buscar usuários', success: false};
    }
  }

  editUser(user: User) {
    this.editingUserId = user.id;
  }

  async saveUser(user: User) {
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, user, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.notification = {message: 'Usuário atualizado com sucesso.', success: true};
      this.editingUserId = null;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      this.notification = {message: 'Erro ao atualizar usuário', success: false};
    }
  }

  async toggleUserStatus(user: User) {
    try {
      const updatedStatus = !user.status;
      await axios.put(`http://localhost:3000/users/${user.id}`, {status: updatedStatus}, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      user.status = updatedStatus;
      this.notification = {message: 'Status do usuário atualizado com sucesso.', success: true};
    } catch (error) {
      console.error('Erro ao atualizar o status do usuário:', error);
      this.notification = {message: 'Erro ao atualizar o status do usuário', success: false};
    }
  }

  async deleteUser(id: string) {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.users = this.users.filter(user => user.id !== id);
      this.notification = {message: 'Usuário excluído com sucesso.', success: true};
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      this.notification = {message: 'Erro ao excluir usuário', success: false};
    }
  }
}
