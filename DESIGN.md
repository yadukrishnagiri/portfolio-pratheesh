---
name: Pratheesh Physiotherapy
description: Calm, clear information for UK home physiotherapy
colors:
  ink: "#202322"
  muted: "#555d5a"
  line: "#dce1de"
  light: "#f5f7f6"
  accent: "#536d67"
  dark: "#27302d"
  white: "#ffffff"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(2.5rem, 4vw, 4.4rem)"
    fontWeight: 600
    lineHeight: 1.09
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
rounded:
  square: "0px"
spacing:
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "14px 19px"
---

## Overview

The site is a quiet, modern information page for people considering physiotherapy at home. White and light grey surfaces, charcoal text, thin rules and a muted eucalyptus accent create a clear reading order. DM Sans is the only typeface. Photographs show illustrative home-care scenes with faces outside the frame; they do not depict Pratheesh or actual patients.

The hero gives one clear proposition and points to services and the visit process. Service information is grouped by need and expands on demand, so the long clinical list remains manageable. Draft and pending labels distinguish supplied generic copy from confirmed practice details. Contact details have no invented destinations.

Motion is limited to small hover and disclosure transitions, with a reduced-motion override. On narrow screens, the content becomes a single column and the navigation becomes an accessible toggle.

## Colors

- Ink: `#202322`
- Muted text: `#555d5a`
- Line: `#dce1de`
- Light surface: `#f5f7f6`
- Accent: `#536d67`
- Dark contact surface: `#27302d`

The site uses optimised JPEG imagery in `public/images/`; each file embeds its generation prompt for provenance.

## Typography

DM Sans provides a direct, modern voice. Large headings carry the hierarchy; explanatory copy stays at a comfortable measure.

## Layout

Desktop sections pair concise introductions with detailed content. Mobile uses a single column, full-width imagery and stacked disclosures.

## Components

Services and FAQs use native disclosure elements. Pending practice details use quiet labels, and the contact area avoids inactive links.
