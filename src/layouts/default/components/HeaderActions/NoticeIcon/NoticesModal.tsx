import {
  Avatar,
  Badge,
  Flex,
  Input,
  Modal,
  ModalProps,
  Space,
  Typography
} from 'antd';
import Icon from '@/components/Icons';
import { modalProps, pagination } from '@/config/common';
import { ProList } from '@ant-design/pro-components';
import {
  getNotificationsList,
  setNotificationsIsRead
} from '@/services/layouts';
import NoticesItem from './NoticesItem';
import { iconItems } from './type';
import './index.less';
import { debounce } from 'lodash-es';
import useDayjsTz from '@/hooks/useTimeZoneFormat';

const { Title, Text } = Typography;

type CustomModalProps = ModalProps & {
  onCancel: () => void;
  currentItemData?: NotificationsAPI.NotificationsListResponse;
  isViewAll: boolean | undefined;
  onIsViewAllChange: (value: boolean) => void;
  onItemDataChange: (value: NotificationsAPI.NotificationsListResponse) => void;
  currentPage: number;
  pageSize: number;
  onSetUnReadNum: (value: number) => void;
  onSetCurrentPage: (value: number) => void;
  onSetPageSize: (value: number) => void;
};

const NoticesModal: React.FC<CustomModalProps> = (props) => {
  const {
    currentItemData,
    isViewAll,
    onIsViewAllChange,
    onItemDataChange,
    onSetUnReadNum,
    currentPage,
    onSetCurrentPage,
    pageSize,
    onSetPageSize
  } = props;
  const userInfo = useAppSelector(selectUserInfo);
  const dateFormat = useAppSelector(selectOriginDateFormat);
  const actionRef = useRef<any>();
  const [keyword, setKeyword] = useState<string>('');

  const { dayjsTZReplyDateFormat } = useDayjsTz();

  const getDataSource = async (params: any) => {
    onSetCurrentPage(params.current);
    onSetPageSize(params.pageSize);
    const result: any = await getNotificationsList({
      userId: userInfo?.userId,
      keyword,
      pageNum: params.current,
      pageSize: params.pageSize
    });
    return {
      data: result.data,
      total: result.total
    };
  };

  const handleSearch = useCallback(
    debounce(() => {
      actionRef?.current?.reload();
    }, 800),
    []
  );

  useEffect(() => {
    handleSearch();
  }, [keyword, handleSearch]);

  const getUnReadNotificationsCount = async () => {
    const result: any = await getNotificationsList({
      userId: userInfo?.userId,
      pageNum: 1,
      pageSize: 5
    });

    onSetUnReadNum(result?.unReadNum);
  };

  const onItemClick = async (record: any) => {
    onIsViewAllChange(false);
    onItemDataChange(record);
    await setNotificationsIsRead({
      userId: userInfo?.userId,
      ids: [record.id],
      isRead: 'Y'
    });

    // 更新未读通知数量
    getUnReadNotificationsCount();
  };

  const modalCancel = () => {
    onIsViewAllChange(true);
    props.onCancel?.();
    setKeyword('');
  };

  return (
    <Modal
      {...modalProps}
      {...props}
      className="notices-modal"
      title={
        <Title level={4} style={{ textAlign: 'center' }}>
          {$t('Notifications')}
        </Title>
      }
      footer={false}
      width={992}
      onCancel={modalCancel}
    >
      <Space direction="vertical" className="notification-container">
        {isViewAll ? (
          <>
            <Flex justify="center" vertical align="center">
              <Input
                allowClear
                className="toolbar_font"
                placeholder={$t('Search')}
                prefix={<Icon type="SearchOutlined" />}
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </Flex>
            <ProList
              rowKey="id"
              rowClassName="notification-item"
              request={getDataSource}
              pagination={{
                ...pagination,
                current: currentPage,
                pageSize: pageSize,
                pageSizeOptions: [5, 10, 20, 50, 100]
              }}
              actionRef={actionRef}
              showActions="hover"
              onRow={(record) => {
                return {
                  onClick: () => onItemClick(record)
                };
              }}
              metas={{
                title: {
                  dataIndex: 'title',
                  render(text, row: any) {
                    return (
                      <>
                        <Text>{row.title}</Text>
                        {row.isRead === 'N' && (
                          <Badge
                            color="red"
                            dot
                            style={{ position: 'absolute', right: 0 }}
                            styles={{ indicator: { width: 8, height: 8 } }}
                          />
                        )}
                      </>
                    );
                  }
                },
                avatar: {
                  dataIndex: 'icon',
                  render(_, row: any) {
                    let currentIcon = iconItems.find(
                      (item) => item.type === row.notificationTemplateType
                    );
                    return (
                      <Avatar
                        size={24}
                        draggable={false}
                        gap={0}
                        style={{
                          background: currentIcon?.background,
                          fontSize: 16,
                          lineHeight: '20px'
                        }}
                        icon={
                          <Icon
                            type={currentIcon?.icon}
                            style={{ color: currentIcon?.color }}
                          />
                        }
                      />
                    );
                  },
                  search: false
                },
                description: {
                  dataIndex: 'subTitle',
                  search: false,
                  render: (text, row: any) => {
                    return (
                      <Flex justify="space-between">
                        <Text ellipsis style={{ color: '#666869' }}>
                          {row.content}
                        </Text>
                        <Text style={{ minWidth: 150, marginLeft: 30 }}>
                          {dayjsTZReplyDateFormat(row.date, dateFormat)}
                        </Text>
                      </Flex>
                    );
                  }
                }
              }}
            />
          </>
        ) : (
          <NoticesItem
            data={currentItemData}
            onBack={() => onIsViewAllChange(true)}
          />
        )}
      </Space>
    </Modal>
  );
};

export default NoticesModal;
