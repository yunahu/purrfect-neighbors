# Purrfect Neighbors

## Detailed Requirements

### Functional Requirements

1. **User Registration and Profiles**
   - Users can log in with their google account.
   - Users can create a new account by providing their email and password.
   - Users can update their profile information: username, password, and profile picture.
   - Users can manage their posts and comments: click to view, delete.
2. **Search and Filter**
   - Users can search for pets based on various criteria.
   - Users can filter pets by type, breed, age, and location.
3. **Interactive Map**
   - Users and anonymous visitors can view a map displaying locations of nearby adoptable pets and friendly pet products donations.
   - Users and anonymous visitors can click on the map markers to view more information.
4. **User Posts and Comments**
   - Users can create posts about sharing or exchange.
   - Users can comment on posts.
   - Users can delete their posts and comments.
5. **Anonymous Visitor**
   - Anonymous visitors can view the homepage (map view)
   - To search for pets or post comments, anonymous visitors need to register or log in.

### Non-functional Requirements

1. Performance
2. Security
3. Usability
4. Scalability

## Data Flow

1. **User Actions**
   - Users interact with the frontend.
   - The frontend sends requests to the backend.
2. **Backend**
   - The backend processes the requests.
   - The backend interacts with the database.
   - The backend sends responses to the frontend.
3. **Database**
   - The database stores user information, posts, comments.
   - The database responds to the queries from the backend.
4. **Mapbox API**
   - The frontend interacts with the Mapbox API to display the map.
5. **Petfinders’ Free API**
   - The frontend requests pet data, either from Redis if cached, SQLite if not cached, or the Petfinders’ Free API if not available in SQLite.
   - The backend fetches and caches pet data, updates the database, and sends the data to the frontend.
6. **Authentication**
   - The backend interacts with Google OAuth for user authentication.

## Data Schema

1. **User**
   - id
   - username
   - email
   - password
   - profile picture
2. **Post**
   - id
   - user_id
   - title
   - content
   - created_at
3. **Comment**
   - id
   - user_id
   - post_id
   - content
   - created_at
4. **Pet Information** (fields may vary depending on the API)
   - id
   - name
   - type
   - breed
   - age
   - location
   - description
   - photos

## Pages and Components

0. **Base Layout**
   - Navbar
     - Logo (Home Link)
     - Quick Search
     - User Profile
       - If logged in: Avatar, Username, Logout Button
       - If not logged in: Login/Register Button
   - [Page Content]
   - Footer
     - Copyright
     - Social Media Links
1. **Homepage**
   - Search and Filter
   - Map
     - Markers for adoptable pets and pet products
     - Click to open a popup with more information
     - Click the popup to view the details page
2. **Pet Details**
   - Pet Details (image, description, attributes)
   - Contact
3. **Sharing Posts**
   - List of sharing posts
   - Create a new post
4. **New Post**
   - Post Form
     - Title
     - Content
   - Cancel Button
5. **Post Details**
   - Post Details (title, content, comments)
   - Created by
   - Comments List
   - Comment Input
6. **User Profile**
   - User Information
   - Edit Profile
   - Manage Posts and Comments
7. **Login**
   - Login Form
   - Register Link
   - Google Login Button
8. **Register**
   - Register Form
   - Login Link
   - Google Login Button
9. **404 Page**
   - Not Found Message
   - Home Link
10. **Loading Spinner**

- Loading Spinner
- Smaller Spinner for buttons
