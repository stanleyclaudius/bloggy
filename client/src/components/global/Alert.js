import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const toast = useAlert();
  const { alert } = useSelector(state => state);

  useEffect(() => {
    if (alert.success) {
      toast.success(alert.success);
    } else if (alert.errors) {
      toast.error(alert.errors);
    }
  }, [alert]);

  return (
    <div></div>
  );
}

export default Alert;