import mongoose from 'mongoose';
import { Event } from '../models/eventModel';
import { Member } from '../models/membersModel';
import { Admin } from '../models/adminModel';
import { AdminSession } from "../models/adminSession";
import validateInput from '../helpers/validate';
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const getEvents = (req, res) => {
    Event.find({}, (err, Event) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json(Event);
    });
};

export const addNewEvent = (req, res) => {
    let newEvent = new Event(req.body);
    
    newEvent.save((err, newEvent) => {
        if (err) {
            return res.json({error: err, success: false});
        }
        return res.status(200).json({event: newEvent, success: true});
    });
};

export const deleteEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.EventId, (err, deleted) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json({event: deleted, success: true});
    })
}

export const addRsvpToEvent = (req, res) => {
    Event.findOneAndUpdate({_id: req.params.EventId}, {$push: {rsvp: req.body.rsvp}}, {new: true}, (err, Event) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json(Event);
    });
}

//Member Controllers
export const addMember = (req, res) => {
    let newMember = new Member(req.body);

    newMember.save((err, Member) => {
        if (err) {
            return res.send({success: false, message: "Server Error. Please try again. If error persists, please let us know via email.", data: err});
        }
        return res.status(200).json({success: true, message: "Submission successful", data: Member});
    });
};

export const getMembers = (req, res) => {
    Member.find({}, (err, members) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json(members);
    })
}

//Admin controllers 
export const signUpAdmin = (req, res, next) => {
    let {email, name} = req.body;
    const {password} = req.body;
    /*
    if (!email) {
        return res.send({success: false, message: 'Error: Email field cannot be blank.'})
    }
    if (!name) {
        return res.send({success: false, message: 'Error: Name field cannot be blank.'})
    }
    if (!password) {
        return res.send({success: false, message: 'Error: Password field cannot be blank.'})
    }
    */

    email = email.toLowerCase();
    email = email.trim();
    name = name.trim();
    const {errors, isValid} = validateInput({email: email, password: password});
    if (!isValid) {
        return res.send({success: false, message: errors.email || errors.password});
    }
    
    //verifying email does not exist
    Admin.find({email: email}, (err, prevAdmins) => {
        //If error or user already exists, respond with error
        if (err) {
            return res.send({success: false, message: 'Error: Server Error.'})
        } else if (prevAdmins.length > 0) {
            return res.send({success: false, message: 'Error: Account already exists.'});
        } else {
            //If reached, it means there is no error and that there is no user with the same email
            //Saving the new admin after hashing password
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                let newAdmin = new Admin();
                newAdmin.name = name;
                newAdmin.email = email;
                newAdmin.password = hashedPassword;
                newAdmin.save((error, admin) => {
                    if (error) {
                        console.log(("Reached"))
                        return res.send({success: false, message: "Error: Server Error."})
                    }
                    return res.send({success: true, message: "Sign up successful.", newAdmin: admin})
                });
            });
        }
    });    
}

export const signInAdmin = (req, res, next) => {
    let {email} = req.body;
    const {password} = req.body;
    if (!email) {
        return res.send({success: false, message: 'Error: Email field cannot be blank.'})
    }
    if (!password) {
        return res.send({success: false, message: 'Error: Password field cannot be blank.'})
    }

    email = email.toLowerCase();
    email = email.trim();
    //check input value validity
    const {errors, isValid} = validateInput({email: email, password: password});
    if (!isValid) {
        return res.send({success: false, message: errors.email || errors.password});
    }

    Admin.find({email: email}, (err, adminList) => {
        if (err) {
            return res.send({success: false, message: "Error: Server Error."})
        }
        if (adminList.length == 0) {
            return res.send({success: false, message: "This account does not exist. Please let us know if this is an error."})
        } else if (adminList.length > 1) {
            return res.send({success: false, message: "Error: There are multiple accounts with this email. Please contact us via email to get this fixed."})
        }
        const admin = adminList[0];
        bcrypt.compare(password, admin.password, (err, doesMatch) => {
            if (err) return res.send({success: false, message: "Error: Server Error."})
            if (!doesMatch) {
                return res.send({success: false, message: "The password is incorrect."});
            }
            //If reached, password is correct and we create JWT Payload
            const payload = {id: admin.id, name: admin.name}
            //Sign token
            jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 31556926}, (err, token) => {
                return res.send({success: true, message: "Sign in successful.", token: "Bearer " + token, admin: {name: admin.name, email:admin.email, signUpDate: admin.signUpDate}})
            })
        });
    })

}

export const getAdmins = (req, res) => {
    Admin.find({}, (err, admins) => {
        if (err) {
            return res.status(err);
        }
        return res.status(200).json(admins);
    })
}

export function verifyToken (req, res, next) {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ success: false, message: "No token provided!" });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ success: false, message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };

export const getDashboard = (req,res) => {
    return res.json({success: true, message: "Dash Access Successful!"})
}