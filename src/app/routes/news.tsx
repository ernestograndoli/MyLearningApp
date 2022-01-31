import React, { useEffect, useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "../dataTest/data";

import NewsService  from '../services/business/NewsService';
import { Article } from '../models/bussines/ApiNewsModel';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

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
    var currentScrollYonSession = window.scrollY;

    if (bottom) {
      setPage(page+1);
      window.scroll(0, currentScrollYonSession);
    }
    e.preventDefault();
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
  }, [])
  
  useEffect(() => {
    fetchNews()
  }, [page])

  //if(isLoading) return <Spinner/>

  return <>
    {
      <Container id="cardsContainer">
        {articles?.map((article, index) => <Card article={article} key={index}/>)}
      </Container>      
    }
  </>
}

export default function News() {
  return (
    <RenderCards/>
  );
  /*let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        {invoices.map(invoice => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/news/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );*/
}