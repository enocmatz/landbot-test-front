# Landbot Challenge

A wizard-like application that demonstrates the integration of different message "Cards" using the Landbot platform. This project showcases a clean separation between component usage and rendering through React Context, enabling efficient testing and development.

## Features

- Dynamic message card rendering based on message type
- Component-based architecture using React
- Context-based state management
- Testing-friendly architecture with component separation
- Integration with Landbot platform

## Prerequisites

- Node.js (version specified in package.json)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd landbot-challenge
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

The project follows a component-based architecture with a clear separation between:
- Component usage (business logic)
- Component rendering (presentation)

This separation is managed through React Context, allowing for:
- Easier testing through component mocking
- If I Mock LandBot Chat stream i can reduce consumption of chat credits during testing
- Better maintainability and separation of concerns

## Testing

The project is designed with testing in mind. The separation of component usage and rendering allows for:
- Mocking of Landbot interactions
- Testing without consuming chat credits
- Isolated testing of business logic and presentation

## Security Considerations

The project currently has an open question regarding CORS configuration. The goal is to:
- Restrict valid domains for requests
- Prevent unauthorized usage of chat credits


## Technologies Used

- React 19
- TypeScript
- Vite
- Landbot Core
- RxJS
- DOMPurify (for security)
