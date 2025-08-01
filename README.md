# 🔐 SecureVolt - File Vault System

SecureVolt is a cloud-based file vault application that ensures secure file storage and controlled access using unique vault keys. It includes role-based permissions and a clean, responsive React frontend.

## 🌟 Features

- 🔑 **Vault Key Authentication** – Secure access control using unique vault keys.
- 📁 **Role-Based Access** – Admins and users have separate dashboards and permissions.
- 📤 **File Upload** – Upload documents securely into your assigned vaults.
- 📄 **View Vault Contents** – Users can view files and folders inside the vault.
- 🧩 **Simple UI** – Minimalistic and responsive user interface using React and TailwindCSS.

## 🧩 Components

### Frontend (React)
- `Homepage.jsx` – Landing page with navigation options.
- `EnterKey.jsx` – Vault key input and access logic.
- `DashBoard.jsx` – Displays files and folders of the user’s vault.
- `AddContent.jsx` – Upload files or create folders into the vault.

### Backend (PHP)
- `check_key.php` – Validates the entered vault key and returns vault details.
- `create_folder.php` – Creates a new folder inside a vault.
- `upload_file.php` – Handles file uploads to the vault.
- `get_files.php` – Retrieves contents (files/folders) of a vault.
- `delete_file.php` – (Optional) Deletes a file or folder.

## 🗂️ Project Folder Structure

```
SecureVolt/
├── frontend/
│ ├── Homepage.jsx
│ ├── EnterKey.jsx
│ ├── DashBoard.jsx
│ └── AddContent.jsx
├── backend/
│ ├── check_key.php
│ ├── create_folder.php
│ ├── upload_file.php
│ └── get_files.php
├── public/
│ └── uploads/ # Stores vault files and folders
├── index.html
└── README.md
```
## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** PHP
- **Database:** MySQL
- **Icons:** Lucide React
