import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapa-container{
    height:100%;
    width:100%;

  }
  .row{
    background-color:white;
    bottom:50px;
    position:fixed;
    left:50px;
    padding:10px;
    border-radius:5px;
    z-index:99999999;
    width:400px;
  }
  .botones{
    display:flex;
  justify-content:space-between;  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy {
  @ViewChild('mapa') divMapa!:ElementRef;
  //el ViewChild sirve para tomar un elemento HTML y tomarlo como una propiedad comun y corriente
  mapa1! : mapboxgl.Map;
  zoomLevel:number=10;
  center:[number,number]=[-64.24432210752248, -31.37806271373772]
  constructor() {
    console.log('constructor',this.divMapa)

  }
  ngOnDestroy(): void {
  this.mapa1.off('zoom',()=>{})
  this.mapa1.off('move',()=>{})
  this.mapa1.off('zoomend',()=>{})


}

  ngAfterViewInit(): void {


    this.mapa1 =  new mapboxgl.Map({
      container:this.divMapa.nativeElement,
      style:'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom: 17

    })
    this.mapa1.on('zoom',(ev)=>this.zoomLevel=this.mapa1.getZoom()

    )
    //para poner el maximo valor del zoom
    this.mapa1.on('zoomend',(ev)=>{
      if (this.mapa1.getZoom()>18){
        this.mapa1.zoomTo(18)}
      }
    )
    this.mapa1.on('move',(ev)=>{
      const target=ev.target;
      const {lng,lat}=target.getCenter();
      this.center=[lng,lat];
      }
    )
  }

    zoomIn(){
      this.mapa1.zoomIn();
      this.zoomLevel=this.mapa1.getZoom()
    }
    zoomOut(){
        this.mapa1.zoomOut();
        this.zoomLevel=this.mapa1.getZoom()


    }
    zoomCambio(valor:string){
      this.mapa1.zoomTo(Number(valor))
    }
}
//La regla de oro es que cuando tengamos algun On o event listener hay que destruirlo cuando el componente
//se destruya e implementar el on Destroy
