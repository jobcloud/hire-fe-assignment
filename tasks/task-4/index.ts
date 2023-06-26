@Component({
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  template: `
    <h1>Books</h1>

    <input type="text" placeholder="Search..." [formControl]="queryControl" />

    <div *ngFor="let book of books">
      <p><strong>Title:</strong> {{ book.title }}</p>
      <p><strong>Description:</strong> {{ book.description }}</p>
    </div>
  `,
})
export class BooksComponent implements OnInit {
  private http = inject(HttpClient);

  queryControl = new FormControl('');
  books: Book[] = [];

  ngOnInit(): void {
    this.http.get<Book[]>('/books').subscribe((books) => {
      this.books = books;
    });

    this.queryControl.valueChanges.subscribe((query) => {
      this.http
        .get<Book[]>('/books', { params: { query } })
        .subscribe((books) => {
          this.books = books;
        });
    });
  }
}
