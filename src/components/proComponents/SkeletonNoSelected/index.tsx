import { cardProps } from '@/config/common';
import { Card, Flex, Skeleton, Typography } from 'antd';
import './index.less';

const { Text } = Typography;

const SkeletonNoSelected = () => {
  return (
    <Card
      {...cardProps}
      className="skeleton_no_select"
      styles={{ body: { height: '100%' } }}
    >
      <Flex
        justify="center"
        align="center"
        vertical
        className="skeleton_no_select_flex"
      >
        <Skeleton.Node active className="skeleton_node" />
        {/* <Text>
            <></>
          </Text>
        </Skeleton.Node> */}
        <Skeleton.Input active className="skeleton_input1" />
        <Skeleton.Input active className="skeleton_input2" />
      </Flex>
    </Card>
  );
};
export default SkeletonNoSelected;
