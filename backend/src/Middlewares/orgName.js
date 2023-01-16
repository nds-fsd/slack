import express from "express";

const validateOrgName = (req, res, next) => {
    console.log('Request Type:', req.method);
    const org = req.body;
    
    if (org.OrgName === undefined || org.OrgName.length === 0) {
        res.status(400).send({message: 'name required'});
        return;
    }
    if (org.OrgMail === undefined) {
        res.status(400).send({message: 'mail required'});
        return;
    }
    if (org.OrgDescription === undefined) {
        res.status(400).send({message: 'description required'});
        return;
    }
    next();
};

export {validateOrgName};