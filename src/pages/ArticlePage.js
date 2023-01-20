import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { NotFoundPage } from './NotFoundPage';
import { CommentsList } from '../components/CommentsList';
import articles from './article-content';
import { AddCommentsForm } from '../components/AddCommentsForm';
import  useUser  from '../hooks/useUser';


export const ArticlePage = () => {

  const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [],canUpvote:
    false});
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const {user, isLoding}=useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && await user.getIdToken();
      const headers = token ? { authtoken: token }:{};
      const response = await axios.get(`/api/articles/${articleId}`,{ headers });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }
    if(!isLoding){
      loadArticleInfo();
    }
    
  }, [isLoding,user]);
  const article = articles.find(article => article.name === articleId);

  const addUpvote = async () =>{
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token }:{};
    const response = await axios.put(`/api/articles/${articleId}/upvote`,null,{headers });
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
        {user 
        ?<button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Alredy upvoted'}</button>
        :<Link to='/login'><button>Log in</button></Link>}
        <p>This article has {articleInfo.upvote} upvote(s)</p>
      </div>
      
      {article.content.map((paragraph, i)=> (<p key={i}>{paragraph}</p>))}
      {user?<AddCommentsForm 
        articleName={articleId}
        onArticleUpdate={ updateArticle => setArticleInfo(updateArticle)}/>:<button>log in to add comment</button>}
      <CommentsList comments={articleInfo.comments} />
    </>
  )
}
