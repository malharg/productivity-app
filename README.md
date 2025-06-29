# Personal Productivity App (GTD)

A simple mobile application built with React Native and Expo, based on the principles of the "Getting Things Done" (GTD) methodology. This app helps you capture, process, and engage with your tasks efficiently.

## App Preview

_It is highly recommended to add a screenshot or a short GIF of your app in action here! A visual preview makes a huge difference._

![App Screenshot Placeholder](https://via.placeholder.com/300x600.png?text=Add+App+Screenshot+Here)

## Core Features

*   **Capture:** A dedicated **Inbox** screen to quickly jot down any task, idea, or to-do item that comes to mind.
*   **Process & Organize:**
    *   Process items from the Inbox to define them as a **Next Action**.
    *   Create new **Projects** on the fly.
    *   Assign a **Context** (e.g., `@computer`, `@home`) to any Next Action.
*   **Engage:**
    *   View all your **Next Actions** in one place.
    *   Filter your actions by their assigned Context or Project to focus on what you can do now.
    *   Mark tasks as **complete** to clear them from your action list.
*   **Data Persistence:** Your data is saved locally on your device, so your tasks are always there when you reopen the app.

## Tech Stack

*   **Framework:** React Native with Expo
*   **Language:** TypeScript
*   **Navigation:** Expo Router (File-based routing)
*   **State Management:** React Context API
*   **Local Storage:** AsyncStorage
*   **UI Components:** `react-native-dropdown-picker` for a consistent cross-platform dropdown experience.
*   **Unique IDs:** `uuid` library for generating unique identifiers for tasks and projects.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Git](https://git-scm.com/)
*   The **Expo Go** app on your iOS or Android device.
    *   [Download for iOS (App Store)](https://apps.apple.com/us/app/expo-go/id982107779)
    *   [Download for Android (Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation & Setup

1.  **Clone the repository:**
    Open your terminal and run the following command to clone the project.
    ```bash
    git clone https://github.com/malharg/productivity-app.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd productivity-app
    ```

3.  **Install dependencies:**
    Use `npm` to install all the required packages for the project.
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    Once the dependencies are installed, run the following command to start the Expo development server.
    ```bash
    npx expo start
    ```

2.  **Open the app on your phone:**
    The command will start a new process in your terminal and display a QR code.

    *   **On iOS:** Open the default Camera app and point it at the QR code. A notification will appear to open the project in Expo Go.
    *   **On Android:** Open the Expo Go app and tap "Scan QR Code". Point your camera at the QR code in your terminal.

The app will now be running on your device, and you can start testing. Any changes you make to the code will automatically reload the app.

## Project Structure

The project code is organized to be clean and maintainable:

```
productivity-app/
├── app/                  # Contains all screens and navigation logic (Expo Router)
│   ├── (tabs)/           # Layout group for the main tab bar
│   │   ├── _layout.tsx   # Configuration for the tab navigator
│   │   ├── index.tsx     # The default "Inbox" screen
│   │   ├── actions.tsx   # The "Next Actions" screen
│   │   └── projects.tsx  # The "Projects" screen
│   ├── _layout.tsx       # Root layout of the app
│   └── process-task.tsx  # Screen for processing an individual task
│
├── src/                  # Main source code directory
│   ├── components/       # Reusable UI components (e.g., TaskInput)
│   ├── context/          # Contains the DataContext for state management
│   └── hooks/            # Custom hooks (e.g., useData)
│
└── README.md             # This file
```
