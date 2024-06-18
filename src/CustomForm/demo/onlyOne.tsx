import { CustomForm } from 'custom-ui';
import Mock from 'mockjs';

Mock.mock('/api/select/onlyOne', 'post', {
  code: '1',
  msg: 'success',
  data: [
    { label: '1', value: '1' },
  ],
});

const data = [
  {
    code: 'code_1',
    label: '下拉框_1',
    type: 'select',
    // value: '1',
    options: [
      { label: '1', value: '1' },
    ],
    enableAutoValue: 'onlyOne',
  },
  {
    code: 'code_2',
    label: '下拉框_2',
    type: 'select',
    // value: '1',
    url: '/api/select/onlyOne',
    enableAutoValue: 'onlyOne',
  },
];

export default () => {
  return <CustomForm data={data} />;
};
