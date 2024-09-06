import { omit } from 'lodash-es';
import { type ActionType, ProTable } from '@ant-design/pro-components';
import { Typography, theme, type TableProps } from 'antd';
import classNames from 'classnames';
import type { CustomProTableProps } from '@/types/proComponents';
import { pagination, tableSearch } from '@/config/common';
import Icon from '@/components/Icons';

type OnChange = NonNullable<TableProps<any>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const { Title } = Typography;
const { useToken } = theme;

const CustomProTable = (props: CustomProTableProps) => {
  const actionRef = props.actionRef ?? (useRef<ActionType>() as any);
  const { searchTitle, cardBordered } = props;
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const { token } = useToken();

  const handleChange: OnChange = (pagination, filters, sorter: any) => {
    setSortedInfo(
      Object.assign(sorter, {
        order: sorter?.order ?? undefined
      }) as Sorts
    );
  };

  const handleReset = () => {
    // 重置columns显示sort
    setSortedInfo({});
    // 重置接口sort参数
    actionRef?.current.reloadAndRest!();
  };
  return (
    <>
      {searchTitle && (
        <Title
          level={5}
          className={classNames(
            'customProTableTitle',
            cardBordered === false ? 'customProTableBorderNo' : ''
          )}
          style={{
            background: token.colorBgContainer,
            borderColor: token.colorSplit,
            marginBottom: 0
          }}
        >
          {searchTitle}
        </Title>
      )}
      <ProTable
        search={{
          ...tableSearch,
          searchText: $t(tableSearch.searchText as string)
        }}
        pagination={pagination}
        rowSelection={{}}
        scroll={{ x: 'max-content' }}
        cardBordered
        onChange={handleChange}
        {...omit(props, ['columns', 'actionRef', 'searchTitle'])}
        columns={props.columns?.map((item) => {
          return Object.assign(item, {
            sortOrder:
              sortedInfo.columnKey === item.dataIndex ? sortedInfo.order : null
          });
        })}
        className={classNames(
          props?.className,
          searchTitle ? 'customProTableSearchTitle' : ''
        )}
        onReset={handleReset}
        actionRef={actionRef}
        options={{
          ...props?.options,
          setting: {
            settingIcon: <Icon type="ControlOutlined" />
          }
        }}
      />
    </>
  );
};

export default CustomProTable;
