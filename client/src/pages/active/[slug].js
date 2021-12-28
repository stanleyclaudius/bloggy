import { useAlert } from 'react-alert';
import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postDataAPI } from './../../utils/fetchData';
import HeadInfo from './../../utils/HeadInfo';

const ActivateAccount = () => {
  const toast = useAlert();
  const navigate = useNavigate();
  const {slug} = useParams();

  const activateAccount = useCallback(async() => {
    try {
      const res = await postDataAPI('auth/activate', {activation_token: slug});
      await toast.success(res.data.msg);
      navigate('/login');
    } catch (err) {
      await toast.error(err.response.data.msg);
      navigate('/login');
    }
  }, [slug, navigate, toast]);

  useEffect(() => {
    if (!slug) return;
    activateAccount();
  }, [slug, activateAccount]);

  return(
    <>
      <HeadInfo title='Bloggy - Account Activation' />
      <div></div>
    </>
  );
}

export default ActivateAccount;