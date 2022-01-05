import styled from "styled-components";

import { Article } from "../models/bussines/ApiNewsModel";

import CloseImg from "../images/close.png";

interface ArticleProps {
    article : Article,
    handlerShowModal : () => void
}

const ModalContainer = styled.div`
    margin: auto;
    font-family: Arial, Helvetica, sans-serif;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ActionsBar = styled.div`
    width: 60%;
    height: 40px;
    border-top: 2px solid orange;
    border-left: 2px solid orange;
    border-right: 2px solid orange;
    border-bottom: 2px solid orange;
    text-align: right;
    padding-right: 5px;
    background-color: #fff;
`

const IFrame = styled.iframe`
    width: 60%;
    height: 90%;
    border-top: 0px solid orange;
    border-left: 2px solid orange;
    border-right: 2px solid orange;
    border-bottom: 2px solid orange;
`
const closeImgStyle = {
    width: "25px",
    height: "25px",
    margin: "5px"
};

const goPageStyle = {
    border: "1px solid orange",
    borderRadius: "5px",
    padding: "5px",
    textDecoration: "none",
    color: "white",
    backgroundColor: "orange"
}

const Modal : React.FC<ArticleProps> = ({article, handlerShowModal} ) => {
    return <ModalContainer>
        <ActionsBar>
            <a href={article.url} style={goPageStyle}>Go Page!</a>
            <img onClick={handlerShowModal} src={CloseImg} alt="closeModal" style={closeImgStyle}/>
        </ActionsBar>
        <IFrame src={article.url} title="description"></IFrame>      
    </ModalContainer>
}

export default Modal;