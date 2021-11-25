import burger from './burger.png'
import pizza from './pizza.png'
import salad from './salad.png'

const images = {
  burger,
  pizza,
  salad
};

function getImageByKey(key) {
  return images[key];
}

export default getImageByKey