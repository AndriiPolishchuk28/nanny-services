const sort = (array, filter) => {
  switch (filter) {
    case 'ascName':
      array.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'descName':
      array.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }
  return array;
};

export default sort;
