import Lottie from 'react-lottie';

import animationData from '../../img/loading.json';

const ShortLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};
  return <Lottie width={100} height={100} options={defaultOptions} />
};

export default ShortLoader;