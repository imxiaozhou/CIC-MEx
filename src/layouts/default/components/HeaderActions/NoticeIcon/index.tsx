import React, { useState } from 'react';
import { Button, Flex, MenuProps, Typography, Badge, Dropdown } from 'antd';
import NoticesModal from './NoticesModal';
import { DataItem, iconItems } from './type';
import './index.less';
import { CustomIcon } from '@/components/proComponents';

const { Title } = Typography;

const NoticesDropdown: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isViewAll, setIsViewAll] = useState<boolean>();
  const [itemData, setItemData] = useState<any>();
  const [unReadNum, setUnReadNum] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const $t = useTranslations();

  const OpenNotifications = async () => {
    setOpen(true);
    setIsViewAll(true);
    setCurrentPage(1);
    setPageSize(5);
  };

  let items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <Flex
          className="notifications-header"
          justify="space-between"
          align="center"
        >
          <Title level={5} style={{ marginBottom: 0 }}>
            {$t('Notifications')}
          </Title>
          <Button
            type="link"
            onClick={OpenNotifications}
            style={{ paddingRight: 0 }}
          >
            {$t('View All')}
          </Button>
        </Flex>
      )
    }
  ];

  const onIsViewAllChange = (value: boolean) => setIsViewAll(value);
  const onItemDataChange = (value: any) => setItemData(value);
  const onSetUnReadNum = (value: number) => setUnReadNum(value);
  const onSetCurrentPage = (value: number) => setCurrentPage(value);
  const onSetPageSize = (value: number) => setPageSize(value);

  return (
    <>
      <Dropdown
        overlayClassName="notices-dropdown"
        menu={{ items }}
        autoAdjustOverflow
        getPopupContainer={(dom) => dom.parentElement! || document.body}
        placement="bottomRight"
        arrow
        className="notices-container"
        overlayStyle={{ maxWidth: 320, maxHeight: 100 }}
      >
        <Button
          type="text"
          size="large"
          className="toolbar-item-hover"
          icon={
            <Badge
              size="small"
              count={unReadNum}
              offset={[3, 0]}
              style={{ boxShadow: 'none', fontSize: 12, lineHeight: 1 }}
            >
              <CustomIcon name="Bell" />
            </Badge>
          }
        />
      </Dropdown>
      {/* <NoticesModal
        isViewAll={isViewAll}
        currentItemData={itemData}
        open={open}
        onCancel={() => setOpen(false)}
        onIsViewAllChange={onIsViewAllChange}
        onItemDataChange={onItemDataChange}
        onSetUnReadNum={onSetUnReadNum}
        onSetCurrentPage={onSetCurrentPage}
        onSetPageSize={onSetPageSize}
        currentPage={currentPage}
        pageSize={pageSize}
      /> */}
    </>
  );
};

export default NoticesDropdown;
