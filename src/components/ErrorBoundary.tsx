import { ResultPage } from '@/components/business';
import AppErrorImg from '@/assets/img/app-error.png';

const NotFound = () => {
  return (
    <ResultPage
      img={AppErrorImg}
      title="Application Error"
      subTitle="Unable to access Secure Messaging Application. Please try later."
    />
  );
};

export default NotFound;
