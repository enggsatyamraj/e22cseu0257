# Social Media Analytics Dashboard

A responsive Next.js application that provides analytics for a social media platform, built with:

- Next.js 14 (App Router)
- Tailwind CSS
- React Hooks & Context API

## Features

- **Authentication System**:
  - Custom registration form
  - Login with existing credentials
  - Fixed token support
  - Server error message display

- **Top Users Page**: Displays the top 5 users with the highest post counts
- **Trending Posts**: Shows posts with the highest number of comments
- **Latest Posts Feed**: Real-time feed of the most recent posts

## Project Structure

```
/src
  /app                 # Next.js app directory
    /feed              # Feed page
    /trending          # Trending posts page
    /register          # Registration page
    /login             # Login page
    page.js            # Home page (top users)
    layout.js          # Root layout
    globals.css        # Global styles
  /components          # React components
    /ui                # UI components
    PostCard.js        # Post card component
    Unauthorized.js    # Unauthorized component
  /context             # React context
    SocialContext.js   # Social media context provider
  /services            # API services
    apiService.js      # API service for data fetching
    authService.js     # Authentication service
```

## Setup & Running

1. Clone the repository:
   ```
   git clone https://github.com/enggsatyamraj/e22cseu0257.git
   cd e22cseu0257
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The application uses the following API endpoints:

- **Registration**: `POST /register`
- **Authentication**: `POST /auth`
- **Get Users**: `GET /users`
- **Get User Posts**: `GET /users/:userid/posts`
- **Get Post Comments**: `GET /posts/:postid/comments`

## Authentication Options

The application provides multiple authentication methods:

1. **Quick Register**: One-click registration with default credentials
2. **Custom Registration**: Custom form to register with your own details
3. **Login**: Use existing credentials if you've already registered

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Real-time Data**: Refresh capabilities to get the latest data
- **Error Handling**: Proper display of server error messages
- **Loading States**: Visual feedback during data fetching
- **Optimized Performance**: Efficient data fetching and rendering

## Future Enhancements

- User profile pages
- Post interaction features (like, comment)
- Advanced analytics and metrics
- Dark mode support
- Offline support with PWA features

## Author

[Satyam Raj](https://github.com/enggsatyamraj)

## License

This project is open source and available under the [MIT License](LICENSE).
