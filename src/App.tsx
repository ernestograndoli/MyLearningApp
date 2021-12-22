import React, { useEffect, useState } from 'react';

import './App.css';
import { NewsService } from './app/services/business';
import { Article } from './app/models/bussines/ApiNewsModel';
import Spinner from './app/components/Spinner';
import Card from './app/components/Card';

import styled from "styled-components";

const Container = styled.div`
    margin: 0px;
    padding: 0px;
    width: 100%; 
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
`;

const RenderCards: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [page, setPage] = useState<number>(1);

  const handlerScroll = (e : any) => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    
    if (bottom) {
      setPage(page+1);
      //window.scrollTo(0, Math.ceil(window.innerHeight + window.scrollY));
    }
  }

  const fetchNews = async () => {
    setIsLoading(true)
    const sr = await NewsService.GetTopHeadlines(page);
    
    if(sr.status()) {
      if(articles){
        setArticles(articles.concat(sr.data.articles));  
      } else {
        setArticles(sr.data.articles);
      }
      setIsLoading(false);
      console.log(articles)
    }    
  }

  useEffect(() => {
    console.log("UseEffect");    
    window.addEventListener('scroll', handlerScroll)
    /*return () => {
      window.removeEventListener('scroll', handlerScroll);
    };*/
  }, [])
  
  useEffect(() => {
    fetchNews()
  }, [page])

  if(isLoading) return <Spinner/>

  return <>
    {
      <Container id="cardsContainer">
        {articles?.map((article, index) => <Card article={article} key={index}/>)}
      </Container>      
    }
  </>
}

function App() {
  return (
    <div className="App">
      <RenderCards/>
    </div>
  );
}

export default App;
