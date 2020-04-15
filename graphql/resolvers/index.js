const bcrypt   = require('bcryptjs');

// mongoDB entitities
const Event = require('../../models/event');
const User  = require('../../models/users');


const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    }
    catch (err) {
        throw err;
    }
};

const events = async eventIds => {
    try {
        const events = await Event.find({_id: {$in: eventIds}})
        return events.map(event => {        
                return { 
                    ...event._doc, 
                    creator: user.bind(this, event.creator) ,
                    date: new Date(event._doc.date).toISOString()
                };
        });  
    } catch (err) {
        throw err;
    }    
 
}
module.exports = {
    events: async () => {
        const events = await Event.find()
        
        try{
                return events.map(event => {
                return  { 
                    ...event._doc,
                    creator: user.bind(this, event._doc.creator),
                    date: new Date(event._doc.date).toISOString()
                };
            })
        } catch (err) {
            throw err;
        }
    },
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: "5e965d0dd101182163b8819d"  
        });  
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = {
                ...result._doc,
                creator: user.bind(this, result._doc.creator),
                date: new Date(event._doc.date).toISOString()
            };
            const creator = await User.findById("5e965d0dd101182163b8819d");
            if (!creator) {
                throw new Error('No such User exists');
            }
            creator.createdEvents.push(event);
            return createdEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUser: async args => {
        try {
            const creator = await User.findOne({ email: args.userInput.email });
            if (creator) {
                throw new Error('User with the same email already exists');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user_1 = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user_1.save();
            return { ...result._doc, password: null };
        }
        catch (err) {
            throw err;
        }
    }

}
