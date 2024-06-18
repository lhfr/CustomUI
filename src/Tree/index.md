---
category: Components
title: Tree # 组件的标题，会在菜单侧边栏展示
toc: content # 在页面右侧展示锚点链接
group: # 分组
  title: 移动端组件 # 所在分组的名称
  order: 1 # 分组排序，值越小越靠前
---

# Tree

## 示例

<code src="./demo/base.tsx">基本</code>

<code src="./demo/async.tsx">异步数据加载</code>

## API

| 参数            | 说明                   | 类型     | 默认值 |
| --------------- | ---------------------- | -------- | ------ |
| url             | 接口地址               | string   | -      |
| queryParams     | 接口参数               | object   | -      |
| async           | 是否异步加载数据       | boolean  | false  |
| onlyLeafJump    | 是否仅叶节点跳转       | boolean  | false  |
| disabledJumpIds | 禁止跳转的节点 id 集合 | array    | []     |
| onRightClick    | 点击右箭头时触发       | function | -      |
