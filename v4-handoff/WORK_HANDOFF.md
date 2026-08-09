# Mia Across America V4 — Work Handoff

## 目标
构建一个“用户滚动 = Mia 继续旅行”的连续美国旅行 3D 世界。不是地标卡片轮播，也不是静态场景合集。

## 已确认技术路线
- Three.js：单一 persistent world、Camera、Fog、Lighting、Vehicle path、场景空间。
- Native `scrollY`：唯一 exact state；额外维护 smoothed cinematic state。
- Oil Motion：Mia 的语义动作（走路、下楼、坐地铁、拍照、上下车、缆车乘坐）。
- 高质量 PNG/WebP/AVIF：人物、店铺、建筑细节、前景遮挡、UI 贴纸。
- GLTF/Instancing：只用于真正需要 3D 体积/透视的道路、站台、隧道、桥、基础建筑体块。
- 场景 seam：地铁车体、隧道黑暗、出租车近景、雾、建筑/岩石前景遮挡。

## 参考项目
- Kage: https://github.com/MengTo/kage
- Kage skills: https://github.com/MengTo/skills
  - `build-threejs-scroll-worlds`
  - `falling-leaves`
  - `pointer-trail-emitter`
- Oil Motion: https://github.com/oil-oil/oil-motion

注意：学习架构与制作方法，不复制 Kage 原创代码或美术资产。

## 当前 GitHub
- Repo: `983033995/gemini-playground`
- V4 branch: `usa-girl-v4`
- V3 branch: `usa-girl-cinematic-v3`
- 后续在 Work 中以 `usa-girl-v4` 为唯一开发分支。

## 二进制资产交接
完整二进制 handoff 包名：`MIA_V4_COMPLETE_HANDOFF.zip`。
ChatGPT Library 路径：`/Mia Across America V4/MIA_V4_COMPLETE_HANDOFF.zip`。
当前 GitHub 连接器没有从本地路径直接上传 PNG/WebP/ZIP 的动作，因此这些二进制资源需要在 Work 环境中解压后执行一次 `git add/commit/push`。不要重新生成；包内已经包含全部现有视觉资产、参考裁切、规划资料和 V2/V3 对照版本。

## 第一阶段：NYC Vertical Slice（SHOT 01–08）
先只做纽约，达到作品级质量后再扩美国全路线。

### SHOT 01 — NYC Arrival
- Mia 拖旅行箱从后 3/4 进入纽约街道。
- Camera：后方低机位跟拍。
- Foreground：路灯、消防栓、近景出租车。

### SHOT 02 — Walking NYC
- Mia `WALK_SIDE / WALK_BACK_3Q`。
- Camera 从后方渐变到侧面。
- Midground：brownstone、咖啡店、行人、出租车。

### SHOT 03 — Subway Entrance
- Mia 从 walk 过渡到 `stairs_down`。
- Camera 侧跟 -> 高位俯拍。
- Subway globe / railing 是重要前景。

### SHOT 04 — Platform
- Mia `WAIT`。
- 列车灯从隧道远处出现。

### SHOT 05 — Train Occlusion
- 地铁车体占满屏幕，作为隐藏 world seam。

### SHOT 06 — Inside Subway
- Mia `SUBWAY_SIT / SUBWAY_STAND`。
- 窗外隧道 `light-dark-light` 扫过脸。

### SHOT 07 — Times Square Exit
- Mia `STAIRS_UP` 出站。
- Times Square 作为第一次大型 reveal。

### SHOT 08 — NYC Check-in
- `CAMERA_READY -> TAKE_PHOTO -> PHOTO_REVIEW`。
- Camera 轻微 orbit，不超过 15°。
- New York `VISITED` stamp。

## Mia Identity Lock
最终母版建议角色高 2048–3072px、透明 PNG。

必须固定：
- 8–10 岁视觉年龄、5.5–6 头身
- 深棕中长发、空气刘海、低马尾
- 米白旅行外套
- 暖黄色内搭
- 深蓝短裙
- 白袜
- 珊瑚红运动鞋
- 焦糖棕背包
- 复古小相机

五视图：`front / front_3q / side / back_3q / back`。
禁止换脸、发型变化、服装变化、背包变化、相机变化、人物比例变化。

## 关键 Pose
需要独立透明 PNG：
- idle
- look_back
- wait
- camera_ready
- take_photo
- photo_review
- stairs_down_key
- stairs_up_key
- subway_sit
- subway_stand
- enter_car_key
- car_sit
- exit_car_key
- cable_car_ride
- wave

