import { useEffect, useState, useRef } from 'react';
import { Select } from 'antd';
import axios from 'axios';

export default ({ url, queryParams, enableAutoValue, ...restProps  }) => {
  const [options, setOptions] = useState(restProps.options);
  const handler = useRef()

  useEffect(() => {
    handler.current = restProps.onChange
  }, [restProps.onChange])

  useEffect(() => {
    if (url) {
      axios.post(url, queryParams).then((result) => {
        if (result.code === '1') {
          const options = result.data;
          setOptions(result.data);
          if (Array.isArray(options) && options.length === 1 && enableAutoValue === 'onlyOne') {
            handler.current?.(options[0].value);
          }
        }
      });
    } else {
      if (Array.isArray(options) && options.length === 1 && enableAutoValue === 'onlyOne') {
        handler.current?.(options[0].value);
      }
    }
  }, [url, queryParams, enableAutoValue])

  return (
    <Select
      {...restProps}
      options={options}
    />
  );
};
