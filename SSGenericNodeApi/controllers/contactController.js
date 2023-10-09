const asyncHandler = require("express-async-handler");
const Contact =  require("../models/contactModel");
// Desc : Get All Contacts
// route : GET api/contacts
// Access : Public

const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id : req.user.id});
    //res.status(200).json( { message : "Get All Contacts" });
    res.status(200).json( contacts);

});

// Desc : Create Contact
// route : POST api/contacts
// Access : Public
const createContact = asyncHandler(async(req,res,next)=>{

//    try {
        console.log(req.body);

        const {name,email,phone} = req.body;
    
        if (!name || !email || !phone){
            res.status(400);
            throw new Error("All Fields are Mandatory...");
        }

        const contact = await Contact.create({
            name,
            phone,
            email,
            user_id : req.user.id
        });
        res.status(200).json( contact);
    // } 
    // catch(Error)
    // {
    //     next(Error)
    // }


    }
      
);


// Desc : Get Contact
// route : GET api/contacts/:id
// Access : Public
const getContact = asyncHandler(async(req,res)=>{
    
        const contact = await Contact.findById(req.params.id);
        if (!contact){
            res.status(404);
            throw new Error("Contact Not Found, Can't fetch");
        }
        res.status(200).json(contact);
    }
   
   

)

// Desc : Update Contact
// route : PUT api/contacts/:id
// Access : Public
const updateContact = asyncHandler(async(req,res)=>{
       
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact Not Found for Update");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}

    );
    res.status(200).json(updatedContact);
   
});

// Desc : Delete Contact
// route : DELETE api/contacts/:id
// Access : Public
const deleteContact = asyncHandler(async(req,res)=>{

    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact Not Found for Delete");
    }
 

   const res1 = await Contact.deleteOne( { "_id" :  req.params.id } )
   // const result = await Contact.remove({}).exec()
    res.status(200).json(contact);
    //res.status(200).json( { message : `Delete contact for ${req.params.id}` });
})

module.exports = { getContact,getContacts,createContact,updateContact,deleteContact}


