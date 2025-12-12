# SevaDaan NGO Platform

## 🌟 Project Overview

SevaDaan is a comprehensive digital platform designed to connect NGOs, volunteers, and donors in India. The platform facilitates seamless collaboration for social causes, enabling efficient management of volunteer programs, donation campaigns, and community outreach initiatives.

### 🎯 Key Features

- **NGO Management**: Complete profile management for non-profit organizations
- **Volunteer Coordination**: Streamlined volunteer recruitment and management
- **Donation Processing**: Secure donation handling with receipt generation
- **Grant Management**: Application and tracking system for funding opportunities
- **Program Management**: Event and program coordination tools
- **Real-time Dashboard**: Analytics and reporting for all stakeholders

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │   (Express)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite as build tool
- React Router for navigation
- Context API for state management

**Backend:**
- Node.js with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing

## 📁 Project Structure

```
SevaDaan/
├── Frontend/                    # React frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/        # Layout, Header, Footer
│   │   │   ├── ui/            # Button, Card, Input, etc.
│   │   │   ├── icons/         # Icon components
│   │   │   ├── forms/         # Form components
│   │   │   ├── ngo/           # NGO-specific components
│   │   │   └── volunteer/     # Volunteer components
│   │   ├── pages/             # Page components
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── account/       # Profile settings
│   │   │   └── donations/     # Donation pages
│   │   ├── context/           # React Context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service functions
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions
│   │   └── lib/               # Third-party integrations
│   ├── package.json
│   └── vite.config.ts
├── Backend/                     # Node.js backend application
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API route definitions
│   │   ├── middleware/        # Authentication, validation
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   ├── config/            # Configuration files
│   │   └── data/              # Mock data and seeds
│   ├── logs/                  # Application logs
│   ├── uploads/               # File uploads
│   └── package.json
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v5.0.0 or higher)
- **Git** (latest version)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd SevaDaan
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` file in Backend directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/sevadaan
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d
   
   # File Upload
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=2000000
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5174
   ```

5. **Start the Application**

   **Backend** (Terminal 1):
   ```bash
   cd Backend
   npm run dev
   # Server runs on http://localhost:3000
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd Frontend
   npm run dev
   # App runs on http://localhost:5174
   ```

## 🔧 Development Guide

### Adding New Features

#### 1. Frontend Components

**Creating a New Page:**
```typescript
// src/pages/NewPage.tsx
import React from 'react';
import Layout from '../components/common/Layout';

const NewPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">New Page</h1>
        {/* Your content here */}
      </div>
    </Layout>
  );
};

export default NewPage;
```

**Adding Routes:**
```typescript
// src/App.tsx
import NewPage from './pages/NewPage';

// Add to Routes component
<Route path="/new-page" element={<NewPage />} />
```

**Creating UI Components:**
```typescript
// src/components/ui/NewComponent.tsx
import React from 'react';
import { cn } from '../../lib/utils';

interface NewComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  );
};
```

#### 2. Backend APIs

**Creating a New Controller:**
```typescript
// src/controllers/newController.ts
import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

export const getNewData = asyncHandler(async (req: Request, res: Response) => {
  // Your logic here
  res.status(200).json({
    success: true,
    data: [],
    message: 'Data retrieved successfully'
  });
});
```

**Adding Routes:**
```typescript
// src/routes/newRoutes.ts
import express from 'express';
import { getNewData } from '../controllers/newController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, getNewData);

export default router;
```

**Register Routes in App:**
```typescript
// src/app.ts
import newRoutes from './routes/newRoutes';

app.use('/api/v1/new-endpoint', newRoutes);
```

#### 3. Database Models

**Creating a New Model:**
```typescript
// src/models/NewModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface INewModel extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewModelSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
}, {
  timestamps: true
});

export default mongoose.model<INewModel>('NewModel', NewModelSchema);
```

### Code Style Guidelines

1. **TypeScript**: Use strict typing throughout
2. **Naming Conventions**:
   - Components: PascalCase (`UserProfile`)
   - Functions: camelCase (`getUserData`)
   - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
   - Files: kebab-case (`user-profile.tsx`)

3. **Component Structure**:
   ```typescript
   // Imports
   import React from 'react';
   
   // Types/Interfaces
   interface Props {
     // ...
   }
   
   // Component
   const Component: React.FC<Props> = ({ prop1, prop2 }) => {
     // Hooks
     const [state, setState] = useState();
     
     // Functions
     const handleAction = () => {
       // ...
     };
     
     // Render
     return (
       <div>
         {/* JSX */}
       </div>
     );
   };
   
   export default Component;
   ```

## 📊 Database Schema

### Key Collections

1. **Users**
   - Authentication and profile information
   - Roles: admin, ngo_admin, volunteer, donor

2. **NGOs**
   - Organization profiles and verification status
   - Contact information and social links

3. **Programs**
   - NGO-created programs and events
   - Volunteer requirements and capacity

4. **Volunteers**
   - Volunteer applications and assignments
   - Skills and availability tracking

5. **Donations**
   - Transaction records and receipts
   - Campaign tracking and analytics

6. **Grants**
   - Funding opportunities and applications
   - Review and approval workflow

## 🔐 Authentication & Authorization

### User Roles

1. **Public User**: Browse NGOs, programs, and volunteer opportunities
2. **Registered User**: Apply for volunteering, make donations
3. **Volunteer**: Access volunteer dashboard, track applications
4. **NGO Admin**: Manage organization profile, programs, volunteers
5. **System Admin**: Platform administration and oversight

### JWT Implementation

```typescript
// Login endpoint returns JWT token
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "role": "volunteer"
  }
}

