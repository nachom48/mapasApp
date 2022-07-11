import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #mapa{
    height:100%;
    width:100%;
  }`
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('fullscreen');

    var map =  new mapboxgl.Map({
      container:'mapa',
      style:'mapbox://styles/mapbox/streets-v11',
      center:[-64.24432210752248, -31.37806271373772],
      zoom: 17
    })
  }

}
