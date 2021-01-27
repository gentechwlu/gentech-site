import {getEvents, addNewEvent, addRsvpToEvent, addMember, getMembers, signUpAdmin, getAdmins, signInAdmin, verifyToken, getDashboard, deleteEvent} from '../controllers/allControllers';

const routes = (app) => {
    app.route('/api/events')
        .get(getEvents)
        .post(addNewEvent);

    app.route('/api/events/:EventId/rsvp')
        .post(addRsvpToEvent);
       
    app.route('/api/events/:EventId/delete')
        .get(deleteEvent);

    //add and retrieve new members
    app.route('/api/members/add')
        .post(addMember);
    
    app.route('/api/members')
        .get(getMembers);

    //admin panel things
    app.route('/api/admins')
        .get(getAdmins);

    app.route('/api/admin/signup')
        .post(signUpAdmin)
    
    app.route('/api/admin/signin')
        .post(signInAdmin);
    
    //Get contents for admins
    app.route('/api/admin/dashboard')
        .get(verifyToken, getDashboard)
}

export default routes;