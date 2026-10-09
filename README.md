# 学信档案 (CHSI) 现代化仿真展示系统

基于 **Vue 3 + TypeScript + Vite + SCSS** 重构的高仿真学信档案移动端展示与动态分享系统。
结合 **Cloudflare Pages / Workers 全栈直出架构**，实现毫秒级短链直出、高保真视觉呈现与零冗余云端轻量化运行。

---

## 🌟 核心特性

- **高保真视觉还原**
  - 1:1 像素级还原学信网移动端 UI，包含首页、高等教育信息卡片、高等学籍详情、高等学历证书等完整视图。
  - 完美适配 iOS 与 Android 移动端视口（含全面屏 Safe Area 安全边距与状态栏自适应）。
  - 日期规范化展示：出生日期、入学日期、预计毕业及毕（结）业日期严格统一为规范的两位数（如 `01月01日`、`09月01日`）。

- **Vue 3 + TypeScript 模块化架构**
  - 基于 Vue 3 Composition API (`<script setup>`) 与 TypeScript 强类型约束开发。
  - **样式工程解耦**：所有核心视图组件样式全部独立分离为专属 `.scss` 模块，清晰易维护。

- **云端全栈直出引擎（Cloudflare Pages / KV）**
  - **超短链秒开**：通过分配 8 位随机短码（如 `/s/ufetkgoF`），在云端由 Worker 引擎即时直出轻量化静态单页，无需客户端加载庞大 JS 包，国内移动网络与微信环境打开极速无阻。
  - **零代码仓库污染**：彻底淘汰旧版“每生成一个链接就新建并提交一个 `.html` 文件”的冗余模式，数据采用 LZ-String 高效压缩后入库 KV，不写本地磁盘，不产生 Git 垃圾文件。
  - **有效期到期自毁**：支持设置链接有效期（3天、7天、30天、永久有效），支持 KV TTL 自动过期清除。

- **灵活便捷的信息管理后台**
  - **身份证号智能解析**：输入 18 位身份证号码自动提取并填充出生年月日。
  - **支持本专科与研究生教育**：一键切换或并列维护本科与硕士/博士学籍学历。
  - **原图无损照片上传**：取消强制裁剪与压缩，完整保留用户上传的原始头像高清质感。

---

## 📱 核心页面一览

| 页面名称 | 路径 / 视图 | 说明 |
| :--- | :--- | :--- |
| **首页 (学信档案)** | `/` (`HomeView.vue`) | 学信网移动端门户首页、快捷功能金刚区入口、底部导航栏。 |
| **高等教育信息** | `/education` (`EduListView.vue`) | 展示本科与研究生的学籍信息、学历信息、学位信息卡片。 |
| **高等学籍详情** | `/xueji` (`XuejiView.vue`) | 高等学籍详情，支持本科/研究生 Tab 切换及在线验证报告引导。 |
| **高等学历详情** | `/xueli` (`XueliView.vue`) | 高等学历证书详情，规范绑定学历照片与毕（结）业信息。 |
| **信息编辑后台** | `/edit` (`EditorView.vue`) | 表单录入、原图照片上传、有效期设置、生成分享短链弹窗。 |
| **链接失效页** | `/expired` (`ExpiredView.vue`) | 分享链接到期失效后的安全提示卡片。 |

---

## 🛠️ 技术栈

- **前端核心**：Vue 3.5+、Vue Router 4、TypeScript 5.7+
- **构建工具**：Vite 6、vue-tsc
- **样式处理**：Sass / SCSS（视图组件样式独立分离）
- **数据压缩与传输**：lz-string
- **云端直出架构**：Cloudflare Pages / Workers (`_worker.js`)、Cloudflare KV

---

## 📁 项目目录结构

```text
CHSI/
├── public/                 # 静态资源与 Pages Worker 入口
│   ├── banner.png          # 顶部宣传图
│   └── _worker.js          # Cloudflare Pages 云端动态直出路由与 API 引擎
├── src/
│   ├── assets/             # 全局静态资源与图标
│   ├── components/         # 公共组件 (NavBar, ShareModal, Toast)
│   ├── composables/        # 响应式状态管理 (useProfile)
│   ├── router/             # 路由配置
│   ├── types/              # TypeScript 接口定义 (StudentProfile)
│   ├── utils/              # 辅助工具 (LZ 编解码、API 客户端)
│   └── views/              # 核心视图组件与解耦样式
│       ├── EditorView.vue  # 档案信息编辑后台
│       ├── EditorView.scss # 编辑后台样式
│       ├── EduListView.vue # 高等教育信息卡片列表
│       ├── EduListView.scss# 高等教育卡片列表样式
│       ├── ExpiredView.vue # 链接失效展示页
│       ├── ExpiredView.scss# 链接失效样式
│       ├── HomeView.vue    # 移动端首页
│       ├── HomeView.scss   # 首页金刚区与导航样式
│       ├── XuejiView.vue   # 高等学籍详情视图
│       ├── XuejiView.scss  # 高等学籍样式
│       ├── XueliView.vue   # 高等学历详情视图
│       └── XueliView.scss  # 高等学历样式
├── index.html              # SPA 应用入口
├── vite.config.ts          # Vite 构建配置
├── package.json            # 项目依赖与运行脚本
└── dist.zip                # 一键部署到 Cloudflare Pages 的生产包
```

---

## 🚀 本地开发与运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地开发服务
```bash
npm run dev
```
启动后在浏览器打开终端提示的地址（通常为 `http://localhost:5174/` 或 `http://localhost:5173/`）。

### 3. 类型检查与生产打包
```bash
npm run build
```
构建产物将输出至 `dist/` 目录，其中包含前端静态资源与自动集成的 `_worker.js` 全栈脚本。

---

## 🌐 生产部署指南 (Cloudflare Pages)

本项目全面采用 **Cloudflare Pages 全栈服务模式** 部署，前端后台与短链直出引擎同源秒开。

1. **生成部署包**：
   运行构建并打包项目：
   ```bash
   npm run build
   # 打包 dist 目录生成 dist.zip
   ```
2. **在 Cloudflare 创建并部署**：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)；
   - 依次点击 **Workers & Pages** -> **Create application** -> **Pages** -> **Upload assets**；
   - 项目名称输入（如 `chsi-admin`）；
   - 上传本地生成的 `dist.zip` 并点击部署；
3. **绑定 KV 数据库（用于短链数据存储）**：
   - 在已创建的 Pages 项目设置中，进入 **Settings** -> **Functions** -> **KV namespace bindings**；
   - 点击 **Add binding**：
     - **Variable name（变量名）**：必须填写为 `EDU_KV`
     - **KV namespace**：绑定您的 KV 数据库实例；
   - 保存后重新触发一次部署即可全面生效。

---

## 📝 许可与声明

本项目仅供前端工程化学习、组件封装实践与界面仿真技术交流使用，请勿用于非法用途。
