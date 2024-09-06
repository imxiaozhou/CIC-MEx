import { CustomIcon } from '@/components/proComponents';
import { Button, Tooltip } from 'antd';

export default function ZoomInAndOut() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(selectCollapsed);
  const siderWidth = useAppSelector(selectSiderWidth);
  const { isShowContent } = useAppSelector(selectEmailSelected);
  const proportion = window.innerWidth / screen.width;
  const { isShowIcon } = useMemo(() => {
    const isMinimized = collapsed && siderWidth === 0;
    return {
      isShowIcon: isMinimized ? 'Minimize' : 'Maximize'
    };
  }, [collapsed, siderWidth]);

  const isShowZoomInAndOut = useMemo(() => {
    return (
      siderWidth === '88vw' ||
      (!isShowContent && siderWidth === 0 && proportion < 0.67)
    );
  }, [siderWidth, isShowContent, proportion]);

  const handleEmailZoomInAndOut = (): void => {
    const newCollapsed = !(collapsed && siderWidth === 0);
    const newSiderWidth = newCollapsed ? 0 : 400;

    dispatch(setCollapsed(newCollapsed));
    dispatch(setSiderWidth(newSiderWidth));
    dispatch(setIsZoomInAndOut(true));
  };

  if (isShowZoomInAndOut) {
    return null;
  }

  return (
    <Tooltip
      title={collapsed && siderWidth === 0 ? $t('Zoom out') : $t('Enlarge')}
    >
      <Button
        size="large"
        type="text"
        icon={<CustomIcon name={isShowIcon} />}
        onClick={handleEmailZoomInAndOut}
        style={{ display: 'flex' }}
        className="toolbar-item-hover"
      />
    </Tooltip>
  );
}
