import { CustomForm } from 'custom-ui';

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
        valueToClearValue: '确定清空下拉框数据吗？',
      },
      code_3: {
        valueToClearValue: '确定清空文本框数据吗？',
      },
    },
  },
  {
    code: 'code_2',
    label: '下拉框',
    type: 'select',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
    ],
    value: '1',
    cascader: {
      code_3: {
        valueToClearValue: '',
      },
    },
  },
  {
    code: 'code_3',
    label: '文本框',
    value: '333',
  },
];

export default () => {
  const handleChange = (data) => {
    console.log(data, 'data');
  };

  return <CustomForm data={data} onChange={handleChange} />;
};
