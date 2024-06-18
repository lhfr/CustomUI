---
category: Components
title: CustomForm # 组件的标题，会在菜单侧边栏展示
toc: content # 在页面右侧展示锚点链接
group: # 分组
  title: Web 端组件 # 所在分组的名称
  order: 1 # 分组排序，值越小越靠前
---

# CustomForm

## 示例

<code src="./demo/base.tsx">基本</code>

<!-- <code src="./demo/remoteOptions.tsx">远程选项</code> -->

<code src="./demo/onlyOne.tsx">一个选项默认选中</code>

<code src="./demo/valueToClearValue.tsx">联动清空</code>

<code src="./demo/valueToParams.tsx">联动传参</code>

<code src="./demo/valueToDisabled.tsx">联动禁用</code>

<code src="./demo/render.tsx">自定义组件</code>

## API

| 参数      | 说明             | 类型     | 默认值 |
| --------- | ---------------- | -------- | ------ |
| data      | 数据源           | array    | -      |
| readOnly  | 是否只读         | boolean  | false  |
| noForm    | 不生成 form      | boolean  | false  |
| formProps | 控制 form 样式   | object   | -      |
| onChange  | 监听表单属性变化 | function | -      |
