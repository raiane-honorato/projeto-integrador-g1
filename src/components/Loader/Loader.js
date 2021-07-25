import Lottie from 'react-lottie';

import animationData from '../../img/loading.json';

export default () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

  return <Lottie width={400} height={400} options={defaultOptions} />

};