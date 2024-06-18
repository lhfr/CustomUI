import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { DatePicker, Form, Input, InputNumber, Modal, Radio } from 'antd';
import Image from './Image';
import Select from './Select';

// 联动清空
const valueToClearValue = (current, form) => {
  for (let key in current.cascader) {
    if (current.cascader[key]?.hasOwnProperty('valueToClearValue')) {
      form.setFieldValue(key, '');
    }
  }
};

// 联动修改参数
const valueToParams = (fields, current, form, isClearValue) => {
  let forceUpdate = false;
  for (let field of fields) {
    for (let key in current.cascader) {
      if (
        field.code === key &&
        current.cascader[key]?.hasOwnProperty('valueToParams')
      ) {
        // 清空联动的值
        if (isClearValue) form.setFieldValue(field.code, '');
        // 修改 queryParams
        const { valueToParams } = current.cascader[key];
        if (typeof valueToParams === 'string') {
          field.queryParams = {
            ...field.queryParams,
            [valueToParams]: form.getFieldValue(current.code),
          };
        } else {
          // 支持格式化 valueToParams
          field.queryParams = {
            ...field.queryParams,
            [valueToParams.code]: valueToParams.formatValue(
              form.getFieldValue(current.code),
            ),
          };
        }
        // 修改 queryParams 后，强制刷新
        forceUpdate = true;
      }
    }
  }
  return forceUpdate ? fields.slice() : fields;
};

// 联动禁用
const valueToDisabled = (fields, form) => {
  const setFieldDisabled = ({ code, disabled }) => {
    return fields.map((field) => {
      if (field.code === code) {
        field.disabled = disabled;
      }
      return field;
    });
  };
  let disabled = false;
  for (let field of fields) {
    for (let key in field.cascader) {
      if (field.cascader[key]?.hasOwnProperty('valueToDisabled')) {
        disabled = disabled || !form.getFieldValue(field.code);
        fields = setFieldDisabled({ code: key, disabled });
      }
    }
  }
  return fields;
};

// 包装组件
const PackComponet = ({ field, form, onChange, children, ...restProps }) => {
  // 联动清空
  const hasValue = (value) => {
    return Array.isArray(value) ? value.length > 0 : !!value;
  };
  const handleChange = (e) => {
    if (!field.cascader) {
      onChange(e?.target?.value || e);
      return;
    }
    for (let key in field.cascader) {
      // 关联显示弹窗
      if (
        hasValue(form.getFieldValue(key)) &&
        field.cascader[key].hasOwnProperty('valueToClearValue')
      ) {
        Modal.confirm({
          title: field.cascader[key]?.valueToClearValue,
          onOk() {
            onChange(e?.target?.value || e);
          },
        });
        return;
      }
    }
    // 说明值全部为空，直接切换
    onChange(e?.target?.value || e);
  };
  return React.cloneElement(children, {
    ...field,
    ...restProps,
    onChange: handleChange,
  });
};

// 渲染单项
const renderField = ({ field, fields, setFields, form, onChange }) => {
  if (
    ['select', 'date', 'dateRange', 'radio', 'textarea', 'number'].includes(
      field.type,
    ) &&
    field.readOnly
  ) {
    return form.getFieldValue(field.code);
  }

  const handleChange = async (current) => {
    let newFields = fields;
    // 联动逻辑
    if (current.cascader) {
      // 联动清空
      valueToClearValue(current, form);
      // 联动修改参数
      newFields = valueToParams(newFields, current, form, true);
      // 联动禁用
      newFields = valueToDisabled(newFields, form);
      setFields(newFields);
    }
    if (typeof onChange === 'function') {
      newFields = newFields.map((field) => {
        // 更新值
        field.value = form.getFieldValue(field.code);
        return field;
      });
      onChange({ field: current, fields: newFields });
    }
  };

  let component;
  switch (field.type) {
    case 'select':
      component = <Select allowClear />;
      break;
    case 'date':
      component = <DatePicker />;
      break;
    case 'dateRange':
      component = <DatePicker.RangePicker />;
      break;
    case 'radio':
      component = <Radio.Group />;
      break;
    case 'textarea':
      component = <Input.TextArea />;
      break;
    case 'number':
      component = <InputNumber />;
      break;
    case 'photo':
      component = <Image />;
      break;
    default:
      component = <Input allowClear />;
      break;
  }

  return (
    <PackComponet
      field={field}
      form={form}
      onChange={(value) => {
        handleChange({ ...field, value });
      }}
    >
      {field.render ?? component}
    </PackComponet>
  );
};

// 自定义字段
const Fields = ({ fields, setFields, form, ...restProps }) => {
  return fields.map((field) => (
    <Form.Item
      // value={field.value}
      key={field.code}
      label={field.label}
      name={field.code}
      rules={[
        {
          required: field.required,
          message: field.message,
        },
      ]}
    >
      {renderField({
        field,
        fields,
        setFields,
        form,
        ...restProps,
      })}
    </Form.Item>
  ));
};

export default forwardRef(({ data, noForm, formProps, ...restProps }, ref) => {
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    updateFields(data);
  }, [data]);

  // 更新字段
  const updateFields = async (fields) => {
    let forceUpdate = false;
    let newFields = fields;
    for (let field of fields) {
      // 初始化值
      form.setFieldValue(field.code, field.value);
      // 初始化 readOnly
      if (restProps.readOnly !== undefined) {
        field.readOnly = restProps.readOnly;
        forceUpdate = true;
      }
      // 联动修改参数
      newFields = valueToParams(newFields, field, form, false);
      // 联动禁用
      newFields = valueToDisabled(newFields, form);
    }
    newFields = forceUpdate ? structuredClone(newFields) : newFields;
    setFields(newFields);
  };

  useImperativeHandle(ref, () => {
    return {
      form,
      // 设值
      setFieldsValue(values) {
        form.setFieldsValue(values);
      },
      // 取值
      async getFieldsValue() {
        try {
          const values = await form.validateFields();
          return values;
        } catch (error) {
          return error.errorFields[0].errors[0];
        }
      },
      // 重置
      resetFieldsValue(keys) {
        form.resetFields(keys);
      },
      // 设置属性
      setFieldsAttribute(attributes) {
        const newFields = fields.map((field) => {
          for (let key in attributes) {
            if (field.code === key && attributes[key]) {
              field = {
                ...field,
                ...attributes[key],
              };
            }
          }
          return field;
        });
        setFields(newFields);
      },
    };
  });

  const contentDOM = (
    <Fields fields={fields} setFields={setFields} form={form} {...restProps} />
  );
  if (noForm) {
    return contentDOM;
  }

  return (
    <Form
      form={form}
      {...{
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 18,
        },
        ...formProps,
      }}
    >
      {contentDOM}
    </Form>
  );
});