## Oil Motion 动作
优先顺序：
1. `walk_side_loop`
2. `walk_back_3q_loop`
3. `stairs_down`
4. `subway_sit_transition`
5. `take_photo`
6. `enter_car`
7. `exit_car`
8. `cable_car_ride_idle`

每条动作：Motion Brief -> 关键帧验收 -> 动作母版 -> 完整观看 -> 切帧/抠图/去重复 -> Contact Sheet QA -> WebP atlas 或 all-I-frame MP4 -> Scroll 映射 -> 快速反向/移动端 QA。

语义运动交给生成模型：肢体、关节、接触、前后遮挡。
几何运动交给程序：整体位移、Camera、scale、vehicle path、layer、time mapping。

## NYC 世界资产
### Background
- nyc_skyline_far
- nyc_sky_morning
- times_square_skyline_far

### Midground
- brownstone_block_A/B
- coffee_shop_facade
- corner_store_facade
- subway_entrance_structure
- subway_platform_architecture
- subway_train_exterior
- subway_train_interior
- times_square_billboard_cluster_A/B

### Foreground transparent cutouts
- street_lamp
- fire_hydrant
- traffic_light
- one_way_sign
- subway_globe
- subway_railing
- bench
- trash_can
- newspaper_box
- hotdog_cart
- pedestrian_A/B/C
- taxi_near_camera
- tree_branch_A/B

每个主镜头至少有一个 near-camera foreground occlusion。

## Three.js 运行时建议目录
```text
src/
  world/
    World.ts
    CameraDirector.ts
    TravelConductor.ts
    SceneLedger.ts
    LightingDirector.ts
    FogDirector.ts
  character/
    MiaController.ts
    MiaMotionPlayer.ts
  vehicles/
    Taxi.ts
    Subway.ts
    RoadTripCar.ts
    CableCar.ts
  chapters/
    nyc/
    route66/
    canyon/
    san-francisco/
  fx/
    ForegroundOcclusion.ts
    FallingParticles.ts
    PointerTrail.ts
  loaders/
    AssetPreloader.ts
  ui/
```

## Scroll Conductor
- `exactProgress = scrollY / (documentHeight - innerHeight)`
- `smoothProgress` 只用于视觉。
- chapter/UI/state 只读 exactProgress。
- Camera/Fog/Light/Mia blend/Parallax 使用 smoothProgress。
- 禁止直接累积 wheel delta 作为唯一状态。

## Scene Ledger 数据化
不要把镜头逻辑散落在大量 if/else。每段镜头至少包含：`id/range/camera/mia/lighting/fog/preload`。

## NYC 通过后的完整路线
- SHOT 09：Taxi transition
- SHOT 10：Route 66 car follow
- SHOT 11：Car window emotional shot
- SHOT 12：Grand Canyon arrival
- SHOT 13：Canyon reveal
- SHOT 14：Canyon check-in
- SHOT 15：San Francisco cable car
- SHOT 16：Golden Gate finale

## 性能预算
- Three.js application code：尽量 <1MB。
- 首屏目标：<2MB。
- 全旅程首轮建议：<8–12MB。
- Desktop DPR max 1.5–1.75；Mobile DPR 1.25–1.5。
- chapter progressive preload。
- 高分辨率不透明滚动动作优先 all-I-frame MP4。
- 透明短角色动作优先 WebP atlas / 分片 atlas。

## QA 硬门槛
1. 不看文字也能理解 Mia 在旅行。
2. 能明显看出走路 -> 上/乘交通 -> 下车 -> 打卡。
3. 角色身份完全一致。
4. 快速滚动和反向滚动不破坏状态。
5. 场景 seam 不公开瞬移。
6. 每个核心镜头有前/中/后景。
7. 地标 reveal 有明确高潮。
8. 移动端独立构图，不只是缩小 desktop。
9. `prefers-reduced-motion` 有静态 fallback。
10. 冷缓存、加载失败有首帧/静态 fallback。

## Work 开始时建议第一条任务
> 读取仓库 `983033995/gemini-playground` 的 `usa-girl-v4` 分支，以及 ChatGPT Library `/Mia Across America V4/MIA_V4_COMPLETE_HANDOFF.zip`。先把 handoff 包完整解压到仓库并提交二进制资产；然后建立 Mia Identity Lock 和 NYC SHOT 01–08 的 Scene Ledger。不要直接重写整站，先完成 SHOT 01–03 的可运行 Vertical Slice，使用 native scroll exact state + smoothed cinematic state，并确保所有新生成资产都有独立文件和 manifest。