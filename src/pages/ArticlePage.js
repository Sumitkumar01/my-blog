import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NotFoundPage } from './NotFoundPage';
import articles from './article-content';

export const ArticlePage = () => {

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []});
  const { articleId } = useParams();

  useEffect(() => {
    const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
    const newArticleInfo = response.data;
    setArticleInfo({upvotes: Math.ceil(Math.random()*10)+1, comments: []});
  },[]);
  const article = articles.find(article => article.name === articleId);
  if (!article) {
    return <NotFoundPage />
  }

  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)!</p>
      {article.content.map((paragraph, i)=> (<p key={i}>{paragraph}</p>))}
    </>
  )
}
