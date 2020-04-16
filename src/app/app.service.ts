import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  relianceStoreData = [
    {
      label: 'RS',
      name: 'Reliance Digital Store',
      address: 'Gomti Nagar, Lucknow',
      contactNumber: '9415789087',
      openingHours: '10:00 - 17:00',
      lat: 26.8496,
      lng: 81.0072,
      downloadSales: 350,
      InStoreSales: 1030,
      mailStoreSales: 389,
      draggable: false
    },
    {
      label: 'RM',
      name: 'Reliance Digital Xpress Mini',
      address: 'Sharda Nagar, Lucknow',
      contactNumber: '9125044798',
      openingHours: '9:30 -19:30',
      lat: 26.7804,
      lng: 80.9290,
      downloadSales: 890,
      InStoreSales: 1223,
      mailStoreSales: 467,
      draggable: false
    },
    {
      label: 'JD',
      name: 'Jio Digital Store',
      address: 'Bada ChandGanj, Lucknow ',
      contactNumber: '9078987689',
      openingHours: '9:00 - 19:00',
      lat: 26.8784,
      lng: 80.9470,
      downloadSales: 567,
      InStoreSales: 5767,
      mailStoreSales: 462,
      draggable: false
    },
    {
      label: 'RX',
      name: 'Reliance DX-Mini Store',
      address: 'Bangla Bazar, Lucknow',
      contactNumber: '9878979643',
      openingHours: '8:30 - 18:00',
      lat: 26.7954,
      lng: 80.9277,
      downloadSales: 222,
      InStoreSales: 8776,
      mailStoreSales: 685,
      draggable: false
    },
    {
      label: 'RD',
      name: 'Reliance Digital',
      address: 'Munsi Puliya, Lucknow',
      contactNumber: '9579879689',
      openingHours: '8:00 - 17:00',
      lat: 26.8845,
      lng: 80.9947,
      downloadSales: 426,
      InStoreSales: 372,
      mailStoreSales: 374,
      draggable: false
    }
  ];
  public apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  private mapData = new BehaviorSubject<{}>({});

  getMapData() {
    return this.mapData.asObservable();
  }

  setMapData(data) {
    this.mapData.next(data);
  }

  getRelianceStoreData() {
    return this.http.get(`${this.apiUrl}/users/storeData`);
  }
}
