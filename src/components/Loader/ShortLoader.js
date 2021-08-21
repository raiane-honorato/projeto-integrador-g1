import Lottie from 'react-lottie';

import animationData from '../../img/loading.json';

const ShortLoader = ({size}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};
    if(!size) {size = 100}
    return <Lottie width={size} height={size} options={defaultOptions}/>
  
   
};

export default ShortLoader;