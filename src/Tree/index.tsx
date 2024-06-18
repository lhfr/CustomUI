import { useState, useEffect } from 'react'
import { TreePicker, ApiAxios } from "seedsui-react";

import styled from 'styled-components'
import Item from './Item'

const Container = styled.div`
  .rc-tree-node-content-wrapper {
    padding-right: 0 !important;
  }
  .rc-tree-title {
    width: 100%;
  }
  .rc-tree-switcher-noop {
    width: 0px !important;
  }
`

// 递归生成树形结构
const _deepTree = (data, id = '-1') => {
  const list = [];
  data.forEach((item) => {
    if (item.pid === id) {
      const children = _deepTree(data, item.id)
      if(children.length !== 0) item.children = children
      list.push(item);
    }
  });
  return list;
};

// 更新数据
const _updateList = (list, newData) => {
  for (let item of list) {
    // 上级 id
    let pid = newData?.[0]?.pid
    if (item.id === pid) {
      item.children = newData
      return 
    }
    if (Array.isArray(item.children)) {
      _updateList(item.children, newData)
    }
  }
  // 拷贝一下，防止不刷新
  return Object.clone(list)
}

export default ({ url, queryParams, data, async, onlyLeafJump, disabledJumpIds, onRightClick, ...treeProps }) => {
  const [list, setList] = useState(data)

  useEffect(() => {
    url && ApiAxios.post(url, queryParams)
      .then((result) => {
        if(result.code === '1') {
          setList(_deepTree(result.data))
        }
      })
  }, [url, queryParams]);

  return (
    <Container>
      <TreePicker.Tree
        list={list}
        checkable={false}
        itemRender={(item) => (
          <Item
            current={item}
            onlyLeafJump={onlyLeafJump}
            disabledJumpIds={disabledJumpIds}
            onRightClick={onRightClick}
          />
        )}
        onSelect={(item) => {
          // 异步加载数据，若已加载不重新发请求
          if (async && !item.children) {
            ApiAxios.post(`${url}?id=${item.id}`, queryParams).then((result) => {
              if (result.code === "1") {
                setList(_updateList(list, result.data));
              }
            });            
          }
        }}
        {
          ...treeProps
        }
      />
    </Container>
  );
}
