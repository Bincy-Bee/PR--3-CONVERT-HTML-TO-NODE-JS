const express = require("express");
const checkField = require("./auth.middleware");
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());


let initialRecipe = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      preparationTime: '15 minutes',
      cookingTime: 15,
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
      country: "India",
      veg: true,
      id: 1
    },
    {
        name: "kumbhaniya",
        description: "A classic gujrati dish.",
        preparationTime: "35 minutes",
        cookingTime: 10,
        imageUrl: "https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
        country: "India",
        veg: true,
        id: 2
      },
    {
        name: "kumbhaniya",
        description: "A classic gujrati dish.",
        preparationTime: "35 minutes",
        cookingTime: 45,
        imageUrl: "https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
        country: "japan",
        veg: false,
        id:3
      }
  ]

  //now creating rouring

  app.get("/",(req,res)=>{
    res.status(200).send("welcome to the recipe api")
  })
  app.get("/recipe/all",(req,res)=>{
    res.status(200).send(initialRecipe);    
  })
  app.get("/index",(req,res)=>{
    res.status(200).sendFile(__dirname + "/index.html")
  })
  app.get("/add", (req,res)=>{
    res.status(200).sendFile(__dirname + "/recipe.html")
  })
  app.post("/recipe/add",checkField,(req, res)=>{
    req.body.id=initialRecipe.length+1
    initialRecipe.push(req.body);
    res.send(initialRecipe);
  })
  
//   app.patch("/recipe/update/:id", (req, res)=>{
//     let {id} =req.params;
  
//     let index = initialRecipe.findIndex((recipes)=> recipes.id == id);
    
//     if(index == -1){
//         res.send("Recipe not found")
//     }
//     else{
//         initialRecipe[index].name = req.body.name;
//         initialRecipe[index].description = req.body.description;
       

//         // console.log(initialRecipe[index])
//     }

//     res.status(200).send(initialRecipe);
//   })


  app.delete("/recipe/delete/:id",(req, res)=>{
    let {id} = req.params;
    let delRecipe = initialRecipe.filter((recipes)=> recipes.id != id)

    res.status(200).send(delRecipe);
  })
  app.get("/recipe/filter", (req,res)=>{
    let {country, veg,cookingTime} = req.query;

    let store = initialRecipe;

    if (veg){
        if(veg == "true"){
            store = store.filter((ele)=>ele.veg == "true")
        }
        else{
            store = store.filter((ele)=>ele.veg == "false")
        }
    }
    if (country){
        store = store.filter((recipes)=> recipes.country == country);
    }
    
    if(cookingTime){
        if (cookingTime == "lth"){
            store = store.sort((a,b)=> a.cookingTime - b.cookingTime)
        }
        else if (cookingTime == "htl"){
            store = store.sort((a,b)=> b.cookingTime - a.cookingTime)
        }
    }
    res.send(store);
  })
  
  //Sevre listening on port 8090
  const port = 8090;
  app.listen(port,()=>{
    console.log(`Recipe API server is listening on port : http://localhost:${port}`)
  })