import { PlusOutlined } from '@ant-design/icons';
import { Space, Upload } from 'antd';

export default ({ value, onChange, readOnly, ...restProps }) => {
  if (!value) value = [];

  return (
    <Space>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        {...restProps}
        fileList={value}
        onChange={({ fileList }) => {
          onChange(fileList);
        }}
      >
        {!readOnly && (
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        )}
      </Upload>
    </Space>
  );
};
