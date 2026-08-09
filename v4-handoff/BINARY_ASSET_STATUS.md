# V4 Binary Asset Status

## 当前状态
GitHub `usa-girl-v4` 已包含 V4 的文本交接文档与索引。

当前 ChatGPT GitHub 连接器没有“从本地文件路径直接上传二进制 PNG/WebP/ZIP”的动作；`create_blob` 需要调用方先把整个二进制转换成字符串/base64，不适合当前约 27MB 的完整资源包。

因此：**不要把本文件理解为二进制已经全部进入 GitHub。**

## 已完整保存的位置
ChatGPT Library：

`/Mia Across America V4/MIA_V4_COMPLETE_HANDOFF.zip`

包内共 48 个文件，包含：
- 5 张完整 V4 视觉方向/规划/进度板
- 12 张局部 reference crop
- Production Plan
- Asset Manifest
- Work Handoff
- Asset Index
- SHA256 校验
- V2/V3 legacy prototype
- 两个早期 V4 archive

## Work 中第一步
1. 从 ChatGPT Library 获取 `MIA_V4_COMPLETE_HANDOFF.zip`。
2. 解压。
3. 将包内 `mia-v4-final-handoff/` 内容复制到 `usa-girl-v4` 工作目录的 `v4-handoff-package/`（或者按最终目录重排）。
4. 执行：

```bash
git status
git add v4-handoff-package
git commit -m "assets: import complete Mia V4 handoff package"
git push origin usa-girl-v4
```

5. 用 `SHA256SUMS.txt` 检查复制过程没有损坏。
6. 提交完成后，把 `BINARY_ASSET_STATUS.md` 更新成 `COMPLETE`，并记录最终 commit SHA。

## 推荐最终仓库目录
```text
v4/
  docs/
  assets/
    reference/
    mia/
      identity/
      poses/
      motion/
    nyc/
      bg/
      mid/
      fg/
      subway/
      times-square/
    vehicles/
    props/
    ui/
    particles/
  src/
  qa/
  legacy/
```

完成 binary import 后再开始新资产生产，不要重新生成当前 reference boards。