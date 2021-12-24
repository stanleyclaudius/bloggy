import Tag from './Tag';

const Filter = ({category, filter, setFilter}) => {
  const handleChooseCategory = cat => {
    setFilter(filter => {
      if (!filter.find(item => item._id === cat._id)) {
        return [...filter, cat];
      } else {
        return filter.filter(item => item._id !== cat._id);
      }
    });
  }

  const handleRemoveCategory = id => {
    setFilter(filter => filter.filter(item => item._id !== id));
  }

  return (
    <div className='filter container'>
      {
        category.map(item => (
          <Tag
            key={item._id}
            name={item.name}
            handleChoose={() => handleChooseCategory(item)}
            handleRemove={() => handleRemoveCategory(item._id)}
          />
        ))
      }
    </div>
  );
}

export default Filter;