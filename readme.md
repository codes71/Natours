# Natours: Tour Booking Web Application

## Project Overview

`Natours` is a robust, full-stack web application designed for seamless tour booking and comprehensive management. It allows users to browse, book, and review tours, while providing administrative functionalities for efficient tour and booking oversight. This project was developed as part of "Node.js, Express, MongoDB & More: The Complete Bootcamp 2019" by Jonas Schmedtmann, serving as both a functional application and an extensive learning resource.

## Key Features 📝

The application boasts a rich array of core functionalities catering to various user roles:

  * **Authentication and Authorization:** Secure user signup, login, logout, profile updates, and password resets. Features role-based access control with `regular user`, `admin`, `lead guide`, and `guide` roles, each with specific permissions.
  * **User Profile Management:** Users can update their username, profile photo, email, and password.
  * **Tour Management:**
      * Admin users and lead guides can create, update, and delete tours.
      * All users can view available tours, check tour maps, and view user reviews and ratings.
  * **Booking System:**
      * Regular users can book tours and make secure payments.
      * Prevents duplicate bookings for the same user on the same tour.
      * Regular users can view all their booked tours on a dedicated "Manage Booking" page.
      * Admin users and lead guides can view all bookings, delete any booking, and manually create/edit bookings without payment.
  * **Review and Rating System:**
      * Only regular users can write reviews for tours they have booked, and they cannot review the same tour twice.
      * All users can view reviews and ratings for each tour.
      * Regular users can edit and delete their own reviews.
      * Admin users can delete any review.
  * **Favorite Tours:** Regular users can add or remove booked tours from a personalized "favorite tours" list, with safeguards against duplicate additions.
  * **Credit Card Payment:** Secure payment processing integrated with Stripe. Test card details are provided for development: Card No. 4242 4242 4242 4242, Expiry date: 02/22, CVV: 222.

## Technologies Used 🛠️

`Natours` is built upon a modern and robust technical stack:

  * **Backend:** Node.js, Express.js, Mongoose.
  * **Database:** MongoDB, MongoDB Atlas.
  * **Frontend/Templating:** Pug, HTML, CSS, JavaScript.
  * **Bundler:** ParcelJS.
  * **Security:** JSON Web Token (JWT), Helmet, `express-rate-limit`, `express-mongo-sanitize`, `xss-clean`.
  * **Payment Gateway:** Stripe.
  * **Mapping:** Mapbox.
  * **Email Delivery:** Mailtrap, Sendgrid, Nodemailer.
  * **Deployment:** Heroku.
  * **Development & Testing Tools:** Postman, ESLint, Prettier.
  * **Other Libraries:** `cors`, `compression`, `validator`, `multer`, `morgan`.

## Setup Instructions for Local Environment 💻

To get the `Natours` project running on your local machine, follow these steps:

1.  \*\*Clone the Repository:\*\*bash
    git clone [https://github.com/codes71/Natours.git](https://www.google.com/search?q=https://github.com/lgope/Natours.git)
    cd Natours
    ```
    ```
2.  **Install Dependencies:**
    ```bash
    npm i
    ```
3.  **Set up External Service Accounts:**
    You will need accounts with the following services. Basic knowledge of these services is recommended:
      * MongoDB (for database)
      * Mapbox (for mapping)
      * Stripe (for payments)
      * Sendgrid (for production email delivery)
      * Mailtrap (for development email testing)
4.  **Configure Environment Variables:**
    Create a `.env` file in the root directory of the project and set the following environment variables :
    ```
    DATABASE=your_mongodb_database_url
    DATABASE_PASSWORD=your_mongodb_password
    SECRET=your_json_web_token_secret
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90
    EMAIL_USERNAME=your_mailtrap_username
    EMAIL_PASSWORD=your_mailtrap_password
    EMAIL_HOST=smtp.mailtrap.io
    EMAIL_PORT=2525
    EMAIL_FROM=your_email@example.com
    SENDGRID_USERNAME=your_sendgrid_username
    SENDGRID_PASSWORD=your_sendgrid_password
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    ```
5.  **Start the Server:**
      * For development mode:
        ```bash
        npm run dev
        ```
      * For production-optimized build:
        ```bash
        npm run start:prod
        ```
      * Alternatively:
        ```bash
        npm start
        ```
6.  **VS Code ESLint and Prettier Setup (Optional):**
    For consistent code style and quality checks, install the following development dependencies:
    ```bash
    npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
    ```

## Live Demonstration & API Endpoints 🖥️

Explore the deployed application and its API endpoints:

  * **Live Demo:** [https://natours-t.up.railway.app/](https://natours-t.up.railway.app/) 
  * **Tours List API:** [https://natours-t.up.railway.app/api/v1/tours](https://www.google.com/search?q=https://natours-t.up.railway.app/api/v1/tours) 
  * **Tours State API:** [https://natours-t.up.railway.app/api/v1/tours/tour-stats](https://www.google.com/search?q=https://natours-t.up.railway.app/api/v1/tours/tour-stats) 
  * **Top 5 Cheap Tours API:** [https://natours-t.up.railway.app/api/v1/tours/top-5-cheap](https://www.google.com/search?q=https://natours-t.up.railway.app/api/v1/tours/top-5-cheap) 
  * **Tours Within Radius API (Example):** [https://natours-t.up.railway.app/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi](https://www.google.com/search?q=https://natours-t.up.railway.app/api/v1/tours/tours-within/200/center/34.098453,-118.096327/unit/mi) 

## Project Roadmap (To-do & Future Updates) 🪴

The project is continuously evolving with planned enhancements:

### Current "To-do" Items 🗒️

  * **Review and Rating:** Allow users to add reviews directly on the website after they have completed a tour.
  * **Booking:** Further prevent duplicate bookings and refine the favorite tours implementation.
  * **Advanced Authentication:** Implement email confirmation for sign-ups, login with refresh tokens, and two-factor authentication (2FA).
  * **Continuous Improvement:** There's always room for improvement\! 

### Planned "Future Updates" 🚀

  * **Enable PWA (Progressive Web App):** To offer an app-like experience.
  * **Improve UX/UI and Fix Bugs:** General enhancements to user experience, interface, and bug resolution.
  * **New Tour Features:** Introduce "Featured Tours" and "Recently Viewed Tours".
  * **Ongoing Development:** And More\! 

## Contribution Guidelines 🤝

Contributions are welcome\! If you're interested in contributing, please:

1.  **Open an Issue:** Discuss your proposed changes or new features before submitting a pull request.
2.  **Contact:** For any issues, questions, ideas, or concerns, you can reach out via email to `thuraheinsyh@gmail.com`.

## License 📄

This project is open-sourced under the(https://opensource.org/licenses/MIT). This permissive license allows for broad use, modification, and distribution of the code.

## Acknowledgements 🙏

This project is part of the online course "Node.js, Express, MongoDB & More: The Complete Bootcamp 2019". A special thanks to Jonas Schmedtmann for creating this awesome course\! 