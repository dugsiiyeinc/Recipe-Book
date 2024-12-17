# Recipe Book

## Overview

Recipe Book is designed to solve the common problems faced by home cooks regarding the organization and retrieval of their recipes. Whether they're scattered across different websites, tucked into cookbooks, or scribbled on notes, managing and finding favorite recipes can be frustrating and time-consuming. This often complicates meal planning and can deter cooks from making the most of the ingredients they already have.

## Problem Statement

Home cooks often struggle to manage their myriad recipes, which can be dispersed across various physical and digital locations. This disorganization makes it challenging to store, categorize, and quickly find favorite recipes, leading to frustration during meal planning. Additionally, there is a need for a more dynamic way to discover new recipes that make use of available ingredients, which can help in reducing food waste and providing inspiration for meals.

## Solution

Recipe Book addresses these issues by offering a unified platform where users can:

- **Store Recipes**: Users can add their recipes to the platform, ensuring that all their favorites are stored in one easy-to-access location.
- **Categorize and Tag Recipes**: Recipes can be categorized or tagged, making them easy to organize and retrieve for later use.
- **Search Functionality**: Enhanced search functionality allows users to find recipes based on ingredients, categories, or tags.
- **Recipe Suggestions**: By integrating with an API, Recipe Vault can suggest new recipes based on the ingredients users already have at home, aiding in meal planning and minimizing food wastage.
- **Responsive Design**: The platform is fully responsive, ensuring a seamless experience on both desktops and mobile devices.


## Features
- **Add Recipes**: Users can add their own recipes, complete with ingredients, instructions, and images.
- **Browse Recipes**: A list view that allows users to scroll through recipes and select them to view detailed information.
- **Responsive Design**: Ensures a seamless user experience across various device sizes, from mobile phones to desktop computers.
- **Search Functionality**: Users can search for recipes based on ingredients, recipe titles, or tags.
- **User Authentication**: Secure sign-in and sign-up processes to manage user profiles and personalize the experience.

## Technology Stack

- **HTML**: Provides the structure for the web content.
- **CSS**: Ensures the application is visually appealing and functional across various devices.
- **JavaScript**: Enhances user interaction and integrates API functionality for dynamic recipe suggestions.
- **JSON**: API 


## Project Structure
  recipe-book/
  │
  ├── index.html                 # Homepage
  ├── recipes.html               # Recipes API
  ├── about.html                 # About page
  ├── contact.html               # Contact page
  ├── signin.html                # Sign In page
  ├── signup.html                # Sign Up page
  ├── addrecipe.html             # Add Recipe page
  ├── my-recipes.html            # My Recipes page
  │
  ├── styles.css                 # Main stylesheet
  ├── app.js                     # JavaScript for handling interactions
  ├── main.js                    # JavaScript for other features
  │
  ├── images/                    # Folder for images (logo, icons, recipe images)
  │   └── logo.png               # Example image
  │
  └── README.md                  # Project documentation

## Usage
 - View Recipes: Navigate to the Recipes page to view the list of available recipes.
 - Add a Recipe: Sign in and navigate to the Add Recipe page. Fill out the form and submit.
 - Edit or Delete Recipes: View your recipes in the My Recipes page, and click on the Edit or Delete button to modify or remove a recipe.
 - Dark Mode: Toggle between light and dark mode using the button in the header.
 - Contact Us: Use the Contact page form to send inquiries.

## Dark Mode Implementation
 - The project includes a toggle button for dark mode, which changes the theme of the application. In the CSS file (style.css), 
  variables are used to manage colors for both light and dark themes, and the dark mode styling is applied when the dark-mode class is added to the body tag.
  
## Getting Started
 - To set up the Recipe Book on your local machine:

    1. Clone the repository:
       ```bash
       git clone https://github.com/dugsiiyeinc/Recipe-Vault.git
    2. Navigate to the project directory:
        -cd Recipe-Book

## Team
  - Muzamil Tahlil Dahir
  - Ayaan Abdullahi Dhaqane

## Contact
- For any questions, feel free to reach out:

  - Email: contact@recipebook.com
  - Phone: +252615555555




