# Cricket Carnival

## Overview

Cricket Carnival is an interactive web application built with `Vue.js` that allows users to create their dream cricket team by selecting players from a pool of options. The application features player selection, coin management, and various filters to enhance the user experience. This project demonstrates modern web development practices, including state management, user notifications, and responsive design.

## Live Demo

Check out the live application: [Cricket Carnival](https://cricket-carnival-nhb.vercel.app/)

## Features

- **Player Selection & Management**: Users can select players for their team while adhering to coin limitations. Selected players can be removed or added back as desired.
- **Dynamic Filtering & Sorting**: Players can be filtered by country, type (batsman, bowler, all-rounder, wicket-keeper), and sorted by price and rating.
- **Local Storage Integration**: Selected player IDs are stored in local storage, ensuring user selections persist between sessions. The application handles deletions from both the UI and local storage.
- **Notifications**: Integrated with Notiflix and Vue3-Toastify for user alerts and notifications to enhance the user experience.

## Technologies Used

- **Frontend**: Vue.js
- **Styling**: Tailwind CSS
- **State Management**: Vue Composition API (with local state management)
- **User Notifications**: Vue3-Toastify, Notiflix
- **Date/Time Handling**: Day.js
- **Build Tool**: Vite

## Run the Project Locally

To run the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/nazmul-nhb/cricket-carnival.git
   cd cricket-carnival
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

4. **Open Your Browser**:
   Navigate to `http://localhost:5173` to see the application in action.

## Challenges & Improvements

This project also includes several additional features and improvements:

- **Responsive Layout**: The layout for selected players adjusts to different screen sizes with a three-column layout for desktop and a single-column view for mobile.
- **Coin Management**: Users can manage their coins effectively, ensuring they don't exceed a limit of 5,000,000 coins.
- **User Experience Enhancements**: Floating action buttons to claim more coins and clear visual cues improve navigation and usability.
