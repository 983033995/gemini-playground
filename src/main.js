import * as THREE from "three";
import "./style.css";
import { CameraRig } from "./world/CameraRig.js";
import { Interaction } from "./world/Interaction.js";
import { createSceneCluster, themes } from "./world/createSceneCluster.js";

const canvas=document.querySelector('#scene');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.setSize(innerWidth,innerHeight,false);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
const scene=new THREE.Scene();scene.background=new THREE.Color(0xe9d9c8);scene.fog=new THREE.FogExp2(0xe9d9c8,.017);
const camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,120);const rig=new CameraRig(camera);scene.add(rig.group);
const hemi=new THREE.HemisphereLight(0xfff2dd,0x3d544d,2.0);scene.add(hemi);const sunLight=new THREE.DirectionalLight(0xffddb8,4.1);sunLight.position.set(-6,12,8);sunLight.castShadow=true;sunLight.shadow.mapSize.set(2048,2048);sunLight.shadow.camera.left=-18;sunLight.shadow.camera.right=18;sunLight.shadow.camera.top=18;sunLight.shadow.camera.bottom=-18;scene.add(sunLight);const fill=new THREE.DirectionalLight(0xa7c8d0,1.25);fill.position.set(10,3,-10);scene.add(fill);
const origins=[new THREE.Vector3(0,0,0),new THREE.Vector3(14.7,.04,-.18),new THREE.Vector3(29.2,-.04,.23),new THREE.Vector3(43.8,0,-.14)];const clusters=origins.map((o,i)=>{const c=createSceneCluster({index:i,origin:o,theme:themes[i]});scene.add(c);return c});
const interaction=new Interaction({camera,canvas,interactiveMeshes:clusters.flatMap(c=>c.userData.interactive)});
const clock=new THREE.Clock();
const story=[
 {badge:'SAN FRANCISCO · CALIFORNIA',title:'雾里的第一站',copy:'米娅背上小相机，从红色大桥和叮叮当当的缆车开始她的美国旅行。',chips:['Golden Gate','Cable Car','Camera'],bg:0xe9d9c8,fog:0xe9d9c8,hemi:0xfff0dd},
 {badge:'ROUTE 66 · SOUTHWEST',title:'公路风吹过红色峡谷',copy:'换上牛仔帽，沿着 66 号公路向西。路牌、仙人掌和橘红山谷一层层从镜头前掠过。',chips:['Route 66','Canyon','Road Trip'],bg:0xe6c4a6,fog:0xe6c4a6,hemi:0xffe0bd},
 {badge:'NEW YORK · NEW YORK',title:'在纽约追一场黄色出租车',copy:'高楼像一叠叠竖起来的纸片。米娅在自由女神和黄色出租车之间收集新的旅行贴纸。',chips:['Skyline','Liberty','Yellow Taxi'],bg:0x8da3aa,fog:0x8da3aa,hemi:0xd7d9d0},
 {badge:'HAWAII · PACIFIC',title:'把最后一页留给海风',copy:'棕榈叶轻轻摇，冲浪板靠在沙滩边。旅行没有结束，只是这一本小小护照先盖满了印章。',chips:['Ocean','Palm','Aloha'],bg:0xc9ddd2,fog:0xc9ddd2,hemi:0xffead2}
];
const sceneBadge=document.querySelector('#sceneBadge'),sceneTitle=document.querySelector('#sceneTitle'),sceneCopy=document.querySelector('#sceneCopy'),sceneChips=document.querySelector('#sceneChips'),progressText=document.querySelector('#progressText'),passportProgress=document.querySelector('#passportProgress'),nav=[...document.querySelectorAll('.scene-nav__item')],stops=[...document.querySelectorAll('.passport__stop')],loader=document.querySelector('#loader'),cursor=document.querySelector('#cursorSticker');
const getIndex=p=>p<.245?0:p<.515?1:p<.785?2:3;let active=-1;let bgColor=new THREE.Color(story[0].bg),fogColor=new THREE.Color(story[0].fog),hemiColor=new THREE.Color(story[0].hemi);
function updateUI(){const p=rig.progress,i=getIndex(p),item=story[i];progressText.textContent=`${Math.round(p*100)}%`;document.querySelector('.passport__route').style.setProperty('--p',p.toFixed(4));passportProgress.style.width=`calc((100% - 16px) * ${p})`;
 if(i!==active){active=i;sceneBadge.textContent=item.badge;sceneTitle.textContent=item.title;sceneCopy.textContent=item.copy;sceneChips.replaceChildren(...item.chips.map(t=>{const s=document.createElement('span');s.textContent=t;return s}));nav.forEach((n,j)=>n.classList.toggle('is-active',j===i));stops.forEach((n,j)=>n.classList.toggle('is-active',j===i));}
 const local=(p-[0,.245,.515,.785][i])/([.245,.515,.785,1][i]-[0,.245,.515,.785][i]);const next=story[Math.min(i+1,3)];bgColor.set(item.bg).lerp(new THREE.Color(next.bg),Math.max(0,Math.min(1,local*.72)));fogColor.copy(bgColor);hemiColor.set(item.hemi).lerp(new THREE.Color(next.hemi),Math.max(0,Math.min(1,local*.72)));scene.background.copy(bgColor);scene.fog.color.copy(fogColor);hemi.color.copy(hemiColor);
}
function animateWorld(t,delta){clusters.forEach((c,i)=>{const u=c.userData;u.hero.position.y=u.hero.userData.baseY+Math.sin(t*2.15+i*.8)*.045;u.hero.rotation.z=Math.sin(t*1.25+i)*.013;u.clouds.forEach(cl=>cl.position.y=cl.userData.baseY+Math.sin(t*.42+cl.userData.phase)*.07);u.airplane.position.x=u.airplane.userData.base.x+Math.sin(t*.32+i)*.7;u.airplane.position.y=u.airplane.userData.base.y+Math.sin(t*.58+i)*.06;
 const movers=u.landmark.userData.movers||[];movers.forEach((m,k)=>{if(m.userData.base){m.position.x=m.userData.base.x+Math.sin(t*(.7+k*.12)+i)*.045;m.position.y=m.userData.base.y+Math.sin(t*.8+i+k)*.025}else if(m.userData.baseRotation!==undefined){m.rotation.z=m.userData.baseRotation+Math.sin(t*.9+i)*.025}else{m.rotation.z=Math.sin(t*.7+i+k)*.012}});
 });interaction.update(delta);}
