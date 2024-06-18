import { CustomForm } from 'custom-ui';

const data = [
  {
    code: 'code_1',
    label: '下拉框_1',
    type: 'select',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ],
    cascader: {
      code_2: {
        valueToDisabled: '',
      },
      code_3: {
        valueToDisabled: '',
      },
    },
  },
  {
    code: 'code_2',
    label: '下拉框_2',
    type: 'select',
    // disabled: true,
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ],
    cascader: {
      code_3: {
        valueToDisabled: '',
      },
    },
  },
  {
    code: 'code_3',
    label: '下拉框_3',
    type: 'select',
    // disabled: true,
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ],
  },
];

export default () => {
  const handleChange = (data) => {
    console.log(data, 'data');
  };

  return <CustomForm data={data} onChange={handleChange} />;
};
