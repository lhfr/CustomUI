import { CustomForm } from 'custom-ui';
import Mock from 'mockjs';

Mock.mock('/api/select/valueToParams', 'post', {
  code: '1',
  msg: 'success',
  data: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ],
});

const data = [
  {
    code: 'code_1',
    label: '单选框',
    type: 'radio',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ],
    value: '1',
    cascader: {
      code_2: {
        valueToParams: 'id',
      },
    },
  },
  {
    code: 'code_2',
    label: '下拉框',
    type: 'select',
    url: '/api/select/valueToParams',
  },
];

export default () => {
  const handleChange = (data) => {
    console.log(data, 'data');
  };

  return <CustomForm data={data} onChange={handleChange} />;
};
