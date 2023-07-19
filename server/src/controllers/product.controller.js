const controller = {};
const fs = require("fs/promises");
const path = require("path");

const productFile =  path.resolve(__dirname,"../../data/products.json");

controller.getAllProducts = async (req,res) =>{
    try {
        
        const data = await fs.readFile(productFile);
        const jsonData = await JSON.parse(data);
        res.send(jsonData);
        res.end();
    } catch (error) {
        res.send({error:"Error al escribir archivo"});
    }
}

controller.createProduct = async (req,res) =>{
    try {
        const newProduct = {
            "id": req.body.id,
            "img": req.body.img,
            "titulo": req.body.titulo,
            "precio": req.body.precio,
            "valoracion": req.body.valoracion
          };
        const data = await fs.readFile(productFile);
        const jsonData = await JSON.parse(data);
        const newData = [...jsonData,newProduct];
        fs.writeFile(productFile,JSON.stringify(newData));
        res.send({data:newData});
        res.end();
    } catch (error) {
        res.send({error:"Error al escribir archivo"});
    }
}

controller.updateProduct = async (req,res) =>{
    try {
        
        const data = await fs.readFile(productFile);
        const jsonData = await JSON.parse(data);
        let pos;
        jsonData.forEach((element,index) => {
            if (element.id===req.body.id) {
                pos=index;
            }
        });
        jsonData[pos]=req.body;
        res.send({data:jsonData});
        res.end();
    } catch (error) {
        res.send({error:"Error al escribir archivo"});
    }
}
controller.deleteProduct = async (req,res) =>{
    try {
        
        const data = await fs.readFile(productFile);
        const jsonData = await JSON.parse(data);
        const result = jsonData.filter(product => product.id !== req.body.id);
        console.log(result)
        fs.writeFile(productFile,JSON.stringify(result));
        res.send({data:result});
        res.end();
    } catch (error) {
        res.send({error:"Error al escribir archivo"});
    }
}

module.exports = controller;