import { ResultPage } from '@/components/business';
import App404Img from '@/assets/img/404.png';

const NotFound = () => {
  return (
    <ResultPage
      img={App404Img}
      title="Page Not Found"
      subTitle="Unable to access Secure Messaging Application."
    />
  );
};

export default NotFound;
