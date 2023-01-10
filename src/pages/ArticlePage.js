import React from 'react';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NotFoundPage } from './NotFoundPage';
import { CommentsList } from '../components/CommentsList';
import articles from './article-content';
import { AddCommentsForm } from '../components/AddCommentsForm';


export const ArticlePage = () => {

  const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: []});
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }
    loadArticleInfo();
  }, [articleId]);
  const article = articles.find(article => article.name === articleId);

  const addUpvote = async () =>{
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  }
  if (!article) {
    return <NotFoundPage />
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className='upvotes-section'>
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvote} upvote(s)</p>
      </div>
      
      {article.content.map((paragraph, i)=> (<p key={i}>{paragraph}</p>))}
      <AddCommentsForm 
        articleName={articleId}
        onArticleUpdate={ updateArticle => setArticleInfo(updateArticle)}/>
      <CommentsList comments={articleInfo.comments} />
    </>
  )
}
