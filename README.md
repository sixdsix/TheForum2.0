# Creator Information
- Name: Brandon Hughes & Nathan Miller
- Student ID: 2405732 & 2366380
- Chapman email: bhughes@chapman.edu & nathmiller@chapman.edu
- Course: CPSC458 Web Engineering

# Resources Used: 
- In-Class 

# How to build: 
- npm run dev

# Design Principles:
- We used a simplistic design as we didn't want users to feel overwhelmed by a lot of things that they could click on or use.
- Color Pallete:
    - #0079d3
    - #0056b3
    - #ccc
    - #ffffff
- Fonts: 
    - font-family: IBM Plex Sans, Arial, sans-serif;

# Purpose:
- Our application is an internet forum where people can post and communicate with others. While also, being able to comment on what others are doing. Bulletin boards have always been common, so using one online that saves the information in a database instead of having it on paper is helpful. 

# Multiple Screen Sizes:
- The application works well when you extend and make the screen size smaller, as the boxes jsut change shape to match them. 

# Netlify URL: 

# User Interaction:
- When first opening, the user must register an account. By registering, it keeps track of the email, password, as well as if there are any errors when creating the account such as already existing. The variables are then saved to supabase, with the password being encoded. Afterwards, the titles, the main content, and the user who created it are all listed in a forum aspect with it all listed. A user can then click on a button to create an entirely new post, or click on a post title to view/add a comment onto it. 

# Fetching & Persistent Data:
- Our website utilizes supabase to hold all users, posts, and comments on individual posts. When creating an account or logging in, it takes that information and holds it to create a post or comment. When a post is created it then assigns it an ID, in which the comments use that ID as a foreign key to display all comments made on that post.
