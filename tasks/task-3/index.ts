@Component({
  selector: 'jc-search-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: '<input type="text" [formControl]="queryControl" />',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  readonly destroy$ = new Subject<void>();
  readonly queryControl = new FormControl('', { nonNullable: true });

  @Input() set query(query: string) {
    this.queryControl.setValue(query);
  }

  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.queryControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe((query) => this.search.emit(query));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
