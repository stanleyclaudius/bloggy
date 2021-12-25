import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { getCategory, deleteCategory } from './../../redux/actions/categoryActions';
import UpdateCategory from './UpdateCategory';
import Spinner from './../global/Spinner';
import Warning from './../global/Warning';

const CategoryTable = () => {
  const [onDelete, setOnDelete] = useState(null);
  const [onUpdate, setOnUpdate] = useState(null);

  const dispatch = useDispatch();
  const {alert, auth, category} = useSelector(state => state);

  const handleUpdate = category => {
  }

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className='categoryTable'>
      {
        alert.loading
        ? (
          <Spinner />
        )
        : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Category</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                category.map((cat, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                    <td>
                      <AiFillEdit onClick={() => setOnUpdate(cat)} />
                      <AiFillDelete onClick={() => setOnDelete(cat._id)} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }

      <Warning
        id={onDelete}
        handleClick={() => dispatch(deleteCategory(onDelete, auth.token))}
        handleClose={() => setOnDelete(null)}
      />

      <UpdateCategory
        category={onUpdate}
        setCategory={setOnUpdate}
      />
    </div>
  );
}

export default CategoryTable;