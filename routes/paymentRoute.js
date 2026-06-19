const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {createCheckoutSession}=require('../controllers/paymentController');
const{verifyToken,studentOnly}=require('../middleware/authMiddleware');
const Enrollment = require('../models/enrollment');
const Course = require('../models/course');
const { default: mongoose } = require('mongoose');

router.post(
    '/create-checkout-session',
    express.json(),
    verifyToken,
    studentOnly,
    createCheckoutSession
);


router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error : ${err.message}`);
    }

    if (event.type !== 'checkout.session.completed') {
        return res.json({ received: true });
    }

    const session = event.data.object;
    const { course_id, user_id } = session.metadata || {};
    console.log("Webhook metadata : ", session.metadata);

    if (!course_id || !user_id) {
        return res.status(400).json({ message: "Missing course_id or user_id in checkout metadata" });
    }

    // 1. Start a mongoose session for the transaction
    const dbSession = await mongoose.startSession();

    try {
        await dbSession.withTransaction(async () => {
            // 2. Duplicate check inside the transaction
            const existingEnrollment = await Enrollment.findOne(
                { course_id, user_id },
                null,
                { session: dbSession }       // <-- pass session to every op
            );
            if (existingEnrollment) {
                // Throwing aborts the transaction and jumps to catch
                throw Object.assign(new Error("Student already enrolled in this course"), { statusCode: 200 });
            }

            // 3. Atomic seat check + decrement
            const course = await Course.findOneAndUpdate(
                {
                    _id: course_id,
                    $expr: { $lt: ['$total_enrolled', '$max_seat'] }
                },
                { $inc: { total_enrolled: 1 } },
                { new: true, session: dbSession }   // <-- pass session here too
            );
            if (!course) {
                throw Object.assign(new Error("Course not found or full"), { statusCode: 400 });
            }

            // 4. Create enrollment — same transaction
            await Enrollment.create(
                [{ course_id, user_id }],           // array form required with sessions
                { session: dbSession }
            );

            console.log(`Payment successful! Enrolling user ${user_id} in course ${course_id}`);
        });

        return res.json({ received: true, message: "Enrollment successful" });

    } catch (error) {
        // Duplicate key from a race condition
        if (error.code === 11000) {
            return res.status(200).json({ message: "Student already enrolled in this course" });
        }
        const status = error.statusCode || 500;
        return res.status(status).json({ message: error.message });

    } finally {
        dbSession.endSession();   // 5. Always end the session
    }
});

module.exports = router;
