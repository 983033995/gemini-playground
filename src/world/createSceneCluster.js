import * as THREE from "three";
import { createPaperShape, irregularHillPoints } from "./createPaperShape.js";
import { palette, paperMaterial, cutoutMaterial } from "./materials.js";

function cutout(url,w,h,pos,scale=1){
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),cutoutMaterial(url));
  mesh.position.copy(pos);mesh.scale.setScalar(scale);mesh.castShadow=true;mesh.receiveShadow=true;return mesh;
}
function cloud(x,y,z,s=1){
  const g=new THREE.Group();const mat=paperMaterial(palette.white,{transparent:true,opacity:.88});
  [[-.7,0,.5],[-.2,.2,.63],[.42,.04,.51],[.8,-.05,.34]].forEach(([px,py,r])=>{const m=new THREE.Mesh(new THREE.CircleGeometry(r,28),mat);m.position.set(px,py,0);g.add(m)});
  g.position.set(x,y,z);g.scale.setScalar(s);g.userData.baseY=y;g.userData.phase=x*.27;return g;
}
function paperArch(color,r,z,y=1.15){
  const shape=new THREE.Shape();shape.absarc(0,0,r,0,Math.PI,false);shape.lineTo(-r,-.55);shape.lineTo(-r-.48,-.55);shape.absarc(0,0,r+.48,Math.PI,0,true);shape.lineTo(r,-.55);
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.13,bevelEnabled:false,curveSegments:56}),paperMaterial(color));m.position.set(0,y,z);m.rotation.y=Math.PI;m.castShadow=true;return m;
}
function paperPostcard(title,subtitle,stamp,color){
  const c=document.createElement('canvas');c.width=1024;c.height=690;const x=c.getContext('2d');x.fillStyle='#fff6e6';x.fillRect(0,0,1024,690);
  for(let i=0;i<900;i++){x.fillStyle=`rgba(70,55,40,${(i%9)*.003})`;x.fillRect((i*83)%1024,(i*137)%690,(i%5)+1,1)}
  x.strokeStyle=color;x.lineWidth=16;x.strokeRect(42,42,940,606);x.fillStyle=color;x.font='900 31px system-ui';x.fillText('MIA’S TINY TRAVEL BOOK',92,126);x.fillStyle='#3c3a35';x.font='68px Georgia';x.fillText(title,92,264);x.font='30px system-ui';x.globalAlpha=.68;x.fillText(subtitle,92,338);x.globalAlpha=1;
  x.beginPath();x.arc(838,178,86,0,Math.PI*2);x.lineWidth=8;x.strokeStyle=color;x.stroke();x.font='900 29px system-ui';x.fillStyle=color;x.textAlign='center';x.fillText(stamp,838,170);x.font='900 19px system-ui';x.fillText('VISITED',838,203);x.textAlign='left';
  x.fillStyle='#3c3a35';x.font='25px system-ui';x.globalAlpha=.55;x.fillText('favorite moment:',92,452);x.globalAlpha=1;x.font='38px Georgia';x.fillText('“keep going, little traveler.”',92,510);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.BoxGeometry(2.95,1.96,.08),new THREE.MeshStandardMaterial({map:t,roughness:.96}));m.castShadow=true;m.userData.interactive=true;m.userData.hover=0;return m;
}
function makeForegroundFlowers(group,color,index){
  for(let i=0;i<9;i++){const f=cutout('/assets/flower.svg',.55,.55,new THREE.Vector3(-4.7+((i*1.17+index*.4)%9.5),-.08,1.4+((i*.37)%1.1)),.55+(i%3)*.1);f.material=f.material.clone();f.material.color.setHex(color);f.rotation.z=(i%2?1:-1)*.12;group.add(f)}
}
function landmarkFor(index){
  if(index===0){const g=new THREE.Group();const bridge=cutout('/assets/golden-gate.svg',5.4,3.0,new THREE.Vector3(.9,1.35,-.4),.9);const car=cutout('/assets/cable-car.svg',1.8,1.8,new THREE.Vector3(3.05,.65,.75),.7);car.userData.base=car.position.clone();g.add(bridge,car);g.userData.movers=[car];return g;}
  if(index===1){const g=new THREE.Group();const sign=cutout('/assets/route66.svg',2.2,2.7,new THREE.Vector3(2.4,1.7,.15),.85);const cactusA=cutout('/assets/cactus.svg',1.5,2.8,new THREE.Vector3(-3.35,1.1,-.2),.8);const cactusB=cutout('/assets/cactus.svg',1.15,2.2,new THREE.Vector3(3.75,.8,-1.1),.67);g.add(sign,cactusA,cactusB);g.userData.movers=[sign];return g;}
  if(index===2){const g=new THREE.Group();const skyline=cutout('/assets/nyc-skyline.svg',6.8,4.0,new THREE.Vector3(1.0,1.35,-.65),.93);const liberty=cutout('/assets/liberty.svg',1.7,3.3,new THREE.Vector3(-3.1,1.45,.05),.72);const taxi=cutout('/assets/taxi.svg',2.5,1.3,new THREE.Vector3(3.0,.25,.95),.72);taxi.userData.base=taxi.position.clone();g.add(skyline,liberty,taxi);g.userData.movers=[taxi];return g;}
  const g=new THREE.Group();const palm=cutout('/assets/palm.svg',3.1,4.6,new THREE.Vector3(2.85,1.45,-.25),.88);const board=cutout('/assets/surfboard.svg',.85,2.5,new THREE.Vector3(-2.8,1.05,.75),.72);board.rotation.z=-.17;board.userData.baseRotation=board.rotation.z;g.add(palm,board);g.userData.movers=[palm,board];return g;
}
export function createSceneCluster({index,origin,theme}){
  const group=new THREE.Group();group.position.copy(origin);group.name=`USA-Chapter-${index+1}`;
  group.add(paperArch(theme.arch1,5.65,-5.0,1.0),paperArch(theme.arch2,5.15,-4.35,.95));
  const back=createPaperShape({points:irregularHillPoints({width:11.4,height:3.5,steps:13,wobble:.46,seed:.7+index}),depth:.18,material:paperMaterial(theme.back)});back.position.set(.25,.52,-3.25);group.add(back);
  const mid=createPaperShape({points:irregularHillPoints({width:11.7,height:2.55,steps:13,wobble:.29,seed:1.4+index}),depth:.22,material:paperMaterial(theme.mid)});mid.position.set(-.35,-.03,-1.45);group.add(mid);
  const front=createPaperShape({points:irregularHillPoints({width:12.8,height:1.8,steps:12,wobble:.2,seed:2.3+index}),depth:.3,material:paperMaterial(theme.front)});front.position.set(0,-.48,1.5);group.add(front);
  const sun=new THREE.Mesh(new THREE.CircleGeometry(index===2?.68:1.0,56),paperMaterial(theme.sun,{emissive:theme.sun,emissiveIntensity:.07}));sun.position.set(3.0-index*.3,4.0,-4.45);group.add(sun);
  const clouds=index===2?[]:[cloud(-3.2,4.1,-3.6,.86),cloud(1.9,3.5,-3.0,.6)];clouds.forEach(c=>group.add(c));
  const hero=cutout(`/assets/${theme.girl}`,2.7,3.72,new THREE.Vector3(-.55,1.0,.88),.88);hero.userData.baseY=hero.position.y;group.add(hero);
  const landmark=landmarkFor(index);group.add(landmark);
  const card=paperPostcard(theme.cardTitle,theme.cardSub,theme.stamp,theme.css);card.position.set(-3.05,2.15,.5);card.rotation.set(-.045,.17,-.055);card.userData.basePosition=card.position.clone();card.userData.baseRotationZ=card.rotation.z;group.add(card);
  const airplane=cutout('/assets/airplane.svg',1.8,.82,new THREE.Vector3(-3.6,4.45,-2.4),.68);airplane.userData.base=airplane.position.clone();group.add(airplane);
  makeForegroundFlowers(group,theme.flower,index);
  group.userData={index,hero,clouds,airplane,landmark,interactive:[card]};return group;
}
export const themes=[
 {girl:'girl-sf.svg',cardTitle:'San Francisco',cardSub:'fog · bridge · cable car',stamp:'SF',css:'#df665d',arch1:0xf1dfca,arch2:0xd9d6c1,back:0x8eb2bc,mid:0x83a37f,front:0x5d7864,sun:0xf2bf69,flower:0xed7a70},
 {girl:'girl-route66.svg',cardTitle:'Route 66',cardSub:'road · canyon · warm wind',stamp:'66',css:'#c66c58',arch1:0xf0d2ae,arch2:0xdbb77e,back:0xc98263,mid:0xb96f57,front:0x8a5c48,sun:0xf0b65d,flower:0xf2c46b},
 {girl:'girl-nyc.svg',cardTitle:'New York City',cardSub:'skyline · taxi · bright night',stamp:'NYC',css:'#54758a',arch1:0x354d5e,arch2:0x29404e,back:0x5f7d8c,mid:0x415e6b,front:0x304c52,sun:0xf2d486,flower:0xe5a2a0},
 {girl:'girl-hawaii.svg',cardTitle:'Hawaii',cardSub:'ocean · palm · final postcard',stamp:'HI',css:'#4e8f86',arch1:0xf2dcc1,arch2:0xbad4c7,back:0x76aebb,mid:0x70a78d,front:0x547c66,sun:0xf3b968,flower:0xed7a70}
];
