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
    key: '/login'
  },
  {
    label: 'Home',
    key: '/'
  },
  {
    label: 'MaterialExchange',
    key: '/material-exchange',
    layout: 'content'
  },
  {
    label: 'Dashboard',
    key: '/dashboard',
    layout: 'content'
  },
  {
    label: 'MyListings',
    key: '/my-listings',
    layout: 'content'
  },
  {
    label: 'MyWatchlist',
    key: '/my-watchlist',
    layout: 'content'
  },
  {
    label: 'FAQs',
    key: '/faqs',
    layout: 'content'
  }
];
