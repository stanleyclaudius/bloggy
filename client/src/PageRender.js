import React from 'react';
import NotFound from './components/global/NotFound';
import { useParams } from 'react-router-dom';

const generatePage = pageName => {
  const component = () => require(`./pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
}

const PageRender = () => {
  let pageName = '';
  const { page, slug } = useParams();
  
  if (slug) {
    pageName = `${page}/[slug]`;
  } else {
    pageName = `${page}`;
  }

  return generatePage(pageName);
}

export default PageRender;