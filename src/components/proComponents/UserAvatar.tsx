import { Avatar, Image } from 'antd';
import { CSSProperties } from 'react';
import { hashToBgColor, hashToColor } from '@/utils';

const UserAvatar = ({
  style,
  size,
  user = { profileImageUrl: null, profileImageDisplayName: '' }
}: {
  style?: CSSProperties;
  size?: number;
  user?: {
    profileImageUrl: string | null;
    profileImageDisplayName: string;
  };
}) => {
  const { profileImageUrl, profileImageDisplayName } = user;

  // true - 展示用户头像   false - 展示用户displayName
  const [showImg, setShowImg] = useState<boolean>(!!profileImageUrl);
  const userProfileUpdateStatus = useAppSelector(selectUserProfileUpdateStatus);
  useEffect(() => {
    setShowImg(true);
  }, [userProfileUpdateStatus]);

  useEffect(() => {
    if (profileImageUrl && profileImageUrl?.length > 0) {
      setShowImg(true);
    } else {
      setShowImg(false);
    }
  }, [profileImageUrl]);

  const styles = size
    ? {
        width: size,
        height: size
      }
    : {};
  function generateRandomHash() {
    const array = new Uint32Array(10); // 创建一个10个元素的Uint32Array
    window.crypto.getRandomValues(array); // 用随机值填充数组
    const hash = array.toString(); // 将数组转换为字符串
    return btoa(hash); // 使用base-64编码来生成一个字符串哈希值
  }

  return showImg && profileImageUrl ? (
    <Avatar
      src={
        <Image
          src={profileImageUrl}
          alt="avatar"
          preview={false}
          key={`${generateRandomHash()}`}
          onError={() => {
            setShowImg(false);
          }}
        />
      }
      style={styles}
    />
  ) : (
    <Avatar
      style={{
        backgroundColor: hashToBgColor(profileImageDisplayName),
        color: hashToColor(profileImageDisplayName),
        ...style,
        ...styles
      }}
      icon={profileImageDisplayName}
    />
  );
};

export default UserAvatar;
