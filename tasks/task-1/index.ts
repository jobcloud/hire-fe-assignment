// jobs.service.ts
@Injectable({ providedIn: 'root' })
export class JobsService {
  private readonly http = inject(HttpClient);

  readonly jobs$ = this.getJobs();

  private getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('/jobs');
  }
}

// jobs.component.ts
@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
  template: `
    <h1>
      Jobs
      <ng-container *ngIf="jobs$ | async as jobs">
        ({{ jobs.length }})
      </ng-container>
    </h1>

    <ul>
      <li *ngFor="let job of jobs$ | async">
        {{ job.title }}
      </li>
    </ul>
  `
})
export class JobsComponent {
  private readonly jobsService = inject(JobsService);

  readonly jobs$ = this.jobsService.jobs$;
}
