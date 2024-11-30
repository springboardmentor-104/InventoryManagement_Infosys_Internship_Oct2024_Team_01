# Inventory Management System
This project involves designing an inventory management software from scratch using full stack development
This is a full-stack MERN application designed to help businesses list and manage their products, and enable customers to purchase products directly from the business.

## Features
- **Business Management**: Businesses can list products, manage stock, and update product details.
- **Customer Interaction**: Customers can browse through listed products and purchase items directly from the inventory.
- **Payment Integration**: Integrated with Razorpay for processing payments.

## Technologies
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Razorpay



## Project Structure
The project is divided into two main directories:

- **backend**: Contains the server-side code, API routes, and database interactions.
- **frontend**: Contains the client-side code for the user interface, React components, and interactions with the backend API.

## Setup & Installation

Follow these steps to set up the application locally.

### 1. Clone the repository
First, clone the repository to your local machine.

```bash
git clone <repo_url>
cd <project_directory>
```


### 2. Install Dependencies
You'll need to install the necessary dependencies in both the frontend and backend directories.

#### Frontend
Navigate to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```
#### Backend
Now, navigate to the backend directory and install the dependencies:

```bash
cd backend
npm install
```

### 3. Configure Environment Variables
In both the frontend and backend directories, create a .env file to store the necessary configuration variables.

#### Frontend .env
In the frontend/.env file, add your Razorpay key:
```bash
RZP_KEY_ID=your_key
```

#### Backend .env
In the backend/.env file, add the following configuration:
```bash
PORT=3000
MONGO_URI=your_db_uri
API_VARI=your_api_variant
PASS=your_app_id
JWT_SECRET=your_jwt_secret
EMAIL=your_email
RZP_KEY_ID=your_key_id
RZR_KEY_SECRET=your_key_secret
```
Make sure to replace the placeholders (your_key, your_db_uri, etc.) with your actual credentials.


### 4. Running the Application
Once the dependencies are installed and the environment variables are set, you can start the application.

#### To run the backend:
```bash
cd backend
npm start
```

#### To run the frontend:
In a separate terminal, navigate to the frontend directory and run:
```bash
cd frontend
npm start
```
Both the frontend and backend servers should now be running. You can access the application by navigating to http://localhost:3000 (or the appropriate port for your configuration).


## API Documentation

Refer to the backend code for detailed API routes and endpoints.

### Example Endpoints:
- **POST** `/api/products`: Add a new product to the inventory.
- **GET** `/api/products`: Fetch all available products.
- **POST** `/api/payment`: Handle product purchase by the customer.


## Contributing

We welcome contributions! If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
