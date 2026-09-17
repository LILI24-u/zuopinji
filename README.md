# Jack — 3D Creator

个人作品集框架，含首页、双排滚动画廊、关于、服务和项目叠卡。

## 本地开发

需要 Node.js 22.13+，使用 pnpm 管理依赖。

```sh
pnpm install
pnpm dev
pnpm build
```

## 修改内容

- `app/page.tsx`：页面与 FadeIn、Magnet、AnimatedText、MarqueeSection、ProjectCard 组件。
- `app/globals.css`：配色、排版、断点和布局。
- `lib/portfolio.ts`：个人介绍、邮箱、服务与项目网址。邮箱与网址留空时按钮显示待补充提示，不会跳转到虚构地址。
- `lib/assets.json`：提示词中的原始图片地址。失效 GIF 自动使用第一张可用展示图。
- `app/layout.tsx`：页面标题与描述。

## 技术说明

使用 React、TypeScript、Tailwind CSS、Framer Motion、Lucide React。预览和托管基于 Vinext / Vite；沿用托管模板的 React 19 和 Tailwind 4，而非提示词中的 React 18 / Tailwind 3。页面为响应式单页，无数据库和表单后端。外部图片和 Google Fonts 需要网络连接。

联系邮箱和三个项目实际网址尚未提供，请在正式用于个人展示前补齐。
