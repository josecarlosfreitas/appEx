import burger from './burger.png'
import pizza from './pizza.png'

const images = {
  burger,
  pizza,
};

function getImageByKey(key) {
  return images[key];
}

export default getImageByKey