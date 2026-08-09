# Mia Across America V4 — Asset Production Plan

> `reference-board-crops/` 中的图片只作为美术方向参考，不作为最终网页资产。
> 最终资产必须独立生成，并按真实页面尺寸和 DPR 重新验收。

## 生产顺序

1. 锁定 Mia 身份与五视图。
2. 生成独立透明关键 Pose。
3. 用 Oil Motion 制作语义动作母版并逐帧 QA。
4. 生成 NYC 前/中/后景独立资产。
5. 集成到单一 persistent Three.js world。
6. 先完成 NYC SHOT 01–08 vertical slice，通过后再扩 Route 66 / Grand Canyon / San Francisco。

## Batch A — Mia Identity Lock

目标：角色母版 2048–3072 px 高，透明 PNG。

- mia_front
- mia_front_3q
- mia_side
- mia_back_3q
- mia_back

硬性锁定：
- 8–10 岁视觉年龄，约 5.5–6 头身
- 深棕中长发、空气刘海、低马尾
- 米白旅行外套
- 暖黄色内搭
- 深蓝短裙
- 白袜
- 珊瑚红运动鞋
- 焦糖棕小背包
- 复古小相机
- 所有角度保持完全相同脸型、身材比例、材质与配色

## Batch B — Static Key Poses

目标：2048 px 透明 PNG。

- idle
- look_back
- wait
- camera_ready
- take_photo
- photo_review
- stairs_down_key
- subway_sit
- subway_stand
- enter_car_key
- car_sit
- cable_car_ride

## Batch C — Oil Motion Clips

每条动作先验收关键帧，再生成母版。

- walk_side_loop
- walk_back_3q_loop
- stairs_down
- subway_sit_transition
- subway_stand_transition
- take_photo
- enter_car
- exit_car
- cable_car_ride_idle

交付策略：
- 透明短动作：WebP atlas
- 大尺寸不透明电影式滚动段：all-I-frame MP4
- scroll progress -> integer frame
- 运行时使用 smoothDamp，不叠加多层 lerp

## Batch D — NYC World Assets

### Background
- nyc_skyline_far
- nyc_sky_morning
- times_square_skyline_far

### Midground
- brownstone_block_A
- brownstone_block_B
- coffee_shop_facade
- corner_store_facade
- subway_entrance_structure
- subway_platform_architecture
- subway_train_exterior
- subway_train_interior
- times_square_billboard_cluster_A
- times_square_billboard_cluster_B

### Foreground Cutouts
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
- pedestrian_A
- pedestrian_B
- pedestrian_C
- taxi_near_camera
- tree_branch_A
- tree_branch_B

## Batch E — Vehicle Assets

需要交互的车辆拆层。

- taxi_body
- taxi_front_door
- taxi_rear_door
- subway_train
- road_trip_car
- cable_car_body
- cable_car_step_details

## NYC Vertical Slice 验收

SHOT 01–08 必须满足：
- 走路是真正连续动作
- 下楼动作不是整张图片位移
- 地铁进站能隐藏 world seam
- 车厢内有规律灯光扫过
- Times Square reveal 有明确视觉高潮
- 拍照动作可随反向滚动自然倒放
- 每个核心镜头都有 foreground occlusion
- 快速滚动 / 反向滚动状态确定
- 移动端独立构图
