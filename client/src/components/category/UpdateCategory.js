import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from './../../redux/actions/categoryActions';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';

const UpdateCategory = ({category, setCategory}) => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  
  const handleClose = () => {
    setCategoryData({name: '', description: ''});
    setCategory(null);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setCategoryData({...categoryData, [name]: value});
  }

  const handleUpdate = async e => {
    e.preventDefault();
    if (!categoryData.name || !categoryData.description) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please filled every field.'
        }
      });
    }

    if (category.name === categoryData.name && category.description === categoryData.description) {
      handleClose();
      return;
    }
    setLoading(true);
    await dispatch(updateCategory(categoryData, category._id, auth.token));
    setLoading(false);
    handleClose();
  }

  useEffect(() => {
    if (!category) return;
    setCategoryData({
      name: category.name,
      description: category.description
    });
  }, [category]);

  return (
    <div className={`updateCategory ${category && 'active'}`}>
      <div className={`updateCategory__box ${category && 'active'}`}>
        <div className="updateCategory__header">
          Edit Category
          <AiOutlineClose onClick={handleClose} />
        </div>
        <div className="updateCategory__content">
          <form onSubmit={handleUpdate}>
            <div className="inputGroup">
              <label htmlFor="name">Category Name</label>
              <input type="text" name="name" id="name" value={categoryData.name} onChange={handleChange} autoComplete='off' />
            </div>
            <div className="inputGroup">
              <label htmlFor="description">Category Description</label>
              <input type="text" name="description" id="description" value={categoryData.description} onChange={handleChange} autoComplete='off' />
            </div>
            <button
              type="submit"
              disabled={loading ? true : false}
              className={loading ? 'disabled' : undefined}
            >
              {loading ? 'Loading ...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;