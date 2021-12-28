import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from './../../redux/actions/userActions';
import UserProfile from './../../components/profile/UserProfile';
import ViewProfile from './../../components/profile/ViewProfile';
import UserArticle from './../../components/profile/UserArticle';
import HeadInfo from './../../utils/HeadInfo';

const Profile = () => {
  const {slug: id} = useParams();

  const dispatch = useDispatch();
  const {user, auth} = useSelector(state => state);

  useEffect(() => {
    if (!id) return;
    dispatch(getUserProfile(id));
  }, [id, dispatch]);

  return (
    <>
      <HeadInfo title={auth.user?._id === id ? `Bloggy - ${auth.user?.name} Profile` : `Bloggy - ${user.name} Profile`} />
      <div className='container profile'>
        {
          auth.user?._id === id
          ? <UserProfile id={id} />
          : <ViewProfile name={user.name} avatar={user.avatar} account={user.account} />
        }
        <UserArticle id={id} />
      </div>
    </>
  );
}

export default Profile;