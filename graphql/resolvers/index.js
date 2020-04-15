const bcrypt   = require('bcryptjs');

const Event = require('../../models/event');
const User  = require('../../models/users');
const Booking = require('../../models/bookings');
const { dateToString } = require('../../helpers/date')

const transformEvent = event => {
    return {
        ...event._doc, 
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    };
};

const transformBooking = booking => {
    return {
        ...booking._doc,
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event)
    };
};



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
                return transformEvent(event);
        });  
    } catch (err) {
        throw err;
    }
}

const singleEvent = async eventId => {
    try{
        const event = await Event.findById({_id: eventId});
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
}


module.exports = {
    events: async () => {
        try{
            const events = await Event.find()
            return events.map(event => {
            return transformEvent(event);
            })
        } catch (err) {
            throw err;
        }
    },
    bookings: async () => {
        try{
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return transformBooking(booking);
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
            createdEvent = transformEvent(result);
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
            return { 
                ...result._doc, password: null,
                createdAt: dateToString(result._doc.createdAt),
                updatedAt: dateToString(result._doc.updatedAt)
             };
        }
        catch (err) {
            throw err;
        }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({_id: args.eventId})

        if(!fetchedEvent) {
            throw new Error('Event does not exist')
        }    

        const booking = new Booking({
            user: '5e965d0dd101182163b8819d',
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result);        
    },
    cancelBooking: async args => {
        try {
           const booking = await Booking.findById(args.bookingId).populate('event');
           const event = transformEvent(booking.event);
           await Booking.deleteOne({_id: args.bookingId});
           return event;

        } catch (err) {
            throw err;
        }
    }
}
