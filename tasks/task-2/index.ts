@Component({
  selector: 'jc-user-list',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <h1>Users</h1>

    <section>
      <article
        *ngFor="let user of users"
        [class.selected]="user === getSelectedUser()"
        (click)="selectUser.emit(user.id)"
      >
        <h3>{{ getFullName(user.firstName, user.lastName) }}</h3>
	      <p>{{ user.email }}</p>
      </article>

      <p *ngIf="getSelectedUser()">
        Selected User Name:
        {{ getFullName(getSelectedUser().firstName, getSelectedUser().lastName) }}
      </p>
    </section>
  `,
})
export class UserListComponent {
  @Input() users: any[];
  @Input() selectedUserId: number | null;
  @Output() selectUser = new EventEmitter();

  getFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }

  getSelectedUser() {
    return this.selectedUserId
      ? this.users.find((user) => user.id === this.selectedUserId)
      : null;
  }
}
