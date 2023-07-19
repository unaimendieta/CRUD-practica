import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormContainer, Product, ProductContainer, ProductImage, ProductInfo, StyledForm} from "./styles";

const Form = () => {
    const [productList, setProductList]=useState([]);
    const [productValues, setProductValues]=useState({
        title:"",
        price:"",
        valoration:""

    })
    const [productValuesUpdate, setProductValuesUpdate]=useState({
        id:"",
        titulo:"",
        precio:"",
        valoracion:""

    })
    useEffect(() => {
        getProductList(setProductList);
    }, [])
	return (
		<>  
        <FormContainer>
			<StyledForm action="" id="form" onSubmit={e=>handleFormSubmit(e,productValues,setProductList)}>
                <input type="text" name="title" id="" placeholder="Title" value={productValues.title} onChange={e => setValue(e.target,productValues,setProductValues)}/>
                <input type="text" name="price" id="" placeholder="price" value={productValues.price} onChange={e => setValue(e.target,productValues,setProductValues)}/>
                <input type="text" name="valoration" id="" placeholder="Valoration" value={productValues.valoration} onChange={e => setValue(e.target,productValues,setProductValues)}/>
                <input type="submit" value="Save Product"/>
            </StyledForm>
            <StyledForm action="" id="form" onSubmit={e=>handleProductUpdate(e,productValuesUpdate,setProductList)}>
                <input type="text" name="id" id="" placeholder="Id" value={productValuesUpdate.id} disabled/>
                <input type="text" name="titulo" id="" placeholder="Title" value={productValuesUpdate.titulo} onChange={e => setValue(e.target,productValuesUpdate,setProductValuesUpdate)}/>
                <input type="text" name="precio" id="" placeholder="Price" value={productValuesUpdate.precio} onChange={e => setValue(e.target,productValuesUpdate,setProductValuesUpdate)}/>
                <input type="text" name="valoracion" id="" placeholder="Valoration" value={productValuesUpdate.valoracion} onChange={e => setValue(e.target,productValuesUpdate,setProductValuesUpdate)}/>
                <input type="submit" value="Update Product"/>
            </StyledForm>
        </FormContainer>
			
            <ProductContainer>
                {productList.map(product =>
                        <Product key={product.id} onClick={()=>handleClick(product,setProductValuesUpdate)}>
                            <ProductImage src={product.img}/>
                            <ProductInfo>
                                <h3>{product.titulo}</h3>
                                <p>{product.precio}€</p>
                                <p>{product.valoracion} / 5</p>
                            </ProductInfo>
                            <button onClick={()=>handleDelete(product.id,setProductList)}>Delete</button>
                        </Product>
                    )
                }
            </ProductContainer>
            
		</>
	);
};

const setValue = (param,productValues,setProductValues)=>{
    const name = param.name;
    const value = param.value;
    setProductValues({...productValues, [name]:value});
}
const handleClick = (product,setProductValuesUpdate)=>{
    setProductValuesUpdate(product);
}
const handleProductUpdate = (e,productValuesUpdate,setProductList)=>{
    e.preventDefault();
    fetch("http://localhost:3000/api/products/update",{
        method: 'POST',
        body:JSON.stringify({
            "id":productValuesUpdate.id,
            "img":productValuesUpdate.img,
            "titulo": productValuesUpdate.titulo,
            "precio": productValuesUpdate.precio,
            "valoracion": productValuesUpdate.valoracion
        }),
        headers: {
            Accept:"*/*",
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(response => setProductList(response.data))
}
const handleFormSubmit = (e,productValues,setProductList)=>{
    e.preventDefault();
    fetch("http://localhost:3000/api/products/create",{
        method: 'POST',
        body:JSON.stringify({
            "id": uuidv4(),
            "img":"https://m.media-amazon.com/images/I/417RpyYyA+L._AC_SL1000_.jpg",
            "titulo": productValues.title,
            "precio": productValues.price,
            "valoracion": productValues.valoration
        }),
        headers: {
            Accept:"*/*",
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(response => setProductList(response.data))
}
const handleDelete = (id,setProductList)=>{
    fetch("http://localhost:3000/api/products/delete",{
        method: 'DELETE',
        body:JSON.stringify({id}),
        headers: {
            Accept:"*/*",
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(response => setProductList(response.data))
}

const getProductList = (setProductList)=>{
    fetch("http://localhost:3000/api/products/getAll")
    .then(response => response.json())
    .then(response => setProductList(response))
}

export default Form;
