import { Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserProfile from './../../components/profile/UserProfile';
import ViewProfile from './../../components/profile/ViewProfile';
import UserArticle from './../../components/profile/UserArticle';

const Profile = () => {
  const {slug: id} = useParams();

  const {auth} = useSelector(state => state);

  return (
    <Grid p={{ base: '25px 35px', md: '25px 100px' }} templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={{ base: 12, md: 100 }}>
      {
        auth.user?._id === id
        ? <UserProfile id={id} />
        : <ViewProfile id={id} />
      }
      <UserArticle />
    </Grid>
  );
}

export default Profile;