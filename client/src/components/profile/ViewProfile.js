import Avatar from './../global/Avatar';

const ViewProfile = ({name, avatar, account}) => {
  return (
    <div className='userProfile'>
      <div className='userProfile__avatar--away'>
        <Avatar avatar={avatar} name={name} />
      </div>
      <div>
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} disabled />
        </div>
        <div className="inputGroup">
          <label htmlFor="account">Account</label>
          <input type="text" name="account" id="account" value={account} disabled />
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;