window.addEventListener('pointermove',e=>{const x=e.clientX/innerWidth*2-1,y=e.clientY/innerHeight*2-1;rig.setMouse(x,y);interaction.setPointer(e.clientX,e.clientY);cursor.style.left=`${e.clientX+18}px`;cursor.style.top=`${e.clientY+18}px`;});
window.addEventListener('wheel',e=>{e.preventDefault();const d=Math.sign(e.deltaY)*Math.min(Math.abs(e.deltaY),120);rig.addDelta(d*.00052)},{passive:false});let dragging=false,lastY=0;canvas.addEventListener('pointerdown',e=>{dragging=true;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!dragging)return;const d=lastY-e.clientY;lastY=e.clientY;rig.addDelta(d*.00175)});canvas.addEventListener('pointerup',e=>{dragging=false;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId)});
[...nav,...stops].forEach(b=>b.addEventListener('click',()=>rig.goTo(Number(b.dataset.progress))));window.addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','PageDown'].includes(e.key))rig.addDelta(.08);if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key))rig.addDelta(-.08)});
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio,1.75))}window.addEventListener('resize',resize);
function tick(){const d=Math.min(clock.getDelta(),1/24),t=clock.elapsedTime;rig.update(d);animateWorld(t,d);updateUI();renderer.render(scene,camera);requestAnimationFrame(tick)}updateUI();tick();setTimeout(()=>loader.classList.add('is-hidden'),1250);
