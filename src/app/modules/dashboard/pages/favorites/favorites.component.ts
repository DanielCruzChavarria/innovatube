import { Component, OnInit, OnDestroy } from '@angular/core';
import { remult } from 'remult';
import { Favorite } from '../../models/Favorite.model';
import { Subscription } from 'rxjs';
import { VideoTableComponent } from '../../components/video/video-table/video-table.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [VideoTableComponent],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public favorites: Favorite[] = [];
  public favoritesRepo = remult.repo(Favorite);

  public newFavorite: Favorite = new Favorite();
  private subscriber: Subscription = new Subscription();
  remult = remult;

  ngOnInit(): void {
    this.setupLiveQuery();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  private setupLiveQuery(): void {
    const liveQuerySubscription = this.favoritesRepo
      .liveQuery({
        where: { userID: this.remult.user?.id },
      })
      .subscribe((changes) => {
        this.favorites = changes.applyChanges(this.favorites);
      });
    this.subscriber.add(liveQuerySubscription);
  }
}
