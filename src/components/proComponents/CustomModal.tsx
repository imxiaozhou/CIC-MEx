import { modalProps } from '@/config/common';

import type { ModalProps } from 'antd';
import { Flex, Modal, Typography } from 'antd';
import CustomIcon from './CustomIcon';
import './../../assets/css/global.less';

type CustomModalProps = ModalProps & {
  type: 'info' | 'warning' | '';
  subTitle?: string | React.ReactNode;
  content?: React.ReactNode;
  contentStyle?: React.CSSProperties;
};

const { Title, Text } = Typography;

const CustomModal: React.FC<CustomModalProps> = (props) => {
  return (
    <Modal
      {...modalProps}
      {...props}
      style={{ top: '25%', ...props?.style }}
      styles={{
        footer: {
          display: 'flex',
          justifyContent: 'center'
        },

        ...props?.styles
      }}
      maskClosable={props.maskClosable ?? false}
      title=""
      zIndex={props.zIndex ?? 10000}
      classNames={{ footer: props.type === 'warning' ? '' : 'hidden-cancel' }}
    >
      <Flex vertical align="center" gap="middle">
        {props.type === 'warning' ? (
          <CustomIcon
            name="WarningFilled"
            custom="#fff"
            style={{ transform: 'scale(1.50)', cursor: 'default' }}
          />
        ) : null}
        {props.type === 'info' ? (
          <CustomIcon
            name="TickFilled"
            custom="#fff"
            style={{ transform: 'scale(1.50)', cursor: 'default' }}
          />
        ) : null}
        <Flex
          vertical
          align="center"
          gap="middle"
          style={{ padding: '10px 0' }}
        >
          <Title level={4}>{props.title}</Title>
          {props.subTitle && (
            <Title style={{ marginTop: -10 }} level={5}>
              {props.subTitle}
            </Title>
          )}
          {props.content && (
            <Text style={props.contentStyle}>{props.content}</Text>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CustomModal;