// Include in requests as Bearer token
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## 🎨 UI/UX Guidelines

### Design System

**Colors:**
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

**Typography:**
- Headings: Inter font family
- Body: System fonts
- Responsive font sizes using Tailwind utilities

**Components:**
- Consistent spacing using Tailwind's spacing scale
- Rounded corners (rounded-lg for cards, rounded-md for inputs)
- Shadow system for depth
- Hover and focus states for interactivity

### Responsive Design

```css
/* Mobile-first approach */
.container {
  @apply px-4;          /* Mobile */
  @apply md:px-6;       /* Tablet */
  @apply lg:px-8;       /* Desktop */
}
```

## 🔧 API Documentation

### Base URL
`http://localhost:3000/api/v1`

### Authentication Endpoints

```http
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/me
```

### NGO Endpoints

```http
GET    /ngos              # List all NGOs
GET    /ngos/:id          # Get specific NGO
POST   /ngos              # Create NGO (admin only)
PUT    /ngos/:id          # Update NGO
DELETE /ngos/:id          # Delete NGO
```

### Volunteer Endpoints

```http
GET    /volunteer-opportunities    # List opportunities
GET    /volunteer-opportunities/:id # Get specific opportunity
POST   /volunteers/apply          # Apply for opportunity
GET    /volunteers/my-applications # User's applications
```

### Donation Endpoints

```http
POST   /donations                 # Create donation
GET    /donations/history         # User's donation history
GET    /donations/:id/receipt     # Download receipt
```

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd Frontend
npm test

# E2E tests
npm run test:e2e
```

### Test Structure

```typescript
// Example test file
describe('User Authentication', () => {
  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
```

## 🚀 Deployment

### Production Build

```bash
# Frontend
cd Frontend
npm run build

# Backend
cd Backend
npm run build
```

### Environment Variables (Production)

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sevadaan
JWT_SECRET=super-secure-production-secret
FRONTEND_URL=https://yourdomain.com
```

### Docker Deployment

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   
   # Or use different port
   PORT=3001 npm start
   ```

2. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify network access

3. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript Errors**
   ```bash
   # Check TypeScript compilation
   npx tsc --noEmit
   ```

### Debug Mode

```bash
# Backend with debug logging
DEBUG=app:* npm run dev

# Frontend with verbose logging
VITE_LOG_LEVEL=info npm run dev
```

## 📈 Performance Optimization

### Frontend

1. **Code Splitting**
   ```typescript
   // Lazy load components
   const LazyComponent = React.lazy(() => import('./Component'));
   ```

2. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

3. **Image Optimization**
   - Use WebP format when possible
   - Implement lazy loading
   - Responsive images with srcset

### Backend

1. **Database Indexing**
   ```typescript
   // Add indexes for frequently queried fields
   schema.index({ email: 1 });
   schema.index({ createdAt: -1 });
   ```

2. **Caching**
   ```typescript
   // Redis caching for frequently accessed data
   const cached = await redis.get(key);
   if (cached) return JSON.parse(cached);
   ```

3. **Pagination**
   ```typescript
   // Implement pagination for large datasets
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const skip = (page - 1) * limit;
   ```

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m "Add new feature"`
6. Push to branch: `git push origin feature/new-feature`
7. Create a Pull Request

### Code Review Process

1. All PRs require at least one review
2. Tests must pass
3. Code must follow style guidelines
4. Documentation must be updated

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(auth): add password reset functionality`
- `fix(ui): resolve mobile menu alignment issue`
- `docs(readme): update installation instructions`

## 📞 Support

### Getting Help

1. **Documentation**: Check this README first
2. **Issues**: Create a GitHub issue for bugs
3. **Discussions**: Use GitHub Discussions for questions
4. **Email**: support@sevadaan.org

### FAQ

**Q: How do I reset my local database?**
A: Drop the database and restart the server to re-seed with test data.

**Q: Why are my API calls failing?**
A: Check if the backend server is running and verify the API endpoints.

**Q: How do I add a new user role?**
A: Update the User model, add role checks in middleware, and update the frontend permissions.

## 📋 Changelog

### Version 1.0.0 (Current)
- Initial release
- Basic NGO and volunteer management
- Donation processing
- User authentication

### Planned Features
- Mobile app development
- Advanced analytics dashboard
- Integration with payment gateways
- Automated email notifications
- Multi-language support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the NGO community in India
- Special thanks to all contributors
- Inspired by the need for better digital tools for social causes

---

**Happy Coding! 🚀**

For any questions or support, please reach out to the development team.
