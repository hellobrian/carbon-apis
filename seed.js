const icons = require('carbon-icons');
const axios = require('axios');

const iconsNewData = icons.map(icon => {
  return {
    name: icon.name,
    tags: [],
    viewBox: icon.viewBox,
    width: icon.width,
    height: icon.height,
    svgData: {
      circles: icon.svgData.circles,
      paths: icon.svgData.paths
    }
  };
});

iconsNewData.forEach((icon, index) => {
  if (index < 10) {
    axios
      .post('http://localhost:8080/api/carbon-icons/', icon)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
});

// console.log(JSON.stringify(iconsWithTags, null, 2));
// console.log(JSON.stringify(icons, null, 2));
