import type { CSSProperties } from 'react';
import {
  SettingOutlined,
  LoadingOutlined,
  CheckOutlined,
  EyeOutlined,
  TranslationOutlined,
  LeftOutlined,
  WarningFilled,
  CloseOutlined,
  SearchOutlined,
  ControlOutlined,
  DeleteOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';

const iconType = {
  SettingOutlined,
  LoadingOutlined,
  CheckOutlined,
  EyeOutlined,
  TranslationOutlined,
  LeftOutlined,
  WarningFilled,
  CloseOutlined,
  SearchOutlined,
  ControlOutlined,
  DeleteOutlined,
  CloudUploadOutlined
};

Object.assign(Icon, iconType);

export type IconType = keyof typeof iconType;

interface IconProps {
  type?: IconType;
  className?: string;
  style?: CSSProperties;
  rotate?: number;
  spin?: boolean;
  twoToneColor?: string; // (十六进制颜色)
}

export default function Icon({ type, ...iconProps }: Readonly<IconProps>) {
  if (!type) {
    return null;
  }
  const IcomComp = iconType[type];
  return <IcomComp {...iconProps} />;
}
