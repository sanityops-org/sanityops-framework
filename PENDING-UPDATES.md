# 待办提醒：外部资源就绪后需回更的文档内容

> 本文件为内部工作提醒，**不属于网站内容**。事项全部完成后请删除本文件，
> 或在 `.vitepress/config.mts` 中通过 `srcExclude` 将其排除出构建。
>
> 创建日期：2026-09-07

---

## 1. GitHub 仓库转为公开后

当前 `github.com/sanityops-org` 组织下的仓库为私有，公开访问全部 404。
仓库公开后，请验证以下链接可正常访问：

- 仓库主页：`https://github.com/sanityops-org/sanityops-framework`
  - 引用位置：`.vitepress/config.mts`（社交链接、导航 Discussions）、`framework/overview-v1.0.md`（约 478、899 行）、`about/index.md:16`、`preview/index.md:57`、`README.md:176`
- Issues / Discussions / Releases：
  - `framework/overview-v1.0.md`（约 797、799、901 行）
  - `RELEASE-NOTE-v1.0.md:81,147`
- **`sanityops-inspect` 工具仓库**（若会创建）：
  - `framework/try-the-tools.md:23` 和 `:72` 指向 `https://github.com/sanityops-org/sanityops-inspect/tree/main`
  - 若不创建该仓库，需将这两处改为其他获取方式说明
- 文件 blob 链接（旧路径已于 2026-09-07 修正为重构后的新路径）：
  - `framework/overview-v1.0.md` 约 717–759 行、`README.md:115–126`

## 2. Discord 社区建立后

- 待创建 Discord 服务器并生成 `https://discord.gg/sanityops` 邀请后：
  - 打开 `framework/overview-v1.0.md` 约 **798 行**
  - 将 `[Discord](https://discord.gg/sanityops) (to be established)` 中的
    **"(to be established)"** 字样删除
  - 验证邀请链接有效

## 3. SaaS 试用页 `/try` 上线后

页面 `https://www.sanityops.org/try` 当前不存在（返回空壳）。上线后验证：

- `framework/overview-v1.0.md` 约 **620 行**：`**Trial Link**: https://www.sanityops.org/try`
- `framework/overview-v1.0.md` 约 **900 行**：Quick Navigation 中的 SaaS Trial 链接

## 4. Live Demo 页 `/demo` 上线后

页面 `https://www.sanityops.org/demo` 当前不存在（返回空壳）。上线后验证：

- `framework/try-the-tools.md` 约 **41 行**：`**Live Demo**: https://www.sanityops.org/demo`
- `framework/try-the-tools.md` 约 **73 行**：表格中的 `[live demo](...)` 链接
- `about/partnership.md` 约 **94 行**：`[sanityops.org/demo](...)` 链接

## 5. （可选）tools.sanityops.io 子域名启用后

`inspect/tool-v1.0.md` 约 **1871 行** 的 "SanityOps Tools Website" 链接目前
临时指向站内页面 `/framework/try-the-tools.html`。若未来 `tools.sanityops.io`
子域名正式部署，可将该链接改回子域名地址。

---

## 已完成事项存档（2026-09-07）

- [x] 修复内部死链：`compare/sanityops-and-fde.md` 中 Harness 文档链接
- [x] 修复 10 个 GitHub blob 旧路径（`guide/`、`inspect-*`、`risk-*`、`quality-*` 前缀）
- [x] 修复 `compare/sanityops-positioning.md:141` 错误组织名 `github.com/SanityOps`
- [x] 修复 AWS 中文站链接（`/cn/blogs/` → `/blogs/`）
- [x] 清理中文残留：汉字"沉淀"、中文标点【】——：｜
