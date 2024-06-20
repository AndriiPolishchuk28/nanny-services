const sort = (array, filter) => {
  switch (filter) {
    case 'ascName':
      return array.sort((a, b) => a.name.localeCompare(b.name));
    case 'descName':
      return array.sort((a, b) => b.name.localeCompare(a.name));
    case 'cheaper10':
      return array
        .filter((elem) => elem.price_per_hour < 10)
        .sort((a, b) => b.price_per_hour - a.price_per_hour);
    case 'greater10':
      return array
        .filter((elem) => elem.price_per_hour > 10)
        .sort((a, b) => a.price_per_hour - b.price_per_hour);
    case 'popular':
      return array.sort((a, b) => b.rating - a.rating);
    case 'notpopular':
      return array.sort((a, b) => a.rating - b.rating);
    case 'all':
      return array;
    default:
      return array;
  }
};

export default sort;
