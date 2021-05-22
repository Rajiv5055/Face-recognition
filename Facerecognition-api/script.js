const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const clarifai = require('clarifai');

const db = knex({                      // database name === db
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'Rajeev123',
		database : 'facerecognition'
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.send(database.users);
}) 

app.post('/signin', (req, res) => {
	const { email, password} = req.body;

   if(!email || !password){
   	  return res.status(400).json('Incorrect form submission');
   }

 	db.select('email', 'hash').from('login')
 	.where('email', '=', email)
 	.then(data => {
 		const isvalid = bcrypt.compareSync(req.body.password, data[0].hash)
        if(isvalid){
        	return db.select('*').from('users')
        	.where('email', '=', email)
        	.then(user=>{
        		res.json(user[0])
        	})
        	.catch(err=> res.status(400).json('Unable to get User'))
        }
        else{
        	res.status(400).json('wrong credentials')
        }       
 	})
 	.catch(err=> res.statu(400).json('Wrong Credentials'))
})

app.post('/register',(req, res) => {
   const {email, name, password} = req.body;
   if(!email || !name || !password){
   	return res.status(400).json('Incorrect form submission');
   }
   const hash = bcrypt.hashSync(password);
   db.transaction(trx => {
   	 trx.insert({
   	 	hash:hash,
   	 	email: email
   	 })
   	 .into('login')
   	 .returning('email')
   	 .then(loginEmail =>{
        return db('users')
		        .returning('*')
				.insert({
				email: loginEmail[0],
				name: name,
		        joined: new Date()
	    })
	   .then(user => {
	      res.json(user[0]);
	   })
   	 })
   	 .then(trx.commit)
   	 .catch(trx.rollback)
   })
	.catch(err => res.status(400).json('unable to register'))
})


app.get('/profile/:id', (req,res) =>{
	const {id} = req.params;
	let found= false; 
	db.select('*').from('users').where({id})
	.then(user =>{
		if(user.length){
			res.json(user[0])
		}
		else {
			res.status(400).json('Not found')
		}
		
	})
    .catch(err=> res.status(400).json('Error getting User..'))	
})

app.put('/image',(req,res) =>{
const {id} = req.body;
	
db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json('Unable to get entries'))
})

app.post('/imageurl', (req,res) =>{
  const app=new Clarifai.App({
   apiKey:'3f229c7e92ba4114bbfc87a05e8d0c8b'
  });
     app.models
     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data=>{
     	res.json(data);
     })
     .catch(err=>res.status(400).json('Unable to work with API'))
})

 

app.listen(3000,()=>{
   console.log('App is running on port 3000')
})