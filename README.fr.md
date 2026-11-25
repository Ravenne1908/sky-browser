<!-- Sky Browser — README en français. Version anglaise (officielle) : README.md -->

<p align="center">
  <img src="assets/logo/sky-browser-logo.svg" width="128" alt="Logo Sky Browser">
</p>

<h1 align="center">Sky Browser</h1>

<p align="center">
  <strong>Un navigateur web léger et respectueux de la vie privée — fork indépendant de Firefox.</strong><br>
  Pas de télémétrie. Pas de contenus sponsorisés. Juste le web, en silence.
</p>

<p align="center">
  🇬🇧 <a href="README.md">Read this README in English</a>
</p>

---

## Pourquoi Sky Browser ?

Firefox possède un excellent moteur et un excellent code source — mais la
version officielle embarque télémétrie, contenus sponsorisés, Pocket et
d'autres extras qui n'ont pas leur place dans un navigateur qui vous respecte.
**Sky Browser est le même moteur, réglé autrement :**

| Sujet | Réglages par défaut de Sky Browser |
|---|---|
| Télémétrie | Désactivée — health report, rapports de plantage, études Shield, tout coupé |
| Pistage | Protection stricte, Total Cookie Protection, pistage social bloqué |
| Empreinte (fingerprinting) | `resistFingerprinting` activé par défaut |
| Contenus sponsorisés | Pocket, sites sponsorisés et suggestions payantes — retirés |
| « Articles » sponsorisés | Désactivés sur la page nouvel onglet |
| HTTPS | Mode HTTPS-uniquement activé par défaut |
| Remplissage auto | Historique de formulaires et remplissage d'adresse/carte désactivés |
| Mises à jour | Via GitHub Releases (v0.x — voir [ADR 0003](docs/decisions/0003-no-in-house-updater-v0.md)) |

Chaque réglage est documenté dans [`prefs/sky-browser.js`](prefs/sky-browser.js)
— si vous n'êtes pas d'accord avec l'un d'eux, ouvrez un ticket : c'est une
discussion qui mérite d'avoir lieu.

> **Note :** le README anglais ([README.md](README.md)) fait foi pour la
> communauté ; cette traduction peut prendre un peu de retard sur lui.

## État du projet

**Pré-alpha — il n'y a pas encore de binaire à télécharger.** Suivez le dépôt
(« Watch ») pour être averti de la première version.

- ✅ Infrastructure de build sur la base Firefox ESR 153.8.0 (épinglée)
- ✅ Préférences par défaut revues et documentées
- 🧪 **Prototype d'interface** — [`preview/electron`](preview/README.md) :
  un mock Electron de l'interface Sky Browser (onglets, page d'accueil,
  identité), lançable en quelques secondes pendant que le vrai build Firefox
  mûrit. Ce n'est **pas** le navigateur basé sur Firefox.
- ✅ Outillage de patchs en série (divergence d'avec Firefox minimale et auditable)
- 🚧 Identité : logo provisoire aujourd'hui, patch de rebranding complet ensuite
- 🚧 Premiers binaires pour Windows et Linux
- 📋 Prévu : uBlock Origin préinstallé, peaufinage de l'interface, audit de déblobbage

Sky Browser suit **Firefox ESR** — le canal de publication orienté stabilité
et sécurité ([pourquoi](docs/decisions/0002-esr-channel.md)).

## Téléchargement

Dès la première version, les installateurs seront disponibles sur la
[page Releases](https://github.com/ravennelucas1908-max/sky-browser/releases).

## Le compiler vous-même

Guide rapide Linux — guides complets pour [Linux](docs/build-linux.md) et
[Windows](docs/build-windows.md). Prévoir un long build et ~40–60 Go d'espace disque.

```bash
git clone https://github.com/ravennelucas1908-max/sky-browser.git
cd sky-browser

./scripts/setup.sh          # récupère le source Firefox ESR épinglé (plusieurs Go)
./scripts/apply-patches.sh  # applique la série de patchs Sky Browser

cd .build/upstream && ./mach bootstrap && cd ../..   # outillage, une seule fois

./scripts/build.sh         # ☕ allez marcher un peu
./scripts/run.sh           # lancez votre build
```

## Comment ce fork fonctionne

Ce dépôt contient volontairement **uniquement le delta Sky Browser** — nos
patchs, préférences, identité et scripts de build. Le source de Firefox est
récupéré à un tag ESR précis depuis le dépôt Git officiel de Mozilla, puis
notre petite série de patchs est appliquée par-dessus
([ADR 0001](docs/decisions/0001-fork-strategy.md)).

```
mozilla-firefox/firefox @ FIREFOX_153_8_0esr_RELEASE   (upstream, épinglé)
        └── patches/series                             (delta Sky Browser, appliqué en ordre)
              └── prefs/sky-browser.js                  (réglages vie privée)
                    └── branding + mozconfig            (identité & config de build)
```

Conséquence : chaque octet de divergence d'avec Firefox est visible, auditable
et relisible dans ce dépôt. Rebaser sur un nouvel ESR revient à changer une
ligne dans [`upstream.env`](upstream.env) et à ré-appliquer la série.

## Relation avec Firefox — note sur les marques

Sky Browser est construit à partir du code source de Mozilla Firefox, sous
licence Mozilla Public License 2.0.

**Sky Browser n'est ni créé, ni approuvé, ni affilié à la fondation Mozilla,
de quelque manière que ce soit.** « Firefox » et les logos Firefox sont des
marques déposées de la fondation Mozilla. Conformément à la politique de
Marque de Mozilla, Sky Browser retire tout branding Firefox et livre le sien
(voir [docs/branding.md](docs/branding.md) et [NOTICE.md](NOTICE.md)).

## Feuille de route

- **M1 — Premier build fonctionnel.** Rebranding complet (nom, icônes, pages
  « about ») via le premier patch ; répertoire de branding propre ; paquets
  produits.
- **M2 — v0.1, première version publique.** Installateur Windows + tarball
  Linux sur GitHub Releases, processus de release opérationnel
  ([docs/release-process.md](docs/release-process.md)).
- **M3 — Fonctionnalités identitaires.** uBlock Origin préinstallé, audit de
  déblobbage (retirer tout ce qui n'est pas nécessaire pour naviguer),
  dernière passe sur les réglages vie privée.
- **M4 — Communauté & échelle.** Builds CI auto-hébergés, docs traduites,
  étude d'un updater maison, davantage de mains.

## Contribuer

- 🐛 [Signaler un bug](https://github.com/ravennelucas1908-max/sky-browser/issues/new?template=bug_report.md)
- 💡 [Proposer une fonctionnalité](https://github.com/ravennelucas1908-max/sky-browser/issues/new?template=feature_request.md)
- 🔧 Lisez [CONTRIBUTING.md](CONTRIBUTING.md) pour comprendre la discipline de
  patchs qui garde ce fork maintenable.

Signalements de sécurité : voir [SECURITY.md](SECURITY.md) — signalez en
privé, jamais dans un ticket public.

## Licence

Le code de ce dépôt est sous
[Mozilla Public License 2.0](LICENSE) — la même licence que le source Firefox
sur lequel il s'appuie. Voir [NOTICE.md](NOTICE.md) pour l'attribution et les
informations sur les marques.
