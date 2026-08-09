# Mia Across America V4 — Asset Index

## 当前完整 handoff 包
- 文件名：`MIA_V4_COMPLETE_HANDOFF.zip`
- ChatGPT Library：`/Mia Across America V4/MIA_V4_COMPLETE_HANDOFF.zip`
- 大小约：27MB
- 共 48 个文件
- 包内含 `SHA256SUMS.txt` 与 `FILE_LIST.txt`

## Art Direction Boards
这些文件用于锁定美术方向，不是 production-ready 贴图：

1. `assets/reference/01-ui-concept.png`
   - NYC Arrival 首页与旅行书 UI 概念
2. `assets/reference/02-asset-collage.png`
   - 角色、动作、车辆、NYC、地铁、UI 总览
3. `assets/reference/03-asset-direction-board.png`
   - 角色五视图、Pose、Walk、Vehicles、NYC layers、Subway、Times Square、UI、Particles
4. `assets/reference/04-production-roadmap.png`
   - V4 生产流程与目录架构视觉图
5. `assets/reference/05-progress-board.png`
   - NYC SHOT 01–08 目标效果与阶段进度图

## Reference Crops
目录：`assets/reference/crops/`

- `01-character-turnaround-reference.png`
- `02-key-pose-library-reference.png`
- `03-outfit-props-reference.png`
- `04-walk-side-reference.png`
- `05-walk-back-reference.png`
- `06-vehicles-reference.png`
- `07-nyc-layers-reference.png`
- `08-subway-reference.png`
- `09-times-square-reference.png`
- `10-props-signage-reference.png`
- `11-ui-reference.png`
- `12-particles-reference.png`

这些 crop 只用于后续逐项生成时作为视觉参考，不应直接裁出来当最终 WebGL 资产。

## Docs
- `README.md`
- `WORK_HANDOFF.md`
- `ASSET_INDEX.md`
- `docs/PRODUCTION_PLAN.md`
- `docs/asset-manifest.json`
- `FILE_LIST.txt`
- `SHA256SUMS.txt`

## Archives
- `archives/mia-v4-reference-assets.zip`
- `archives/mia-v4-asset-production-plan.zip`

## Legacy Prototypes
### V2
- `legacy/v2/mia-across-america-cinematic-v2.zip`
- `legacy/v2/index.html`
- `legacy/v2/standalone.html`

用途：早期 Three.js cinematic 技术试验，仅用于对照，不作为 V4 美术基线。

### V3
- `legacy/v3/mia-across-america-cinematic-v3.zip`
- `legacy/v3/mia-across-america-cinematic-v3.html`

用途：2.5D cinematic 叙事链路试验，可参考“走路 -> 地铁 -> Times Square -> Route 66 -> Canyon -> SF”的镜头关系，但 V4 不延续其表现层。

## Production Assets 仍需制作
当前参考板不是最终独立资产。Work 中要继续产出：

### Mia
- 五视图独立透明 PNG
- 关键 Pose 独立透明 PNG
- Oil Motion 动作母版与 WebP atlas / MP4

### NYC
- Background / Midground / Foreground 独立资源
- Subway entrance/platform/train/interior
- Times Square background/midground/foreground
- Taxi 分层资源
- signage / props / pedestrian / foliage

### Runtime
- Scene Ledger
- Travel Conductor
- Camera Director
- Lighting/Fog Director
- Mia Motion Player
- Vehicle Controllers
- Progressive Preloader

## 重要规则
**方向板 ≠ 最终资产。**
最终资产必须独立生成、单独 QA、按 CSS display size × DPR 预算并压缩后才进入 Three.js/Oil Motion。