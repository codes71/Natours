/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51RWB4CPNXgw2OwHpQRn1ogHFogKIb89lThDVcsPuyhGQ7M4OhvDLCC1yApIDu2HDOQU9P8DOb1fDm1U8n9Tdzi7Z00RvAGQA6I');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
