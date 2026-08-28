const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let data = [
    { id: 1, name: 'ALi', age: 20, },
    { id: 2, name: 'Alam', age: 25, },
];

// GET all data
app.get('/', (req, res) => {
    console.log(`[GET] All items requested`)
    res.status(200).json(data);
});

// Get by id 
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(i => i.id === id);

    if (!item) {
        console.log(`[GET] Item with ID ${id} not found`);
        return res.status(404).json({ message: "Item not found" });
    }

    console.log(`[GET] Item retrieved:`, item);
    res.status(200).json(item);
});


// add new data 
app.post('/items', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        console.log(`[POST] Missing name or age field`)
        return res.status(400).json({ message: "name and age are required" });
    }
    const newData = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        name,
        age: parseInt(age)
    };

    data.push(newData);

    console.log(`[POST] New item created:`, newData);
    res.status(201).json({ message: "Item created successfully", data: newData });


});

// Update existing data
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age } = req.body;
    const itemIndex = data.findIndex(i => i.id === id);

    if (itemIndex === -1) {

        console.log(`[PUT] Item with ID ${id} not found`);
        return res.status(404).json({ message: "Item not found" });
    }

    if (name) data[itemIndex].name = name;
    if (age) data[itemIndex].age = Number(age);


    console.log(`[PUT] Item updated:`, data[itemIndex]);
    res.status(200).json({ message: "Item updated successfully", data: data[itemIndex] })

});

// Delete data by id 
app.delete('/items/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const itemIndex = data.findIndex(i => i.id === id);

    if(itemIndex === -1){
        console.log(`[DELETE] Item with ID ${id} not found`);
        return res.status(404).json({ message: "Item not found" });
    }
    
    const deletedItem = data.splice(itemIndex, 1)[0];
    console.log(`[DELETE] Item deleted:`, deletedItem);
    res.status(200).json({message: "Item deleted successfully", data: deletedItem})


});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});