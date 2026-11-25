/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
 * Sky Browser default preferences.
 *
 * RULES OF THIS FILE (enforced by convention and code review):
 *   1. Every pref carries a short comment explaining WHY we deviate from
 *      the upstream default. "What" the pref does is secondary.
 *   2. We only touch prefs that matter for privacy, security or lightness.
 *      This is not a grab-bag of tweaks.
 *   3. This file must be RE-REVIEWED at every ESR rebase: pref names drift,
 *      prefs get removed upstream (see the "legacy" notes below), defaults
 *      change. CI syntax-checks this file (node --check) but semantic drift
 *      needs human eyes.
 *
 * Shipping plan: the first branding patch (M1) appends an #include of this
 * file to browser/app/profile/firefox.js upstream — see docs/branding.md.
 */

/* ================================================================
 * Telemetry & data collection — off, entirely.
 * ================================================================ */

// Disable health report upload and any data-submission handshake.
pref("datareporting.healthreport.uploadEnabled", false);
pref("datareporting.policy.dataSubmissionEnabled", false);

// Kill the telemetry pipeline at every layer (collection, archive, server).
pref("toolkit.telemetry.unified", false);
pref("toolkit.telemetry.enabled", false);
pref("toolkit.telemetry.archive.enabled", false);
pref("toolkit.telemetry.server", "");
pref("toolkit.telemetry.server_owner", "");
pref("browser.ping-centre.telemetry", false);

// New tab page Activity Stream telemetry.
pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
pref("browser.newtabpage.activity-stream.telemetry", false);

// No crash reports leaving the machine.
pref("browser.tabs.crashReporting.sendReport", false);
pref("breakpad.reportURL", "");

// No remote studies/experiments (Shield). Legacy prefs occasionally survive
// upstream for a version or two — prune them at each rebase.
pref("app.shield.optoutstudies.enabled", false);

// No "discovery" of recommended add-ons feeding from Mozilla services.
pref("browser.discovery.enabled", false);

/* ================================================================
 * Sponsored & commercial content — none.
 * ================================================================ */

// Pocket: stories and integration off entirely.
pref("extensions.pocket.enabled", false);
pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);

// Sponsored tiles and sponsored urlbar suggestions.
pref("browser.newtabpage.activity-stream.showSponsored", false);
pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
pref("browser.urlbar.suggest.sponsored", false);

// Firefox Suggest (rich suggestions fetched from Mozilla's service).
pref("browser.urlbar.quicksuggest.enabled", false);

// Shopping/Review Checker feature — verify this pref still exists at each
// rebase; it has moved before.
pref("browser.shopping.experience2023.enabled", false);

// First-run onboarding overlay: our users can discover features from our docs.
pref("browser.aboutwelcome.enabled", false);

/* ================================================================
 * Tracking protection — strict, by default.
 * ================================================================ */

// Strict content blocking: tracking, social, cryptomining, fingerprinting.
pref("browser.contentblocking.category", "strict");
pref("privacy.trackingprotection.enabled", true);
pref("privacy.trackingprotection.socialtracking.enabled", true);
pref("privacy.trackingprotection.cryptomining.enabled", true);
pref("privacy.trackingprotection.fingerprinting.enabled", true);

// Total Cookie Protection (dynamic first-party isolation) everywhere,
// including private windows.
pref("network.cookie.cookieBehavior", 5);
pref("network.cookie.cookieBehavior.pbmode", 5);

/* ================================================================
 * HTTPS & network hygiene.
 * ================================================================ */

// HTTPS-Only mode: refuse plaintext HTTP unless the user explicitly allows it.
// Known trade-off: rare legacy sites need a manual exception button click.
pref("dom.security.https_only_mode", true);
pref("dom.security.https_only_mode_pbm", true);

// No prefetching/prediction: it leaks which links you hover and load pages
// you never asked for.
pref("network.prefetch-next", false);
pref("network.predictor.enabled", false);
pref("network.dns.disablePrefetch", true);

// No hyperlink pings (analytics beacons on click).
pref("browser.send_pings", false);

/* ================================================================
 * Fingerprinting resistance.
 * ================================================================ */

// RFP: randomizes/normalizes the most common fingerprinting vectors
// (canvas, timezone, screen size, fonts...).
// Known trade-offs: websites see UTC, a normalized window size and may detect
// the resistance itself; some rare sites misbehave. We ship it ON because it
// is the single most effective anti-fingerprinting switch, and users who
// need a site to work can flip it per-site via our docs.
// NOTE: upstream is gradually moving capabilities to the newer
// privacy.fingerprintingProtection mechanism — review at each rebase.
pref("privacy.resistFingerprinting", true);

// Letterboxing (gray bars around small windows) stays OFF for now: too
// visible for a first release. Revisit with user feedback.
pref("privacy.resistFingerprinting.letterboxing", false);

/* ================================================================
 * Search & input privacy.
 * ================================================================ */

// No search suggestions: search-as-you-type queries go to the search engine.
// Privacy-first choice; users who want suggestions can re-enable in settings.
pref("browser.search.suggest.enabled", false);

// No form history retention.
pref("browser.formfill.enable", false);

// No address/credit-card autofill (data stays on disk in a profile we
// don't need to make richer).
pref("extensions.formautofill.addresses.enabled", false);
pref("extensions.formautofill.creditCards.enabled", false);

/* ================================================================
 * Deliberately NOT changed (documented decisions).
 * ================================================================ */

// Safe Browsing stays ENABLED: phishing/malware protection is worth the
// (metadata-only) requests to Google's service. Users who disagree can
// disable it — but we don't ship an unprotected browser by default.
// (browser.safebrowsing.* left at upstream defaults.)

// Firefox Account sync stays available: it talks to Mozilla's servers with
// end-to-end encryption and is genuinely useful for migrating users.
// (identity.fxaccounts.* left at upstream defaults.)

// WebRTC stays enabled: disabling breaks Discord/Meet/etc. for little gain
// since RFP already blunts IP leakage through media devices. Discussed as a
// user-facing toggle later, not a default.

// DNS-over-HTTP(S) configuration: left at upstream defaults for v0.x.
// A deliberate DoH policy is a decision for a later ADR.
