import useInitSetting from '@/hooks/useInitSetting';

import { ProForm } from '@ant-design/pro-components';
import { Col, FormInstance, Radio, Space, type ColProps } from 'antd';
import styled from 'styled-components';
import lightImg from '@/assets/img/light.png';
import realDarkImg from '@/assets/img/realDark.png';

interface Props {
  form: FormInstance;
  colProps?: ColProps;
  setIsValueChange: (b: boolean) => void;
  [key: string]: any;
}

const HoverDiv = styled.div<any>`
  width: 169px;
  height: 118px;
  cursor: pointer;
  border: 1px solid transparent;
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 6px;
  overflow: hidden;
  &:hover {
    border: 1px solid ${(props) => props.$colorPrimary};
    border-radius: 6px;
  }
`;

const MyProFormRadioGroup = (props: Props) => {
  const { form, setIsValueChange, colProps = {}, ...ProFormItemProps } = props;

  const { colorPrimary } = useInitSetting();

  const handleClick = (v: string) => {
    form.setFieldValue(ProFormItemProps.name, v);
    setIsValueChange(false);
  };

  return (
    <Col {...colProps}>
      <ProForm.Item {...ProFormItemProps}>
        <Radio.Group {...ProFormItemProps.fieldProps}>
          <Space>
            <Space direction="vertical" align="center">
              <HoverDiv
                $colorPrimary={colorPrimary}
                onClick={() => {
                  handleClick('light');
                }}
                image={lightImg}
              />
              <Radio value="light">{$t('Light')}</Radio>
            </Space>
            <Space direction="vertical" align="center">
              <HoverDiv
                $colorPrimary={colorPrimary}
                onClick={() => {
                  handleClick('realDark');
                }}
                image={realDarkImg}
              />
              <Radio value="realDark">{$t('Dark')}</Radio>
            </Space>
          </Space>
        </Radio.Group>
      </ProForm.Item>
    </Col>
  );
};

export default MyProFormRadioGroup;
