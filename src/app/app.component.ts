import { Component } from '@angular/core';
import { Location } from './location';
import { LOCATIONS } from './locations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Campaign Tracker';
  lat: number = 51.540597;
  lng: number = -0.1090267;
  locations: Location[] = [];
  ngOnInit() : void {
    this.locations = LOCATIONS;
  }
}
