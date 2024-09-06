import { Flex, Space } from 'antd';

interface Props {
  isContentLayout: boolean;
  isDetailPath: boolean;
  isNewWindow: boolean;
}

export default function LayoutHeader() {


  return (
    <Flex
      align="center"
      style={{
        padding: '0 20px',
        margin: '10px 0'
      }}
    >
   NavHeader
    </Flex>
  );
}
