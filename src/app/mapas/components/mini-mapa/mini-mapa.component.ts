import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [`
  div{
    width:100%;
    height:150px;
    margin:0px;

  }`
  ]
})
export class MiniMapaComponent implements AfterViewInit {
@Input() lngLat:[number,number]=[0,0];
@ViewChild('mapa') divMapa!:ElementRef
//no hace falta iniciarlizarla en 0 xq siempre la voy ar ecibir luego q se cree el componente
  constructor() { }

  ngAfterViewInit(): void {
    var map =  new mapboxgl.Map({
      container:this.divMapa.nativeElement,
      style:'mapbox://styles/mapbox/streets-v11',
      center:this.lngLat,
      zoom: 20,
      interactive:false
    })

  new mapboxgl.Marker()
    .addTo(map)
    .setLngLat(this.lngLat);

  }
}
