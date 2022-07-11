import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color:string;
  marker?:mapboxgl.Marker;
  center?:[number,number]
}

  @Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    height:100%;
    width:100%;

  }
  .list-group{
    position:fixed;
    top:20px;
    right:20px;
    z-index:999999999;

  }
  li{
    cursor:pointer;
  }`
  ]
})
export class MarcadoresComponent implements AfterViewInit {

    @ViewChild('mapa') divMapa!:ElementRef;
    //el ViewChild sirve para tomar un elemento HTML y tomarlo como una propiedad comun y corriente
    mapa1! : mapboxgl.Map;
    zoomLevel:number=10;
    center:[number,number]=[-64.24432210752248, -31.37806271373772]
    //esto es para agregar marcadores personalizados
    // const markerHtml : HTMLElement = document.createElement('div');
    marcadores:MarcadorColor[]=[];
  constructor() { }

  ngAfterViewInit(): void {

    this.mapa1 =  new mapboxgl.Map({
      container:this.divMapa.nativeElement,
      style:'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom: 17
  })
  this.leerLocalStorage();
  }
  agregarMarcador(){
    const color = `#${crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, '0').slice(-6)}`
    if(this.marcadores.length<10){
    const nuevoMarcador= new mapboxgl.Marker(
      {
       draggable:true,
       color
      }
    )
      .setLngLat(this.center)
      .addTo(this.mapa1)

      this.marcadores.push({
        color,
        marker:nuevoMarcador
      })
      nuevoMarcador.on('dragend',()=>
      this.guardarMarcadoresLocalStorage())};
      this.guardarMarcadoresLocalStorage()


  }
  irMarcador(marcador:MarcadorColor){
    this.mapa1.flyTo({
      center:marcador.marker!.getLngLat()
    })
  }


  guardarMarcadoresLocalStorage(){
    const lngLatArr:MarcadorColor[]=[]

    this.marcadores.forEach(m=>{
      const color=m.color;
      const {lng,lat}=m.marker!.getLngLat();
      lngLatArr.push({
        color:m.color,
        center:[ lng,lat ]
      })
      localStorage.setItem('marcadores',JSON.stringify(lngLatArr)
    )})
    //solo puedo guardar Strings
    }

    leerLocalStorage(){
      if(!localStorage.getItem('marcadores')){
        return ;
      }
      const lngLatArr:MarcadorColor[]=JSON.parse(localStorage.getItem('marcadores')!)
      lngLatArr.forEach(m=>{
        const newMarker=new mapboxgl.Marker({
          color:m.color,
          draggable:true
        })
        .setLngLat(m.center!)
        .addTo(this.mapa1)
        this.marcadores.push({
          marker:newMarker,
          color:m.color
        })
        //cuado termina de mover actualiza la posicion de los marcadores
        //en el local sotrage
        newMarker.on('dragend',()=>
        this.guardarMarcadoresLocalStorage())
      })
    }

    borrarMarcador(i:number){
      //asi lo borro del MAPA
      this.marcadores[i].marker?.remove()
      //para borrarlo de mi arreglo de marcadores
      this.marcadores.splice(i,1);
      this.guardarMarcadoresLocalStorage();
    }



//Para crear un marcador


//esto es para hardcodearlo
// const marker=new mapboxgl.Marker({
//   // element:this.markerHtml
// })
//   .setLngLat(this.center)
//   .addTo(this.mapa1)
// }

}
