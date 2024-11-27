
# **Front-End - [InventorySystem]**

## **Description**

This project is part of a multi-layer inventory system. This repository focuses on the presentation layer, developed with React, while the back-end, written in C#, handles the business logic and data management. The front-end provides an intuitive graphical interface that interacts with the back-end via HTTP requests, enabling the management of products, branches, clients, suppliers, employees, and orders.

The back-end, responsible for all business logic and data handling, is hosted in a separate repository. You can access the back-end of the project [here](https://github.com/SebasValverde/BackEndInventorySystem.git).

---

## **Technologies Used**

A list of technologies and tools utilized in this project:

- **Front-End Framework:** React  
- **State Management:** React State (`useState`)  
- **Component Styling:** CSS and Bootstrap for UI design  
- **HTTP Request Handling:** Fetch API  
- **Version Control:** Git and GitHub  

---

## **Installation and Setup**

Steps to install and configure the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SebasValverde/FrontEndInventorySystem.git
   cd FrontEndInventorySystem
   ```

2. **Install Dependencies:**
   Ensure Node.js is installed, then run:
   ```bash
   npm install
   ```

3. **Configure API Port:**
   The API port is defined in the project code through the constant ApiPort. To adjust it for your local environment, locate the const ApiPort declaration in the App.js file and update its value to match the port your back-end uses.
   For example, if your back-end is running on port `3000`, change:
   ```javascript
   const ApiPort = 81;
   ```
   to:
   ```javascript
   const ApiPort = 3000;
   ```

4. **Start the Project:**
   Run the following command to launch the development server:
   ```bash
   npm start
   ```

---

## **Key Features**

- **User Interface:**
  - Intuitive screens for managing products, branches, customers, orders, and employees.
  - User-friendly forms for data input and updates.

- **Back-End Integration:**
  - All HTTP requests are directed to the **InventorySystem** back-end, handling business logic and data management.

- **Dynamic Updates:**
  - Real-time changes reflected in inventory and other key entities.
---

## **Project Structure**

```plaintext
src/
├── Cliente/            # Files responsible for managing Client
├── css/                # CSS files
├── DetallePedido/      # Files responsible for managing Order Details
├── Empleado/           # Files responsible for managing Employee
├── Home/               # Main page handler of the system
├── img/                # Images used in the system
├── Inventario/         # Files responsible for managing Inventory
├── Pedidos/            # Files responsible for managing Orders
├── Producto/           # Files responsible for managing Product
├── Proveedor/          # Files responsible for managing Supplier
├── Sucursales/         # Files responsible for managing Branches
├── TipoEmpleado/       # Files responsible for managing Employee Types
├── TipoProducto/       # Files responsible for managing Product Types
├── App.js              # Main entry point of the application
├── index.js            # Application rendering
```

---

## **Integration with the Back-End**

This project relies on the back-end for all business operations and data management. Ensure the back-end is properly configured and running before starting the front-end. For more details, check the back-end repository: [InventorySystem - Back-End](https://github.com/SebasValverde/BackEndInventorySystem.git).

---

## **Contributions**

This project welcomes contributions. If you have suggestions or improvements, feel free to open a pull request or create an issue.
