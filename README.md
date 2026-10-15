# Velora Code

One website in plain HTML/CSS/JavaScript. No dependencies or build step.

## Open
Open dist/index.html, or run node server.cjs and visit http://127.0.0.1:4173.

## Files
- index.html: main homepage.
- about.html, services.html, projects.html, contact.html: supporting pages of this same site.
- project.html?id=0: design study detail.
- blog.html and blog-post.html?id=0: separate journal and articles.
- style.css: shared styles, original palette, themes, responsive rules and animation.
- script.js: editable content at the top, shared interactions below.
- images/: generated editorial assets.
- _redirects: compatibility with extensionless hosted URLs.

All website files are in dist. Only that folder is needed for static hosting. landing-page.html redirects to the main homepage.

## Personalise
Set contactEmail at the top of script.js to your real business inbox. Until then, the contact form previews a message locally and sends nothing.
Set contactPhone and location for the icon-based footer details. Set newsletterUrl to the newsletter provider's hosted signup page; until configured, the newsletter form clearly reports that signup is not open and stores no email addresses.

Add genuine approved reviews to reviews using {quote, name, company}. The customer-review carousel appears automatically when entries exist. No fabricated testimonials are displayed.

Portfolio projects are self-initiated design studies, not claimed client commissions. The imagery is generated artwork, not photographs of the actual Velora team or clients. Company metrics stay hidden until verified stats are supplied and statsAreDemo is false.

The original reference colours remain: #6366f1, #ec4899, #0f172a, #ffffff. Motion respects reduced-motion preferences. The mobile menu supports Escape and focus handling.

## Check
Run node scripts/check.cjs for JavaScript syntax and local asset references.
