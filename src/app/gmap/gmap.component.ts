import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { AppService } from '../app.service';

interface marker {
  lat: number;
  lng: number;
  label?: string;
  address: string;
  draggable: boolean;
}

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements OnInit, OnChanges {
  @Input() mapData;
  constructor(private appService: AppService) { }
  public zoom = 12;

  public lat = 26.8467;
  public lng = 80.9462;

  markers: marker[];

  ngOnChanges() {
    this.markers = this.mapData;
  }

  clickedMarker(markerData: object, index: number) {
    console.log(`clicked the marker: ${markerData || index}`);
    this.appService.setMapData(markerData);
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngOnInit() { }

}



