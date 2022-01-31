import { useParams } from "react-router-dom";
import { getInvoice } from "../dataTest/data";

export default function New() {
    let params = useParams();
    //let invoice = getInvoice(params.newId) || {};
    return (
        <div>
            <h1>Hola New</h1>
            {params.newId}
        </div>
    );
}