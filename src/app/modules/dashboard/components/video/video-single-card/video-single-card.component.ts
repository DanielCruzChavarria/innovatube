import {
  Component,
  Input,
  OnInit,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Video } from '../../../interfaces/video.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { remult } from 'remult';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { VideoModalComponent } from '../video-modal/video-modal.component';
import { FavoritesService } from '../../../services/favorites/favorites.service';

@Component({
  selector: '[video-single-card]',
  templateUrl: './video-single-card.component.html',
  styleUrls: ['./video-single-card.component.scss'],
  standalone: true,
  imports: [NgStyle, NgClass, NgIf, AngularSvgIconModule],
})
export class VideoSingleCardComponent implements OnInit {
  @Input() video: Video = <Video>{};
  sanitizedEmbedHtml: SafeHtml | undefined;

  constructor(
    private router: Router,
    private _favoritesService: FavoritesService,
    private sanitizer: DomSanitizer,
    private injector: Injector,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    if (this.video && this.video.player && this.video.player.embedHtml) {
      const embedHtmlWithAllow = this.video.player.embedHtml.replace(
        '<iframe',
        '<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
      );
      this.sanitizedEmbedHtml =
        this.sanitizer.bypassSecurityTrustHtml(embedHtmlWithAllow);
    }
  }

  toggleFavorite() {
    if (!remult.authenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.video.isFavorite) {
      this._favoritesService.addFavorite(this.video);
      this.video.isFavorite = true;
    } else {
      this._favoritesService.saveFavorite(this.video);
      this.video.isFavorite = false;
    }
  }

  playVideo() {
    const factory = this.resolver.resolveComponentFactory(VideoModalComponent);
    const componentRef = factory.create(this.injector);

    componentRef.instance.sanitizedEmbedHtml = this.sanitizedEmbedHtml;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    domElem.id = 'videoModal';

    document.body.appendChild(domElem);
  }
}
