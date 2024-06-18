import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  standalone: true,
})
export class NotFoundComponent {
  public back(): void {
    history.back();
  }
}
