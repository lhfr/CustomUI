import Mock from "mockjs";
import { Tree } from 'custom-ui';

Mock.mock("/api/tree", "post", {
  code: "1",
  msg: "success",
  data: [
    {
      name: '1',
      id: '1',
      pid: '-1',
      value: 100,
    },
    {
      name: '1-1',
      id: '1-1',
      value: 20,
      pid: '1',
    },
    {
      name: '1-2',
      id: '1-2',
      value: 80,
      pid: '1',
    },
    {
      name: '1-1-1',
      id: '1-1-1',
      value: 20,
      pid: '1-1',
    },
    {
      name: '1-2-1',
      id: '1-2-1',
      value: 80,
      pid: '1-2',
    },
  ]
});

export default () => {  
  return (
    <Tree url='/api/tree' onlyLeafJump />
  );
}
