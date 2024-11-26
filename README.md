
# **Front-End - [InventorySystem]**

## **Descripción**

Este proyecto forma parte del proyecto de un sistema de inventario diseñado en multicapas, este repostiorio muestra la capa de presentacion, desarrollada con React y el back-end desarrollado en c#. Proporciona una interfaz gráfica intuitiva que interactúa con el back-end mediante solicitudes HTTP, permitiendo la gestión de productos, sucursales, clientes, proveedores, empleados y pedidos.

El back-end, encargado de toda la lógica de negocio y la gestión de datos, se encuentra en un repositorio independiente. Puedes acceder al back-end del proyecto [aquí](https://github.com/SebasValverde/BackEndInventorySystem.git).

---

## **Tecnologías Utilizadas**

Lista de tecnologías y herramientas empleadas en este proyecto:

- **Framework de Front-End:** React
- **Gestión de Estado:** React State
- **Diseño de Componentes:** CSS y Bootstrap para el diseño de la interfaz
- **Manejo de Solicitudes HTTP:** Fetch API
- **Control de Versiones:** Git y GitHub

---

## **Instalación y Configuración**

Pasos para instalar y configurar el proyecto localmente.

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repositorio-frontend.git
   cd nombre-del-repositorio-frontend
   ```

2. **Instalar Dependencias:**
   Tener Node.js instalado, luego ejecuta:
   ```bash
   npm install
   ```

3. **Configurar el Puerto del API:**
   En el código del proyecto, el puerto del API se define mediante la constante `ApiPort`. Para configurarlo según tu entorno local, busca la declaración de `const ApiPort` en el archivo App.js y actualiza su valor al puerto que utiliza tu back-end.

   Por ejemplo, si tu back-end está configurado en el puerto `3000`, cambia:
   ```javascript
   const ApiPort = 81;
   ```
   a:
   ```javascript
   const ApiPort = 3000;
   ```

4. **Iniciar el Proyecto:**
   Ejecuta el siguiente comando para levantar el servidor de desarrollo:
   ```bash
   npm start
   ```

---

## **Características Principales**

- **Interfaz Gráfica:**
  - Pantallas intuitivas para gestionar productos, sucursales, clientes, pedidos y empleados.
  - Formularios amigables para ingresar y actualizar datos.
  
- **Conexión al Back-End:**
  - Todas las solicitudes HTTP se realizan hacia el back-end de **InventorySystem**, gestionando la lógica de negocio y datos.

- **Actualización Dinámica:**
  - Cambios en tiempo real en el inventario y otras entidades clave.

---

## **Estructura del Proyecto**

```plaintext
src/
├── Cliente/            # Archivos encargados de gestionar Cliente
├── css/                # Archivos CSS
├── DetallePedido/      # Archivos encargados de gestionar Detalle Pedido
├── Empleado/           # Archivos encargados de gestionar Empleado
├── Home/               # Archivo que maneja la paginal principal del sistema
├── img/                # Imagenes que utiliza el sistema
├── Inventario/         # Archivos encargados de gestionar Inventario
├── Pedidos/            # Archivos encargados de gestionar Pedidos
├── Producto/           # Archivos encargados de gestionar Producto
├── Proveedor/          # Archivos encargados de gestionar Proveedor
├── Sucursales/         # Archivos encargados de gestionar Sucursales
├── TipoEmpleado/       # Archivos encargados de gestionar Tipo Empleado
├── TipoProducto/       # Archivos encargados de gestionar Tipo Producto
├── App.js              # Punto de entrada principal de la aplicación
├── index.js            # Renderizado de la aplicación
```

---

## **Integración con el Back-End**

Este proyecto depende del back-end para todas las operaciones de negocio y gestión de datos. Asegúrate de que el back-end esté configurado y en funcionamiento antes de iniciar el front-end. Consulta el repositorio del back-end para más detalles: [InventorySystem - Back-End](https://github.com/SebasValverde/BackEndInventorySystem.git).

---

## **Contribuciones**

Este proyecto está abierto a contribuciones. Si tienes sugerencias o mejoras, siéntete libre de abrir un *pull request* o crear un *issue*.

