import React from 'react';
import { Flex, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const MaterialExchangePage: React.FC = () => {
  return (
    <Flex justify="center">
      <Input
        style={{
          width: '50%',
          border: '1px solid #00A57D',
          height: '50px',
          marginTop: '20px'
        }}
        placeholder="Rebar"
        prefix={<SearchOutlined />}
      />
    </Flex>
  );
};

export default MaterialExchangePage;
