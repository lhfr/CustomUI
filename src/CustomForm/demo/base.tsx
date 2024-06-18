import { Button, Space } from 'antd';
import { CustomForm } from 'custom-ui';
import { useRef } from 'react';

const data = [
  {
    code: 'code_1',
    label: '单选框',
    type: 'radio',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
    ],
    // value: '1',
    required: true,
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
    // value: '1',
  },
  {
    code: 'code_3',
    label: '文本框',
    // value: '333',
  },
  {
    code: 'code_4',
    label: '图片',
    type: 'photo',
    // value: [
    //   {
    //     uid: '-1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    // ],
  },
];

export default () => {
  const formRef = useRef(null);

  const handleChange = (data) => {
    console.log(data, 'data');
  };

  const handleSetValues = () => {
    formRef.current?.setFieldsValue({
      code_1: '1',
      code_2: 1,
      code_3: 333,
      code_4: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    });
  };

  const handleGetValues = async () => {
    const values = await formRef.current?.getFieldsValue();
    console.log(values, 'values');
  };

  const handleReset = () => {
    formRef.current?.resetFieldsValue();
  };

  const handleSetAttribute = () => {
    formRef.current?.setFieldsAttribute({
      code_1: {
        disabled: true,
      },
      code_2: {
        readOnly: true,
      },
    });
  };

  return (
    <>
      <CustomForm data={data} ref={formRef} onChange={handleChange} />
      <Space>
        <Button type="primary" onClick={handleSetValues}>
          设值
        </Button>
        <Button type="primary" onClick={handleGetValues}>
          取值
        </Button>
        <Button onClick={handleReset}>重置</Button>
        <Button onClick={handleSetAttribute}>设置属性</Button>
      </Space>
    </>
  );
};
