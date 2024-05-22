# Inventory Management System FrontEnd

<p>Deploed URL: https://inventorymangement.netlify.app/</p>

## Table of Contents
<ol>
  <li>Project Overview</li>
  <li>Features</li>
  <li>Tech Stack</li>
  <li>Setup and Installation</li>
  <li>Components</li>
  <li>State Management</li>
  <li>Authentication</li>
  <li>Usage</li>
</ol>

## Project Overview
<p>The Inventory Management System is a full-stack application designed to help users manage their inventory efficiently. The frontend is built with React.js, providing a dynamic and responsive user interface. The application allows users to perform CRUD operations on inventory products, track stock levels, manage purchase orders, and generate reports.</p>

## Features

<ul>
  <li>User authentication with login and registration functionality.</li>
  <li>Role-based access control (Admin and User roles).</li>
  <li>Dashboard displaying inventory products, stocks, orders, and vendor details.</li>
  <li>CRUD operations for inventory products.</li>
  <li>Stock tracking, including quantities and locations.</li>
  <li>Alerts for stock refill and low inventory.</li>
  <li>Tracking purchase orders with vendor information and delivery dates.
  </li>
  <li>Generating reports and analytics on inventory details.</li>
</ul>

## Tech Stack

<ul>
  <li><b>Frontend: React.js, React Router, Context API, Formik, react-icons, Bootstrap, axios, react-bootstrap-icons.</b> </li>
  <li><b>Backend:</b> Node.js, Express.js, MongoDB</li>
  <li><b>Authentication:</b> JWT, Bcrypt</li>
</ul>

## Setup and Installation
### Prerequisites

<ul>
  <li>Node.js</li>
  <li>npm</li>
</ul>

### Installation

<ol>
  <li>Clone the repository:</li>

  ```
git clone https://github.com/dinadina1/Inventory-Management-System-FrontEnd
```

<li>Navigate to the project directory:</li>

```
cd inventory-management-frontend
```

<li>Install dependencies:</li>

```
npm install
```

<li>Start the development server:</li>

```
npm start
```

<li>Open your browser and go to `http://localhost:3500`.</li>

</ol>


## Components
### Authentication

<ol>
  <li><b>Login:</b> Form for user login using Formik for form handling and validation.</li>
  <li><b>Signup:</b> Form for user registration using Formik.
</li>
</ol>

## Dashboard

<ul>
  <li><b>InventoryList:</b> Display a list of inventory products.</li>
  <li><b>InventoryItem:</b> Detailed view of a single inventory product.
  </li>
  <li><b>StockAlerts:</b> Notifications for low stock levels.</li>
  <li><b>PurchaseOrders:</b> List and details of purchase orders.</li>
</ul>

## Common
<ul>
  <li><b>Navbar:</b> Navigation bar for the application.</li>
  <li><b>Footer:</b> Footer component.</li>
  <li><b>PrivateRoute:</b> Component to protect routes that require authentication.</li>
</ul>

## State Management

<ul>
  <li><b>Context API:</b> We can use Context API for state management if preferred.
</li>
</ul>

## Routing

<ul>
 <li> <b>React Router:</b> Used for client-side routing to handle navigation between different pages.</li>

</ul>

## Authentication
<ul>
  <li><b>JWT:</b> Used for secure authentication.</li>
  <li><b>Bcrypt:</b> Used for password hashing.</li>
</ul>

## Usage

<ol>
  <li><b>Login/Signup:</b> Create an account or login to the application.</li>
  <li><b>Dashboard:</b> Access the dashboard to view and manage inventory.</li>
  <li><b>CRUD Operations:</b> Create, read, update, and delete inventory products.</li>
  <li><b>Stock Management:</b> Track stock levels and receive alerts for low stock.</li>
  <li><b>Purchase Orders:</b> Manage and track purchase orders.</li>
  <li><b>Reports:</b> Generate and view reports on inventory data.</li>
</ol>



