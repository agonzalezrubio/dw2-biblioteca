const fs=require('fs');
const express = require('express');
const cors = require('cors');
const app=express();

app.use(cors());
const port=3000;
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'error.html'));
  });

app.listen(port,()=>{
  console.log(`Corriendo en puerto: ${port}`);
})

const publicPath = path.join(__dirname, 'public');

app.post('/prestar-libro',(req,res)=> {
  const data = {...req.body}
  const dataString = Object.values(data).join("\n")

  const fileName = `id_123.txt`

  fs.writeFile(`${publicPath}/${fileName}`, dataString, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al escribir el archivo");
    } else {
      const fullPath = path.join(publicPath, fileName);
      res.download(fullPath, fileName, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error al descargar el archivo");
        } else {
          console.log("Archivo descargado correctamente");
        }
      });
    }
  });
});



