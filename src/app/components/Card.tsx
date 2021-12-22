import styled from "styled-components";

import { Article } from "../models/bussines/ApiNewsModel";

const CardContainer = styled.div`
    width: 300px; 
    height: 300px;
    border: 2px solid #000;
    margin: 5px;
    font-family: Arial, Helvetica, sans-serif;
`;

const H1 = styled.h1`
    font-size: 14px;
`;

const H2 = styled.h2`
    font-size: 10px;
`;

interface ArticleProps {
    article : Article;
}
  
const Card: React.FC<ArticleProps> = ({article}) => {
return <CardContainer>
        <a href={article.url}>
            <H1>{article.title}</H1>
            <H2>{article.description}</H2>
            <img src={article.urlToImage} alt="" width="150px" height="150px"/>
        </a>
    </CardContainer>
}

export default Card;