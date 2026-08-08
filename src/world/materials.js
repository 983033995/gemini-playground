import * as THREE from "three";
export const palette={cream:0xfff6e6,cream2:0xf0dfc7,ink:0x3c3a35,coral:0xed7a70,yellow:0xf3c568,sky:0x8fb7c8,mint:0x8bae94,green:0x617d68,blue:0x58798a,red:0xd85d55,pink:0xe6a5a2,brown:0x9a7459,night:0x273d4d,white:0xfffaf0};
const loader=new THREE.TextureLoader();
export const paperFiber=loader.load('/assets/paper-fiber.svg',t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2.5,2.5);t.colorSpace=THREE.SRGBColorSpace;});
export function paperMaterial(color,opts={}){return new THREE.MeshStandardMaterial({color,map:paperFiber,roughness:.97,metalness:0,side:THREE.DoubleSide,...opts});}
export function cutoutMaterial(url,opts={}){const t=loader.load(url);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshStandardMaterial({map:t,transparent:true,alphaTest:.12,roughness:.95,metalness:0,side:THREE.DoubleSide,...opts});}
