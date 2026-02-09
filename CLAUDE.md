# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bryant Technology Solutions website - a static marketing site built with Jekyll and hosted on GitHub Pages. The site provides IT consulting and managed services information with integrated contact forms and legal pages.

## Build & Development Commands

### Local Development
```bash
# Install dependencies (Ruby gems)
bundle install

# Serve the site locally with live reload
bundle exec jekyll serve

# Build the site (outputs to _site/)
bundle exec jekyll build
```

The site will be available at `http://localhost:4000` when serving locally.

### Deployment
This site is configured for GitHub Pages deployment. Pushes to the main branch automatically trigger a build and deploy.

## Architecture

### Jekyll Site Structure

- **_layouts/**: Page templates
  - `default.hml` - Main site layout with header/footer (note: `.hml` extension but is HTML)
  - `legal.html` - Layout for privacy/terms/cookie policy pages

- **_includes/**: Reusable components
  - `header.html` - Site header with responsive navigation
  - `footer.html` - Site footer with cookie banner and reveal animations

- **Content Pages**: Markdown files in root
  - `index.md` - Homepage with hero section
  - `about.md`, `services.md`, `contact.html` - Main pages
  - `privacy.md`, `terms.md`, `cookie-policy.md` - Legal pages
  - `thank-you.md` - Form submission confirmation page

- **assets/**:
  - `css/style.css` - All site styles
  - `js/contact.js` - Contact form submission handler
  - `images/` - Logo and hero background

### Key Configuration

**_config.yml**: Site-wide settings
- Uses kramdown for Markdown processing
- GitHub Pages compatible setup
- Includes jekyll-sitemap plugin
- No theme (custom HTML/CSS)

**CNAME**: Domain configuration for GitHub Pages

### Contact Form Implementation

The contact form has dual submission paths:

1. **Formspree** (in HTML form action): `https://formspree.io/f/xvzpnqgq`
   - Configured with redirect to `/thank-you/`
   - Includes honeypot field (`company`) for spam protection

2. **AWS Lambda API** (in contact.js): `https://hgy8rk84xb.execute-api.us-east-2.amazonaws.com/contact`
   - JavaScript handles async submission
   - Includes Cloudflare Turnstile (site key: `0x4AAAAAACI6h2yM0VGoPPJ1`)

### JavaScript Features

- **Mobile Navigation**: Hamburger menu toggle in header.html
- **Cookie Banner**: LocalStorage-based consent in footer.html
- **Reveal Animations**: Intersection Observer for scroll animations
- **Analytics**: Google Analytics (G-BVMGSMJSN4) loaded with 1s delay

## Important Notes

- The main layout file has a `.hml` extension but is actually HTML - this may be intentional or a typo
- The `_site/` directory is gitignored and should not be committed
- `Gemfile.lock` is gitignored per the .gitignore but currently exists in the repo
- The site uses no Jekyll theme - all styling is custom CSS
