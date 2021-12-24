import ArticleCard from './ArticleCard';

const ArticleContainer = ({blogs}) => {
  return (
    <div className='articleContainer'>
      {
        blogs.map(item => (
          <ArticleCard
            key={item._id}
            id={item._id}
            category={item.category?.name}
            title={item.title}
            description={item.description}
            author={item.user}
            date={new Date(item.createdAt).toLocaleDateString()}
            image={item.thumbnail}
          />
        ))
      }
    </div>
  );
}

export default ArticleContainer;