import { Grid } from '@chakra-ui/react';
import UserProfile from './../../components/profile/UserProfile';
import UserArticle from './../../components/profile/UserArticle';

const Profile = () => {
  return (
    <Grid p={{ base: '25px 35px', md: '25px 100px' }} templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={{ base: 12, md: 100 }}>
      <UserProfile />
      <UserArticle />
    </Grid>
  );
}

export default Profile;