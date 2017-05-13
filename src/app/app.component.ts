import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Location } from './location';
import { LOCATIONS } from './locations';
import { MAP_STYLES } from "./map-styles";
import { AgmMap, AgmMarker, MapTypeStyle } from "@agm/core";

interface LatLng {
  latitude: number;
  longitude: number;
}

const ISLINGTON: LatLng = { latitude: 51.5470193, longitude: -0.1444663 };

function rad(x:number) {
  return x * Math.PI / 180;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private loaded = false;

  public locationIndex: number = 0;
  public currentImage: string;

  public title = 'Campaign Tracker';
  public locations: Location[] = LOCATIONS;
  public styles: MapTypeStyle[] = MAP_STYLES;

  public get currentLocation(): Location {
    return this.locations[this.locationIndex];
  }

  public get distanceFromIslington(): number {
      var p: LatLng = { latitude: this.currentLocation.lat, longitude: this.currentLocation.lng };
      return this.getDistance(ISLINGTON, p);
  }
  
  @ViewChild("map")
  public map: AgmMap;

  ngOnInit(): void {  }
 
  ngAfterViewInit() : void {
    
  }

  public onLocationClick(data: Location) {
    this.locationIndex = this.locations.indexOf(data);
  }

  public previous(): void {
      let newIndex = this.locationIndex - 1;

      if (newIndex < 0)
        return;

      this.locationIndex = newIndex;
  }

  public next(): void {
      let newIndex = this.locationIndex + 1;

      if (newIndex > this.locations.length - 1)
        return;

      this.locationIndex = newIndex;
  }

  public nextImage(): void {
    if (!this.currentImage || !this.currentLocation || !this.currentLocation.images || this.currentLocation.images.length == 0)
      return;

    var index = this.currentLocation.images.indexOf(this.currentImage);

    if (index == -1)
      return;

    var newIndex = index + 1;

    if (newIndex > this.currentLocation.images.length - 1)
      newIndex = 0;

    this.currentImage = this.currentLocation.images[newIndex];
  }

  public previousImage(): void {
    if (!this.currentImage || !this.currentLocation || !this.currentLocation.images || this.currentLocation.images.length == 0)
      return;

    var index = this.currentLocation.images.indexOf(this.currentImage);

    if (index == -1)
      return;

    var newIndex = index - 1;

    if (newIndex < 0)
      newIndex = this.currentLocation.images.length - 1;

    this.currentImage = this.currentLocation.images[newIndex];
  }

  private getDistance(p1: LatLng, p2: LatLng) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.latitude - p1.latitude);
      var dLong = rad(p2.longitude - p1.longitude);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d * 0.000621371192;
  }
}
