import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-history-page',
  standalone: true,
  templateUrl: './history-page.component.html',
  imports: [HeaderComponent],
})
export class HistoryPageComponent {}
