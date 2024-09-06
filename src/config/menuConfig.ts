export interface MenuItem {
  label: string;
  key: string;
  icon?: string;
  children?: MenuItem[];
  hidden?: boolean;
  layout?: string;
}

export const menus: MenuItem[] = [
  {
    label: 'Login',
    key: '/login',
  },
  {
    label: 'Home',
    key: '/home',
  },
  {
    label: 'MaterialExchange',
    key: '/material-exchange',
  },
  {
    label: 'Dashboard',
    key: '/dashboard',
  },
  {
    label: 'MyListings',
    key: '/my-listings',
  },
  {
    label: 'MyWatchlist',
    key: '/my-watchlist',
    hidden: true,
  },
  {
    label: 'FAQs',
    key: '/faqs',
    hidden: true,
    layout: 'content'
  },
];
