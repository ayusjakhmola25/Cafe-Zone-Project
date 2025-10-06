# Fusion Cafe 🍽️

**Fusion Cafe** is a responsive, single-page application (SPA) style demo showcasing a modern food delivery or cafeteria menu platform. It features a clean, blue-themed UI, dynamic navigation, restaurant listings, and a complete user authentication flow managed purely on the client-side.

---

## ✨ Key Features

### Interface & Design
* **Responsive Layout 📱:** Optimized design ensures the application looks great on both large desktops and small mobile screens.
* **Sticky Header:** The main navigation bar remains visible at the top for constant access to search and links.
* **Dynamic Visuals:** Subtle CSS animations like a spinning logo and a glowing title add a polished, modern touch.
* **Search & Filters 🔍:** Features a dedicated search input and toggles for viewing **All**, **Vegetarian**, or **Non-Vegetarian** options.
* **Restaurant Listing:** Displays restaurant cards in a flexible grid layout, complete with rating and pricing.

### User Logic (Client-Side Demo)

The entire user management system (Login, Register, Profile) is handled using **Vanilla JavaScript** and **browser Local Storage** to simulate a full application experience without a real backend server.

1.  **Registration:** Takes **Full Name, Email, and Password**. Data is saved to `localStorage` before redirecting to the login screen.
2.  **Login:** Validates the entered credentials against the data stored locally. On success, the user is directed to the main `cafeteria.html` dashboard.
3.  **Profile Management ⚙️:** Users can update personal details (Mobile, DOB, Gender). The original **Email ID** remains protected and is set as read-only.

---

## 📂 Project Structure Explained

The code is organized into dedicated HTML pages for views and two primary files for global functionality:

* **HTML Views (The Screens):** These files define the structure for each unique screen a user interacts with.
    * **`cafeteria.html`** 🏠: The **Main Dashboard** and Home Screen, featuring all the restaurant lists, categories, and main navigation.
    * **`login.html`** 🔑: The dedicated **Sign-in Page**.
    * **`register.html`** ✍️: The **Account Creation** (Sign-up) Page.
    * **`profile.html`** 👤: The **User Profile** area for viewing and editing saved details.

* **Core Assets (The Engine):** These two files power the application's look and behavior.
    * **`style.css`** 🎨: The central stylesheet for the entire application. It controls the responsive layout, defines the **soft blue and dark gray color theme**, and implements all visual effects.
    * **`script.js`** 💡: Contains all the functional JavaScript code, primarily managing the user authentication flow (`loginUser`, `registerUser`) and profile updates (`updateProfile`) using the browser's persistent `localStorage`.

---

## 🚀 How to Run the Demo

1.  Ensure all HTML, CSS, and JS files are placed in the same project directory.
2.  Open **`login.html`** or **`register.html`** directly in your web browser to begin the user flow.

***Note:*** Since this is a client-side only application, user data will only persist on the specific browser and device you use.
