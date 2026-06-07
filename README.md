# Sudarshan Tupare Photography Website

A premium, modern photography business website built with Next.js, Tailwind CSS, and Framer Motion.

## 🌟 Features

- **Modern Design**: Premium dark theme with gold accents
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Optimized for speed and SEO
- **Interactive**: Smooth animations and micro-interactions
- **Gallery**: Advanced portfolio with lightbox functionality
- **Booking System**: Complete booking form with WhatsApp integration
- **Admin Panel**: Basic admin interface for managing content
- **SEO Optimized**: Meta tags, OpenGraph, and structured data

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Next.js Image optimization
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
sudarshan-tupare-photography/
├── app/                    # Next.js app directory
│   ├── admin/              # Admin panel
│   ├── about/              # About page
│   ├── booking/            # Booking page
│   ├── contact/            # Contact page
│   ├── portfolio/          # Portfolio page
│   ├── services/           # Services & pricing page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── public/                # Static assets
│   └── images/           # Add your images here
├── lib/                   # Utility functions
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sudarshan-tupare-photography
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📸 Adding Your Images

### Portfolio Images

1. Add your images to `public/images/`
2. Update the image paths in `app/portfolio/page.tsx`
3. For best results, use images with these dimensions:
   - Landscape: 1200x800px
   - Portrait: 800x1200px
   - Square: 800x800px

### Hero Background

1. Replace the hero image in `app/page.tsx`
2. Recommended size: 1920x1080px
3. Use high-quality, professional photography

### About Page Images

1. Update images in `app/about/page.tsx`
2. Professional headshot: 400x400px
3. Equipment/studio images: 600x400px

## ⚙️ Configuration

### Updating Contact Information

Edit these files to update your contact details:

**Contact Info** (`components/Footer.tsx`):
```typescript
const phoneNumber = '+91 98765 43210'
const emailAddress = 'contact@sudarshanphotography.com'
const location = 'Mumbai, India'
```

**WhatsApp Number** (`components/WhatsAppButton.tsx`):
```typescript
const phoneNumber = '+919876543210'
```

### Updating Pricing

Edit pricing in `app/services/page.tsx`:

```typescript
const services = [
  {
    title: 'Wedding Photography',
    price: '₹50,000',
    // ... other details
  }
  // ... other services
]
```

### Social Media Links

Update social links in `components/Footer.tsx`:

```typescript
const socialLinks = [
  { href: 'https://instagram.com/yourprofile', label: 'Instagram' },
  { href: 'https://facebook.com/yourpage', label: 'Facebook' },
  // ... other social links
]
```

## 🔐 Admin Panel

Access the admin panel at `/admin` with these demo credentials:

- **Email**: admin@sudarshanphotography.com
- **Password**: admin123

**Features**:
- View and manage booking requests
- Upload and manage gallery images
- Basic content management

**⚠️ Security Note**: Change the admin credentials in a production environment and implement proper authentication.

## 📱 WhatsApp Integration

The website includes WhatsApp integration for:

1. **Quick Chat**: Floating WhatsApp button
2. **Booking**: Direct booking via WhatsApp
3. **Contact**: Quick contact option

Update your WhatsApp number in:
- `components/WhatsAppButton.tsx`
- `app/booking/page.tsx`
- `app/contact/page.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically build and deploy
   - Your site will be live at your-domain.vercel.app

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🎨 Customization

### Colors

Edit colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'charcoal': '#0a0a0a',
      'gold': '#d4af37',
      'gold-light': '#f4e5c2',
    }
  }
}
```

### Fonts

The project uses:
- **Playfair Display**: Elegant serif for headings
- **Inter**: Clean sans-serif for body text

Update fonts in `app/layout.tsx` and `tailwind.config.js`.

## 📊 Performance

The website is optimized for:

- **Lighthouse Score**: 90+ in all categories
- **Core Web Vitals**: Optimized for fast loading
- **Image Optimization**: Next.js Image component
- **SEO**: Meta tags, structured data, sitemap ready

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint      # Run ESLint
```

### Component Structure

- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Comprehensive footer with links and info
- **WhatsAppButton**: Floating WhatsApp chat button
- **Gallery**: Advanced portfolio with filters and lightbox
- **Forms**: Booking and contact forms with validation

## 🌐 SEO

The website includes:

- **Meta Tags**: Proper title, description, keywords
- **OpenGraph**: Social media sharing optimization
- **Structured Data**: Schema.org markup
- **Sitemap**: Auto-generated sitemap
- **Robots.txt**: Search engine instructions

## 📈 Analytics

To add analytics:

1. **Google Analytics**: Add to `app/layout.tsx`
2. **Meta Pixel**: Add to `app/layout.tsx`
3. **Custom Analytics**: Add tracking scripts as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:

- **Email**: contact@sudarshanphotography.com
- **Phone**: +91 98765 43210
- **WhatsApp**: +91 98765 43210

## 🔄 Updates

This website is built with scalability in mind. Regular updates recommended for:

- Security patches
- Performance improvements
- New features
- Browser compatibility

---

**Built with ❤️ for Sudarshan Tupare Photography**
