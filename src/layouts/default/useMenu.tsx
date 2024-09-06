import {
  useNavigate,
  useLocation,
  matchRoutes,
  matchPath
} from 'react-router-dom';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { routes } from '@/router';
import { menus, type MenuItem } from '@/config/menuConfig';
import { useSetState } from 'ahooks';
import { flatArrTree } from '@/utils';
import { CustomIcon, FontSize } from '@/components/proComponents';
import { Flex, Typography } from 'antd';

const { Text } = Typography;

interface State {
  openKeys?: string[];
  selectKey?: string;
}

export default function useMenu(folder: LayoutAPI.StarItem[]) {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useSetState<State>({
    openKeys: [],
    selectKey: '/'
  });

  const updateMenuState = ({ openKeys = [], selectKey }: State) => {
    // Fix the issue of menu not being highlighted when there is a hidden attribute in multi-level sub routes
    const arr = flatArrTree(menus, 'children');
    let sKey = selectKey;
    let opKeys = openKeys;
    const noHiddenKeys = opKeys.filter((i) => {
      const target = arr.filter((item: MenuItem) => item.key === i);
      return !target?.[0]?.hidden;
    });

    const curMenuItemArr = arr.filter((i: MenuItem) => i.key === sKey);
    // last child menuitem has hidden = true
    if (
      curMenuItemArr.length > 0 &&
      curMenuItemArr[0]?.hidden &&
      opKeys.length > 0 &&
      noHiddenKeys.length === opKeys.length
    ) {
      sKey = opKeys[0] || selectKey;
    } else if (noHiddenKeys.length !== opKeys.length) {
      // last child menuitem has not hidden attr && parent menuitem has hidden attr
      opKeys = noHiddenKeys;
      sKey = opKeys?.[0] || selectKey;
    }

    setState((prevState) => ({
      openKeys: opKeys.length > 0 ? opKeys : prevState.openKeys,
      selectKey: sKey
    }));
  };

  // Calculate the menu status at initialization
  useEffect(() => {
    if (menus.length === 0) {
      return;
    }
    const menuState = mapRouteToMenuStatus(menus, location.pathname) || {};
    updateMenuState(menuState as State);
  }, [location]);

  const onOpenChange = (keys: string[]) => {
    const rootKeys = menus
      .filter((item) => item.children && item.children.length > 0)
      .map((item) => item.key);

    const latestOpenKey = keys.length > 0 ? keys[keys.length - 1] : undefined;

    if (latestOpenKey && rootKeys.includes(latestOpenKey)) {
      // 走到这里说明打开新的根菜单
      setState({ openKeys: [latestOpenKey] });
    } else {
      // 走到这里说明两种情况：
      // 1. onchange keys 是空的，直接赋值。
      // 2. 打开的是子菜单，也是直接赋值。
      setState({ openKeys: keys });
    }
  };

  return {
    selectKey: state.selectKey,
    onSelectKey: (key: string) => {
      if (
        key === state.selectKey &&
        key !== state.openKeys?.[0] // &&
        // 过滤 inbox url 带有msgId参数的情况下点击菜单, 重置url的逻辑
        // !location.search.match('msgId=')
      )
        return;
      setState({ selectKey: key });
      navigate(key);
    },
    openKeys: state.openKeys,
    onOpenKeys: onOpenChange,
    items: generateMenuItems(menus, folder)
  };
}

/**
 * Generate Menu component data
 * @param {MenuItem[]} data
 * @returns
 */
const generateMenuItems = (
  data: MenuItem[],
  folder: LayoutAPI.StarItem[]
): ItemType[] => {
  const menu: ItemType[] = [];
  data.forEach((item) => {
    if (item?.hidden) {
      return false;
    }
    let children;
    if (item.children) {
      children = generateMenuItems(item.children, folder);
    }

    const unreadInfo = folder.filter((i) => {
      if (i.name === 'Spam' && item.label === 'Junk') {
        return true;
      } else {
        return i.name === item.label;
      }
    })?.[0];

    const items = {
      key: item.key,
      label: (
        <Flex align="center" justify="space-between">
          <FontSize size="s">{$t(item.label)}</FontSize>
          <Text style={{ minWidth: 24, textAlign: 'center' }}>
            {Number(unreadInfo?.total) || ''}
          </Text>
        </Flex>
      ),
      icon: item?.icon ? (
        <CustomIcon
          name={item.icon}
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      ) : null,
      title: $t(item.label)
    };

    if (children && children.length > 0) {
      Object.assign(items, {
        children
      });
    }

    menu.push(items as ItemType);
  });
  return menu;
};

/**
 * Map route to menu status
 * @returns
 */
export const mapRouteToMenuStatus = (menus: MenuItem[], pathname: string) => {
  const selectKey = computeMenuStatusSelectKey(menus, pathname);
  if (!selectKey) return;
  const openKeys = computeMenuStatusOpenKeys(menus, selectKey);
  return { selectKey, openKeys };
};

/**
 * Compute the selectKey value
 */
function computeMenuStatusSelectKey(menus: MenuItem[], path: string) {
  if (menus.length === 0) return;
  // First step: Check whether the current route is a menu route.
  const menuKeys: string[] = flatArrTree(menus, 'children')
    .map((item: any) => item.key)
    .filter(Boolean);
  if (menuKeys.length === 0) return;
  let selectKey = menuKeys.find((item) => item === path);
  if (selectKey) return selectKey;
  // Second step: Whether menuKey is configured in the current route configuration.
  const currentPageMatchRoutes = matchRoutes(routes, path);
  const currentRoute = currentPageMatchRoutes?.at(-1)?.route;
  if (!currentRoute) return;
  if (currentRoute?.menuKey) return currentRoute.menuKey;
  // Third step: Check whether the current route is a dynamic route, obtain the matching mode, and check whether there is a key successfully matched in the menu.
  return menuKeys.find((item) => matchPath(currentRoute?.path as string, item));
}

/**
 * Compute the openKeys value
 */
function computeMenuStatusOpenKeys(menus: MenuItem[], selectKey: string) {
  const newMenus: (MenuItem & { _parent_: string })[] = flatArrTree(
    menus,
    'children'
  );
  let openKeys: string[] = [];
  const generateOpenKeys = (key: string, isUseValue: boolean) => {
    const item = newMenus.find((item) => item.key === key);
    if (!item) {
      return;
    }
    isUseValue && openKeys.push(item.key);
    if (item?._parent_) {
      generateOpenKeys(item._parent_, true);
    }
  };
  generateOpenKeys(selectKey, false);
  return openKeys;
}
