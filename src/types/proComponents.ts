import type {
  ModalProps,
  SpaceProps,
  TagProps,
  ButtonProps,
  FormInstance,
  SelectProps
} from 'antd';
import type { ProTableProps } from '@ant-design/pro-components';

export type CustomModalProps = ModalProps & {
  type: 'info' | 'warning';
};

export interface TagMultipleProps {
  size?: SpaceProps['size'];
  // disabled?: boolean;
  items: LabelValue[];
  onChange: (tags: LabelValue[]) => void;
}

export type TagStatusProps = TagProps & {
  status: string;
};

export type TagColorProps = TagProps & {
  color: string;
  fontColor: string;
};

export interface CustomProTableProps
  extends ProTableProps<any, Record<string, any>> {
  searchTitle?: React.ReactNode;
}

export type CustomFormButtonProps = ButtonProps & {
  title?: React.ReactNode;
  okText?: string;
  onConfirm?: () => Promise<void> | void;
  formInstance?: FormInstance;
};

export type SelectSearchableProps = SelectProps & {
  url?: string;
  mode?: 'multiple';
  onValueChange: (newValue: string[]) => void; // newValue value值组成的数组，如果是单选则在调用方取newValue[0]，多选则直接在调用方取newValue
};

export interface CustomPrintButtonProps {
  handlePrintInCSV: () => void;
  handlePrintInPDF: () => void;
}

export type SystemMessageTag =
  | 'Inbox'
  | 'Draft'
  | 'Sent'
  | 'Junk'
  | 'Deleted'
  | 'Tags';
