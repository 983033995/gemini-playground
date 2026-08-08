import * as THREE from "three";
const clamp01=v=>Math.min(1,Math.max(0,v));
export class CameraRig{
  constructor(camera){
    this.camera=camera;this.group=new THREE.Group();this.group.add(camera);this.progress=.018;this.targetProgress=this.progress;this.mouse=new THREE.Vector2();this.mouseSmooth=new THREE.Vector2();
    this.positionCurve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.7,2.6,10.6),new THREE.Vector3(2.5,2.15,6.9),new THREE.Vector3(10.5,2.55,8.1),new THREE.Vector3(17.2,2.05,6.25),new THREE.Vector3(25.4,2.8,7.6),new THREE.Vector3(33.2,2.05,5.9),new THREE.Vector3(41.0,2.55,7.2),new THREE.Vector3(47.0,2.25,9.3)
    ],false,'centripetal');
    this.targetCurve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(.2,1.5,.1),new THREE.Vector3(4.5,1.25,-.2),new THREE.Vector3(13.4,1.45,0),new THREE.Vector3(18,1.3,-.35),new THREE.Vector3(27,1.5,0),new THREE.Vector3(32,1.3,-.25),new THREE.Vector3(40.5,1.4,0),new THREE.Vector3(44,1.3,0)
    ],false,'centripetal');
  }
  addDelta(d){this.targetProgress=clamp01(this.targetProgress+d)}
  goTo(p){this.targetProgress=clamp01(p)}
  setMouse(x,y){this.mouse.set(THREE.MathUtils.clamp(x,-1,1),THREE.MathUtils.clamp(y,-1,1))}
  update(delta){
    const s=1-Math.pow(.0001,delta);this.progress=THREE.MathUtils.lerp(this.progress,this.targetProgress,Math.min(s*.18,.22));this.mouseSmooth.lerp(this.mouse,Math.min(s*.06,.09));
    const pos=this.positionCurve.getPointAt(this.progress),look=this.targetCurve.getPointAt(this.progress);this.group.position.lerp(pos,Math.min(s*.42,.48));
    const m=new THREE.Matrix4().lookAt(this.group.position,look,new THREE.Vector3(0,1,0));const q=new THREE.Quaternion().setFromRotationMatrix(m);this.group.quaternion.slerp(q,Math.min(s*.28,.32));
    this.camera.position.x=THREE.MathUtils.lerp(this.camera.position.x,this.mouseSmooth.x*.25,.055);this.camera.position.y=THREE.MathUtils.lerp(this.camera.position.y,-this.mouseSmooth.y*.16,.055);this.camera.rotation.y=THREE.MathUtils.lerp(this.camera.rotation.y,-this.mouseSmooth.x*.018,.055);this.camera.rotation.x=THREE.MathUtils.lerp(this.camera.rotation.x,-this.mouseSmooth.y*.014,.055);
  }
}
