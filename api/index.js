import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task.js";



const app = express()
const port = 3001

app.use(express.json())

if(process.env.DEVELOPMENT) { 
   app.use(cors()) 
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/task", async (req, res) => {
    try {
        
      const tasks = await fetchTasks();
      res.send(tasks.Items);
      
    } catch (err) {
        
      res.status(400).send(`Error fetching tasks: ${err}`);
    }
  });
  
app.post("/task", async (req, res) => {
    try {
        const task = req.body;
        
        const respone = await createTasks(task);
        
        res.send(respone)
        
      } catch (err) {
        
        res.status(400).send(`Error creating tasks: ${err}`);
    }
  })

app.put('/task', async (req, res) => {
    try {
        const task = req.body;
        
        const respone = await updateTasks(task);
        
        res.send(respone)
        
      } catch (err) {
        
        res.status(400).send(`Error updating tasks: ${err}`);
    }
  })
  
app.delete('/task/:id', async (req, res) => {
    try {
        const {id} = req.params;
        
        const respone = await deleteTasks(id);
        
        res.send(respone)
        
      } catch (err) {
        
        res.status(400).send(`Error deleting tasks: ${err}`);
    }
  })


    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export const handler = serverless(app)