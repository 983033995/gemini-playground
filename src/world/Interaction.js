import * as THREE from "three";
export class Interaction{
  constructor({camera,canvas,interactiveMeshes}){this.camera=camera;this.canvas=canvas;this.meshes=interactiveMeshes;this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2(2,2);this.hovered=null;}
  setPointer(x,y){const r=this.canvas.getBoundingClientRect();this.pointer.x=((x-r.left)/r.width)*2-1;this.pointer.y=-((y-r.top)/r.height)*2+1;}
  update(delta){this.raycaster.setFromCamera(this.pointer,this.camera);const hit=this.raycaster.intersectObjects(this.meshes,false)[0]?.object??null;if(hit!==this.hovered){this.hovered=hit;this.canvas.style.cursor=hit?'pointer':'default';}
    for(const mesh of this.meshes){const target=mesh===this.hovered?1:0;mesh.userData.hover=THREE.MathUtils.lerp(mesh.userData.hover,target,Math.min(delta*8,.2));const b=mesh.userData.basePosition;mesh.position.copy(b);mesh.position.z+=mesh.userData.hover*.42;mesh.position.y+=mesh.userData.hover*.08;mesh.rotation.z=mesh.userData.baseRotationZ+mesh.userData.hover*-.03;}
  }
}
