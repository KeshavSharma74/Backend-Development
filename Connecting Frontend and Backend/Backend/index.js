import express from 'express'

const app=express();

app.use(express.static('dist'));

const port= process.env.PORT || 3000;

// app.get('/',(req,res)=>{
//     res.send('My Name is Keshav Sharma..!!!');
// })

// app.get('/home',(req,res)=>{
//     res.send('This is My Home Page...!!!');
// })

app.get('/api/pizza',(req,res)=>{
    const pizzas = [
            {
                id: 1,
                title: "Margherita",
                description: "Classic delight with fresh mozzarella, basil, and tomato sauce."
            },
            {
                id: 2,
                title: "Pepperoni Feast",
                description: "Loaded with spicy pepperoni and extra cheese for a bold flavor."
            },
            {
                id: 3,
                title: "Veggie Supreme",
                description: "A colorful mix of bell peppers, onions, olives, and mushrooms."
            },
            {
                id: 4,
                title: "BBQ Chicken",
                description: "Tender grilled chicken with BBQ sauce, red onions, and cilantro."
            },
            {
                id: 5,
                title: "Paneer Tikka",
                description: "An Indian twist with marinated paneer cubes, capsicum, and spices."
            }
                    ];
    res.send(pizzas);
})

app.listen(port,()=>{
    console.log('App is Listening on port : ' + port);
})
