// songs.actions.ts
export const songsActions = createActionGroup({
  source: 'Songs',
  events: {
    'Load Songs': emptyProps(),
    'Load Songs Success': props<{ songs: Song[] }>(),
    'Load Songs Error': props<{ errorMsg: string }>(),
  },
});

// songs.component.ts
@Component(/* ... */)
export class SongsComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.select(selectSongs).pipe(
      tap((songs) => {
        // if songs are not loaded
        if (!songs) {
          // then dispatch `loadSongs` action
          this.store.dispatch(songsActions.loadSongs());
        }
      }),
      take(1)
    ).subscribe();
  }
}

// songs.effects.ts
@Injectable()
export class SongsEffects {
  private readonly actions$ = inject(Actions);
  private readonly songsService = inject(SongsService);

  readonly loadSongs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songsActions.loadSongs),
      exhaustMap(() => {
        return this.songsService.getAll().pipe(
          map((songs) => songsActions.loadSongsSuccess({ songs })),
          catchError((error: HttpErrorResponse) =>
            of(songsActions.loadSongsError({ errorMsg: error.message }))
          )
        );
      })
    );
  });
}
