const Avatar = ({avatar, name, onClick}) => {
  return (
    <div className='avatar' onClick={onClick}>
      <img src={avatar} alt={name} />
    </div>
  );
}

export default Avatar;