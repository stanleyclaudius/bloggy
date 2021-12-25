import { Link } from 'react-router-dom';

const ArticleCard = ({id, title, description, author, date, image}) => {
  return (
    <div className='articleCard'>
      <div className="articleCard__image">
        <img src={image} alt={`Bloggy - ${title}`} />
      </div>
      <div className='articleCard__body'>
        <div className="articleCard__title">
          <Link to={`/blog/${id}`}>
            <h3>{title.length > 17 ? title.slice(0, 17) + ' ...' : title}</h3>
          </Link>
        </div>
        <div className="articleCard__description">
          <p>
            {
              description.length > 70
              ? description.slice(0, 70) + ' ...'
              : description
            }
          </p>
        </div>
        <div className="articleCard__info">
          <p>By: <Link to={`/profile/${author._id}`}>{author.name}</Link></p>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;