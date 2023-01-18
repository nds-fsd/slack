import express from "express";

const validateUserName = (req, res, next) => {
    console.log('Request Type:', req.method);
    const user = req.body;
    
    if (user.name === undefined || user.name.length === 0) {
        res.status(400).send({message: 'name required'});
        return;
    }
    if (user.lastName === undefined) {
        res.status(400).send({message: 'lastName required'});
        return;
    }
    if (user.email === undefined) {
        res.status(400).send({message: 'email required'});
        return;
    }
    next();
};

export {validateUserName};