const NotFound = () => {
  return (
    <div className='notFound'>
      <img src={`${process.env.PUBLIC_URL}/images/notFound.svg`} alt="Bloggy Not Found" />
      <h1>404 | Not Found</h1>
    </div>
  );
}

export default NotFound;