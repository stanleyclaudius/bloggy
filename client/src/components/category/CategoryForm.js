import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from './../../redux/actions/categoryActions';

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  
  const handleChange = e => {
    const {name, value} = e.target;
    setCategoryData({...categoryData, [name]: value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await dispatch(createCategory(categoryData, auth.token));
    setLoading(false);
    setCategoryData({name: '', description: ''});
  }

  return (
    <form className='categoryForm' onSubmit={handleSubmit}>
      <div className="inputGroup">
        <label htmlFor="name">Category Name</label>
        <input type="text" name="name" id="name" value={categoryData.name} onChange={handleChange} autoComplete='off' />
      </div>
      <div className="inputGroup">
        <label htmlFor="description">Category Description</label>
        <input type="text" name="description" id="description" value={categoryData.description} onChange={handleChange} autoComplete='off' />
      </div>
      <button
        className={loading && 'disabled'}
        type="submit"
        disabled={loading ? true : false}
      >
        {loading ? 'Loading ...' : 'Submit'}
      </button>
    </form>
  );
}

export default CategoryForm;