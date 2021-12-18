import { Grid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from './../../redux/actions/userActions';
import UserProfile from './../../components/profile/UserProfile';
import ViewProfile from './../../components/profile/ViewProfile';
import UserArticle from './../../components/profile/UserArticle';

const Profile = () => {
  const {slug: id} = useParams();

  const dispatch = useDispatch();
  const {user, auth} = useSelector(state => state);

  useEffect(() => {
    if (!id) return;
    dispatch(getUserProfile(id));
  }, [id, dispatch]);

  return (
    <Grid p={{ base: '25px 35px', md: '25px 100px' }} templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={{ base: 12, md: 100 }}>
      {
        auth.user?._id === id
        ? <UserProfile id={id} />
        : <ViewProfile name={user.name} avatar={user.avatar} account={user.account} />
      }
      <UserArticle id={id} />
    </Grid>
  );
}

export default Profile;