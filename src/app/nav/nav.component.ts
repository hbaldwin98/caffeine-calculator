import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  @Output() tabEvent = new EventEmitter<string>();
  @ViewChild(TabsetComponent, { static: true }) tabSet!: TabsetComponent;

  constructor() {}

  ngOnInit(): void {
    this.tabSet.tabs[1].active = true;
  }

  onSelect(event: TabDirective): void {
    this.tabEvent.emit(event.id);
  }
}
