import styled from "styled-components";

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
const StyledForm = styled.form`
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 400px;
    gap: 10px;
`;
const ProductContainer = styled.div`
    padding: 20px;
   margin-top: 45px;
   display: flex;
   flex-wrap: wrap;
   gap: 50px;
`;
const Product = styled.div`
   display: flex;
   flex-direction: column;
`;
const ProductImage = styled.img`
   height: 100px;
   width: 100px;
`;
const ProductInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4px;
   p{
    margin: 0;
   }
`;
export {FormContainer,StyledForm,Product,ProductContainer,ProductImage,ProductInfo};