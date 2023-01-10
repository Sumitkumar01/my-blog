import React from 'react'
import  articles from './article-content';
import ArticlesList from '../components/ArticlesList';

export const ArticlesListPage = () => {
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articles}/>
    </>
  )
}
