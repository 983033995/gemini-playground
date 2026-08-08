import * as THREE from "three";
export function createPaperShape({ points, depth=.16, material, bevel=.035 }) {
  const shape=new THREE.Shape();
  points.forEach(([x,y],i)=>i===0?shape.moveTo(x,y):shape.lineTo(x,y));
  shape.closePath();
  const geo=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:16});
  geo.center();
  const mesh=new THREE.Mesh(geo,material); mesh.castShadow=true; mesh.receiveShadow=true; return mesh;
}
export function irregularHillPoints({width=8,height=2,steps=10,wobble=.3,seed=1}){
  const pts=[[-width/2,-height/2]];
  for(let i=0;i<=steps;i++){const t=i/steps;const x=-width/2+width*t;const y=height/2+Math.sin((t*2.1+seed)*Math.PI)*wobble+Math.sin((t*5.2+seed*.7)*Math.PI)*wobble*.32;pts.push([x,y]);}
  pts.push([width/2,-height/2]); return pts;
}
