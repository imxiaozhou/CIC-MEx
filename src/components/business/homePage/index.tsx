import React from 'react';
import { Flex, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import CarouseList from './components/CarouseList';
import PopularMaterials from './components/PopularMaterials';

const { Option } = Select;
const HomePage: React.FC = () => {
  return (
    <>
      <Flex justify="center">
        <Input
          style={{
            width: '50%',
            border: '1px solid #00A57D'
          }}
          placeholder="Find Materials"
          prefix={<SearchOutlined />}
          suffix={
            <>
              <div
                style={{
                  borderLeft: '1px solid #ccc',
                  height: '20px',
                  margin: '7px 8px'
                }}
              />
              <Select defaultValue="All" style={{ width: 80 }}>
                <Option value="all">All</Option>
                <Option value="Some">Some</Option>
              </Select>
            </>
          }
        />
      </Flex>
      <div
        style={{
          width: '80%',
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <CarouseList />
      </div>

      <PopularMaterials />
    </>
  );
};

export default HomePage;
