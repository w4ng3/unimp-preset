## 项目简介

uniapp_微信小程序预设模版

### 技术栈

- UI 框架：[uni-app](https://uniapp.dcloud.net.cn/) (Vue3 + TS + Setup)
- 状态管理：[pinia](https://pinia.vuejs.org/zh/)
- 组件库：[uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html) 官方组件
- 组件库： [wot-design-uni](https://wot-design-uni.gitee.io/) （vue3 + TS）推荐

> 单独引入了一个 `UV-UI` 的富文本解析器`components/uv-parse`,可查看组件介绍：https://www.uvui.cn/components/parse.html

## 运行程序

1. 安装依赖

```shell
# pnpm
pnpm i --registry=https://registry.npmmirror.com
```

2. 运行程序

```shell
# 微信小程序端
pnpm run dev:wx

# H5端
pnpm run dev:h5
```
# App端
需 HbuilderX 工具，运行到手机或模拟器

3. 微信开发者工具导入 `/dist/dev/mp-weixin` 目录


### 修改主题
[主题变量清单查看此文件->WOT-DESIGN](https://github.com/Moonofweisheng/wot-design-uni/blob/master/src/uni_modules/wot-design-uni/components/common/abstracts/variable.scss)

在`styles/wot-theme.scss`里配置了写默认值，如果需要配置多主题，可以将css变量定义在`.wot-theme-XXXX {}`类里，
然后用wot-design的 `ConfigProvider`全局配置组件完成主题切换。


### 工程结构解析

```
├── .husky                     # Git Hooks
├── .vscode                    # VS Code 插件 + 设置 + 配置文件
├── dist                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── api                     # 所有请求
│   ├── components             # 全局组件
│   ├── hooks                  # 组合式函数
│   ├── pages                  # 主包页面
│       ├── index               # 首页
│       ├── scan                # 扫码充电
│       ├── shop                # 商城
│       ├── my                  # 我的
│       └── login               # 登录页
│   ├── static                 # 存放应用引用的本地静态资源的目录
│       ├── images              # 普通图片
│       └── tabs                # tabBar 图片
│   ├── stores                 # 全局 pinia store
│       ├── modules             # 模块
│       └── index.ts            # store 入口
│   ├── styles                 # 全局样式
        ├── global.scss         # 样式
│       └── fonts.scss          # 字体图标
│   ├── types                  # 类型声明文件
│       └── component.d.ts      # 全局组件类型声明
│   ├── utils                  # 全局方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
│   ├── pages.json             # 配置页面路由等页面类信息
│   ├── manifest.json          # 配置appid等打包信息
│   └── uni.scss               # uni-app 内置的常用样式变量
├── .editorconfig              # editorconfig 配置
├── .eslintrc.cjs              # eslint 配置
├── .prettierrc.cjs            # prettier 配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── NLGL-shop.code-workspace   # vscode工作区配置
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
└── vite.config.ts             # vite 配置
```
