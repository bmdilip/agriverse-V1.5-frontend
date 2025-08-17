# Agriverse - Production Frontend

A production-ready React application for agricultural investments and real-world asset tokenization with complete front-end and back-end integration.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
VITE_API_BASE_URL=https://api.agriverse.io
VITE_CHAIN_ID=56
VITE_USE_MOCK_DATA=true

# Admin Preview Mode (Development Only)
VITE_ADMIN_PREVIEW=true

# Mock Addresses for Testing
VITE_MOCK_ADMIN_ADDRESS=0x1234567890123456789012345678901234567890
VITE_MOCK_SUPERADMIN_ADDRESS=0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
```

### Mock Data Mode

**Development Feature**: Uses mock data when API is unavailable.

- Set `VITE_USE_MOCK_DATA=true` to enable mock data
- Automatically enabled when `VITE_API_BASE_URL` is empty
- Provides sample NFTs, certificates, and user data
- Perfect for development and testing

### Admin Preview Mode

**Development Feature**: Allows access to admin dashboards without wallet connection.

- Set `VITE_ADMIN_PREVIEW=true` to enable
- Set `VITE_ADMIN_PREVIEW=false` or remove for production
- Shows preview banner when active
- Bypasses wallet authentication for `/admin-dashboard` and `/superadmin-dashboard`
- Auto-connects preview wallet for testing

## 📁 Architecture

### Folder Structure
```
src/
├── api/              # API clients and endpoints
│   ├── http.ts       # Axios configuration
│   ├── nft.ts        # NFT operations
│   ├── user.ts       # User management
│   ├── admin.ts      # Admin operations
│   ├── assets.ts     # Asset marketplace
│   ├── certificate.ts # RWAcert operations
│   ├── yield.ts      # Yield management
│   ├── carbon.ts     # Carbon credits
│   ├── insurance.ts  # Insurance operations
│   └── kyc.ts        # KYC verification
├── store/            # Global state management
│   ├── auth.store.ts # Authentication state
│   └── ui.store.ts   # UI state
├── hooks/            # Custom React hooks
│   ├── useAuth.ts    # Authentication hook
│   └── useAdminGuard.ts # Route protection
├── components/       # Reusable UI components
│   └── ui/           # Base UI components
├── data/             # Mock data for development
│   └── mockData.ts   # Sample NFTs, certificates, users
├── modules/          # Feature modules
│   └── admin/        # Admin-specific components
├── pages/            # Route-level pages
└── utils/            # Helper functions and error handling
```

### State Management

- **Zustand**: Global state (auth, UI)
- **React Query**: Server state and caching
- **Local Storage**: Persistent auth tokens
- **Error Boundary**: Global error handling

### API Integration

All API calls are centralized in `src/api/` with:
- Typed interfaces
- Error handling
- JWT authentication
- Request/response interceptors
- Mock data fallbacks
- Retry logic and caching

## 🛡️ Authentication & Authorization

### Roles
- **User**: Basic access to marketplace and dashboard
- **Admin**: Project management and user oversight
- **SuperAdmin**: Full system control

### Route Guards
- `/admin-dashboard`: Requires admin or superadmin role
- `/superadmin-dashboard`: Requires superadmin role
- Admin Preview mode bypasses these checks in development
- Auto-connects preview wallet in development mode

## 🔧 Error Handling & Resilience

### Network Error Handling
- Graceful fallback to mock data when API is unavailable
- User-friendly error messages
- Retry mechanisms with exponential backoff
- Global error boundary for unexpected errors

### Mock Data System
- Complete sample dataset for all features
- Realistic data for testing workflows
- Automatic fallback when API calls fail
- Maintains UI functionality without backend

## 🔗 API Endpoints Mapping

| UI Action | API Endpoint | Description |
|-----------|--------------|-------------|
| **Marketplace** |
| Load NFTs | `GET /api/assets` | Fetch marketplace listings |
| Filter/Search | `GET /api/assets?filters` | Apply filters and search |
| **User Dashboard** |
| Load Portfolio | `GET /api/user/dashboard/:address` | User stats and NFTs |
| Update Profile | `PUT /api/user/profile/:address` | Update user information |
| **RWAcert** |
| My Certificates | `GET /api/certificate/user/:address` | User's certificates |
| Claim Certificate | `POST /api/certificate/issue` | Issue new certificate |
| Download PDF | Certificate `pdfUrl` field | Download certificate |
| **Admin Dashboard** |
| Project List | `GET /api/assets` | All projects for admin |
| Create Project | `POST /api/assets` | Create new asset batch |
| Go Live | `PUT /api/assets/:id/go-live` | Make project live |
| Update Project | `PUT /api/assets/:id` | Modify project settings |
| User Management | `GET /api/admin/users` | All users list |
| Pending Approvals | `GET /api/admin/approvals/pending` | Items needing approval |
| **Yield Management** |
| Create Distribution | `POST /api/yield/create` | Setup yield distribution |
| View History | `GET /api/yield/asset/:assetId` | Asset yield history |
| Calculate ROI | `GET /api/yield/roi/:assetId` | ROI calculations |

## 🧪 Development & Testing

### Mock Data Features
- Complete NFT marketplace with sample listings
- User certificates and verification workflows
- Admin dashboard with project management
- All features work without backend connection

### Testing Modes
1. **Full Mock Mode**: `VITE_USE_MOCK_DATA=true` - All data from mock files
2. **API with Fallback**: `VITE_USE_MOCK_DATA=false` - Try API, fallback to mock
3. **Production Mode**: Real API with no fallbacks

## 🎨 UI Components

### Reusable Components
- `<DataTable />`: Sortable, searchable tables with pagination
- `<FilterBar />`: Dynamic filter interface
- `<ConfirmModal />`: Action confirmation dialogs
- `<FileUpload />`: Drag-and-drop file uploads
- `<AddressShort />`: Shortened wallet addresses with copy
- `<ErrorBoundary />`: Error handling wrapper

### Design System
- **Colors**: Agri-themed palette (primary green, accent gold)
- **Typography**: Outfit font family
- **Spacing**: 8px grid system
- **Components**: Consistent glassmorphism effects
- **Error States**: Consistent error handling UI

## ✅ Functional Features

### NFT Marketplace
- ✅ OpenSea-style filters and search
- ✅ Grid and list view modes
- ✅ Pagination and sorting
- ✅ Asset type filtering
- ✅ Price range filtering
- ✅ Certification badges

### RWAcert System
- ✅ Certificate management
- ✅ Download functionality
- ✅ Status tracking
- ✅ Claim/reissue workflows

### Admin Dashboard
- ✅ Project management
- ✅ User administration
- ✅ Certificate engine
- ✅ Yield management
- ✅ Role-based access

### User Dashboard
- ✅ Portfolio overview
- ✅ NFT management
- ✅ ROI tracking
- ✅ Activity history

### Mock Addresses
Configure in `.env` for testing different user roles:
- `VITE_MOCK_ADMIN_ADDRESS`: Admin role testing
- `VITE_MOCK_SUPERADMIN_ADDRESS`: SuperAdmin role testing
- `VITE_MOCK_USER_ADDRESS`: Regular user testing

## 🚀 Deployment

### Production Checklist
- [ ] Set `VITE_ADMIN_PREVIEW=false`
- [ ] Set `VITE_USE_MOCK_DATA=false`
- [ ] Configure production API URL
- [ ] Update contract addresses
- [ ] Test all role-based access
- [ ] Verify API integration
- [ ] Test wallet connection flow
- [ ] Validate error handling

### Build
```bash
npm run build
```

The `dist/` folder contains the production build ready for deployment.

## 🔄 Migration Notes

### Route Changes
- `/marketplace` → `/nft-marketplace`
- `/rwacert` → `/rwa-cert`
- New: `/rwa-cert/my` (My Certificates)

### Enhanced Features
- OpenSea-style marketplace filters
- Production-ready API integration
- Role-based access control
- Admin Preview mode for development
- Comprehensive error handling
- Mobile-responsive design
- Mock data system for development
- Global error boundary
- Resilient network handling

## 🔧 Troubleshooting

### Common Issues

**NFT Marketplace not loading:**
- Check `VITE_USE_MOCK_DATA=true` in `.env`
- Verify API endpoint in `VITE_API_BASE_URL`
- Check browser console for network errors

**Admin Dashboard access denied:**
- Ensure `VITE_ADMIN_PREVIEW=true` for development
- Check wallet connection status
- Verify role assignment

**API Connection Issues:**
- Set `VITE_USE_MOCK_DATA=true` for offline development
- Check network connectivity
- Verify API endpoint configuration

## 📞 Support

For technical issues or questions:
- Check the console for API errors
- Verify environment configuration
- Ensure wallet connection for non-preview mode
- Review role assignments for access issues
- Use mock data mode for development without backend
- Check error boundary logs for unexpected errors