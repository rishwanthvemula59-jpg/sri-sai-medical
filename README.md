# 🏥 Sri Sai Medical Centre - Premium Healthcare Platform

Elite, production-ready UI system for modern clinics with AI health assistant, voice support, and real-time doctor availability.

## 📋 Project Structure

```
sri-sai-medical/
├── frontend/              # Vue.js 3 + Vite + Pinia
│   ├── src/
│   │   ├── components/    # Reusable UI components (ChatBot, VoiceAssistant, etc.)
│   │   ├── pages/         # Page components (Home, Doctors, Medicines, etc.)
│   │   ├── layout/        # Layout components (Navigation, Footer, Layout wrapper)
│   │   ├── stores/        # Pinia state management
│   │   ├── services/      # API & external services
│   │   ├── assets/        # Styles, images, icons
│   │   └── router/        # Vue Router configuration
│   └── index.html
│
├── backend/               # Express.js API
│   ├── routes/           # API endpoints
│   ├── middleware/        # Express middleware
│   ├── config/           # Configuration files
│   └── server.js
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase project setup (for real-time features)

### Installation

#### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

#### 2. Backend Setup
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3000
```

### Environment Configuration

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
# Firebase
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other variables
```

## 🎨 Design System

### Clinical Direct - Premium Red Theme

**Primary Colors:**
- Primary: #ba0013 (Sri Sai Medical Red)
- Danger: #FF4444 (Not Available)
- Success: #22c55e (Doctor Available)

**Typography:**
- Headings: Manrope (bold, 600-700 weight)
- Body: Inter (regular, 400 weight)

**Components:**
- Rounded corners: 16-24px (rounded-2xl)
- Soft shadows with blur effects
- Glassmorphism for premium feel
- Micro-interactions (smooth transitions, hover effects)

## 🧩 Core Features (MVP)

### Pages
1. **HomePage** - Doctor availability dashboard, hero section, featured doctors
2. **DoctorDirectory** - Grid of doctors with filters, ratings, specialization
3. **MedicineDetails** - Dosage schedule, voice playback, language selector
4. **Notifications** - Real-time alert timeline
5. **ScanCamera** - Barcode scanner for medicines
6. **ContactLocation** - Google Maps, clinic info, contact form
7. **AdminDashboard** - Read-only analytics (Phase 2: edit capabilities)

### AI Features
- **ChatBot** - Floating health assistant powered by OpenAI
  - Quick suggestions
  - Message history (localStorage)
  - Context-aware responses
  - Multi-language support

- **Voice Assistant** - Speech recognition & synthesis
  - 22 Indian language support (Phase 2)
  - Real-time voice input
  - Text-to-speech output
  - Accessible design for elderly users

### Real-time Features
- Doctor availability sync (Firebase Realtime DB)
- Live appointment confirmations
- Instant notifications
- Status indicators (Available/Busy/Offline)

## 🔌 API Endpoints

### Chat API
```
POST /api/chat
{
  "message": "I have a headache",
  "userLanguage": "en-IN",
  "context": [...]
}
```

### Doctors API
```
GET  /api/doctors             # Get all doctors
GET  /api/doctors/:id         # Get doctor details
POST /api/doctors/:id/status  # Update status (admin)
```

### Medicines API
```
GET  /api/medicines           # Get all medicines
GET  /api/medicines/:id       # Get medicine details
POST /api/medicines/barcode-lookup
```

### Appointments API
```
POST /api/appointments        # Create appointment
GET  /api/appointments/:id    # Get appointment details
```

### Contact API
```
POST /api/contact             # Submit contact form
GET  /api/contact/clinic-info # Get clinic info
```

## 🗣️ Voice Assistant Languages (Phase 2)

Supported Indian Languages (22 Official):
- English, Hindi, Bengali, Telugu, Marathi
- Tamil, Urdu, Gujarati, Kannada, Malayalam
- Odia, Punjabi, Assamese, Maithili, Sanskrit
- Sindhi, Konkani, Manipuri, Nepali, Bodo
- Dogri, Kashmiri, Santhali

## 🔐 Security

- Environment variables secured (never committed)
- Rate limiting on API endpoints
- CORS configuration
- Firebase security rules (read-only for clients)
- Input validation on all forms

## 📊 Performance Targets

- **Lighthouse Score:** 90+
- **Core Web Vitals:**
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1
- **Bundle Size:** < 500KB (gzipped)
- **API Response Time:** < 500ms (p95)

## 🔄 Real-time Updates

### Doctor Status Changes
```javascript
// Frontend listens to Firebase updates
subscribeToDb('/doctors/{docId}/status', (data) => {
  // Update UI immediately
})
```

### Notifications
```
/notifications/{userId}
```

## 🧪 Testing

### Unit Tests (Vitest)
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

## 🚢 Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Auto-deploys on `main` branch push
3. Environment variables via Vercel dashboard

### Backend (Options)
- **Option A:** Firebase Cloud Functions (serverless)
- **Option B:** Vercel Serverless Functions
- **Option C:** Traditional Node.js hosting (Render, Railway, etc.)

## 📖 API Documentation

See [API.md](./API.md) for detailed API documentation.

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📝 License

MIT License - see LICENSE for details

## 👥 Support

For issues and questions:
- 📧 Email: support@srisaimedical.com
- 💬 Chat: In-app AI assistant
- 🐛 Bugs: GitHub Issues

---

**Built with ❤️ for Sri Sai Medical Centre**

