# Aman Sharma — Portfolio

A buildless, responsive portfolio using semantic HTML, CSS, and vanilla JavaScript. No package installation or build step is required.

Open `index.html` directly or serve the repository with any static HTTP server.

## Validation

- JavaScript syntax: `node --check js/script.js`
- Whitespace / patch validation: `git diff --check`
- Preview at desktop and mobile widths; test menu, project details, anchor navigation, and form validation with a keyboard.

## Content notes

The repository contains portraits and a supplied biography, but no actual project screenshots or project demo URLs. Project showcases use local, lightweight SVG concept interfaces, each visibly labeled Illustrative mockup. These are not actual product captures and contain no real business data. Replace with approved screenshots when available.

LinkedIn and GitHub destinations are confirmed by the owner. Twitter/X has been removed. The owner confirmed the disputed degree title as Computer Application; the public page adds no degree level or abbreviation. Developer history only: the original HTML and biography previously disagreed on this title; this is resolved and no longer a pending placeholder.

The contact form opens a prefilled email draft through `mailto:`. It does not send messages or claim successful delivery; it requires a configured email application. Direct email and telephone links are also available.

## Profile verification pending

LinkedIn returned a sign-up wall during this update. No new LinkedIn professional details were imported or claimed as verified. Awaiting profile text or a PDF export for About, Experience, Education, and Skills updates. Existing employment details are retained from the current project, including its locally edited Manaviyatech dates and company name. Public education titles use Computer Application without adding a degree level or abbreviation.

## Project content retained during layout simplification

All four existing projects are shown; no additional projects, live demos, or project repository URLs are present in the supplied content. No Show more control or fabricated links were added.

Contribution details retained here to keep public cards concise:
- Business Static Application: developed backend APIs, designed the frontend, and integrated ERP data for web and mobile business monitoring.
- PaperBiz ERP: built dashboards and reporting modules, and improved document management in the existing Windows ERP.
- Channel Manager: built dashboards and property and rate plan modules, and optimized the interface for web and mobile.
- Dataman Loan Management System: developed the responsive frontend, designed loan and approval workflows, and integrated backend APIs.

## Additional project provenance

The owner confirmed contribution to all 11 projects listed at https://gitesh-pi.vercel.app/projects. Their titles, technology lists, demo destinations, and website preview sources were inspected there. Summaries are paraphrased. Individual roles and results are not asserted. Preview images are lazy-loaded from the reference site and depend on its availability; original four project images remain explicitly illustrative.

All 15 projects now display by default; the project visibility toggle was removed after owner feedback.

## Motion

GSAP 3.12.5 and ScrollTrigger load from jsDelivr using deferred scripts. GSAP matchMedia scopes all entrance, scroll, progress, and hover effects to prefers-reduced-motion: no-preference and reverts them when preferences change. There are no endlessly looping animations. Content and contact/navigation functionality remain available if the CDN is unavailable. Project count remains 13 after the requested removals.

## Pages

Home (`index.html`) shows the first four projects with a View more projects link. The full collection of 13 projects is at `projects.html`. Shared styles and JavaScript support both pages.
