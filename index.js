const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set("view engine","ejs");
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

// //middleware1
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();
// });

// //middleware0
// app.use(function(req,res,next){
//     console.log("middleware 2 called");
//     next();
// });



// Created the DB using MongoDB so this is not needed now
// var ContactList = [
//     {
//         name:"Nalin",
//         phone:'1111111111'
//     },
//     {
//         name:"Tony Boy",
//         phone:'123567890'
//     },
//     {
//         name:'Jack Wilshere',
//         phone:'4569871230'
//     }
// ]


app.get('/',function(req,res){
    // console.log(req);
    // res.send('<h1>cool,it is running, or is it?</h1>');

    Contact.find({}, function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:'Contacts List',
            contact_list: contacts
        });

    });

    // return res.render('home',{
    //     title:'Contacts List',
    //     contact_list: ContactList
    // });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Kab khatam hoga!',
        name:'Nalin Sharma'
    });
});

app.post('/create-contact', function(req,res){
    // return res.redirect('/practice');
    // ContactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err,newContact){
        if (err){console.log('error in creating a contact!'); return;}

        console.log('*********',newContact);
        return res.redirect('back');
    })

    // return res.redirect('/');
});

//getting using params
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);
//     let phone = req.params.phone;
    
// })

// getting using query
app.get('/delete-contact/',function(req,res){
    // console.log(req.query);
    
    //Get the id
    let id = req.query.id;

    //find the contact in DB using id
    // let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     ContactList.splice(contactIndex, 1);
    // }

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from DB');
            return;

        }

        return res.redirect('back');
    });

    // return res.redirect('back');
    
    
});


app.listen(port, function(err){
    if(err){
        console.log("Error in running the server ",err);
        return;
    }
    console.log("YUP, My express is running on port: ",port);
});