import { Select } from 'antd';
import { CustomForm } from 'custom-ui';

const MySelect = (props) => {
  return (
    <>
      {props.value}
      <Select {...props} />
    </>
  );
};

const data = [
  {
    code: 'code',
    label: '下拉框',
    value: '1',
    options: [
      { label: 1, value: 1 },
      { label: 2, value: 2 },
    ],
    render: <MySelect />,
  },
];

export default () => {
  const handleChange = (data) => {
    console.log(data, 'data');
  };

  return <CustomForm data={data} onChange={handleChange} />;
};
