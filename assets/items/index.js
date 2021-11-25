import chickenBurger from './chickenBurger.png'
import cheesePizza from './cheesePizza.png'
import sushiMakizushi from './sushiMakizushi.png'

const images = {
  chickenBurger,
  cheesePizza,
  sushiMakizushi
};

function getImageItemByKey(key) {
  return images[key];
}

export default getImageItemByKey