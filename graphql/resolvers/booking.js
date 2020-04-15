const Booking = require('../../models/bookings');
const Event   = require('../../models/event');
const { transformBooking } = require('../../helpers/resolver_helpers')



module.exports = {
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
