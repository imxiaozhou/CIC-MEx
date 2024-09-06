import type { BaseQueryFilterProps } from '@ant-design/pro-components';
import type {
  CardProps,
  DrawerProps,
  ModalProps,
  NotificationArgsProps,
  PaginationProps
} from 'antd';

export const pagination: PaginationProps = {
  // position: ['topRight'],
  showSizeChanger: true,
  showTotal: (total: number) => $t('Total (0) items', [total]),
  defaultPageSize: 5
};

export type TableSearch = BaseQueryFilterProps & {
  filterType?: 'query' | 'light';
};

export const tableSearch: TableSearch = {
  layout: 'vertical',
  searchText: 'Search'
};

export const modalProps: ModalProps = {
  destroyOnClose: true,
  maskClosable: false
};

export const drawerProps: DrawerProps = {
  destroyOnClose: true
};

export const notificationProps: Omit<NotificationArgsProps, 'message'> = {
  placement: 'bottom',
  closeIcon: null,
  // duration: 3,
  className: 'custom-notification'
};

export const cardProps: CardProps = {
  bordered: false
};
