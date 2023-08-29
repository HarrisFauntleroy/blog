# Personal Blog Template

<p align="center">
    <a href="https://github.com/HarrisFauntleroy/personal-blog-template/releases">
        <img alt="GitHub release" src="https://img.shields.io/github/package-json/v/HarrisFauntleroy/personal-blog-template?&style=for-the-badge">
    </a>
    <a href="/LICENSE.md">
        <img alt="GitHub" src="https://img.shields.io/github/license/HarrisFauntleroy/personal-blog-template?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/personal-blog-template/graphs/contributors">
        <img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/HarrisFauntleroy/personal-blog-template?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/personal-blog-template/actions">
        <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/HarrisFauntleroy/personal-blog-template/main?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/personal-blog-template/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/HarrisFauntleroy/personal-blog-template?&style=for-the-badge">
    </a>
    <a href="https://github.com/HarrisFauntleroy/personal-blog-template/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/last-commit/HarrisFauntleroy/personal-blog-template?&style=for-the-badge">
    </a>
    </a>
    <a href="https://github.com/HarrisFauntleroy/personal-blog-template/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/personal-blog-template?&style=for-the-badge">
    </a>
</p>

A template for a blog, and portfolio.

---

## Table of Contents 📖

1. [Features](#features-✨)
2. [Local Development](#local-development-🛠️)
3. [Contributing](#contributing-🤝)
4. [License](#license-⚖️)
5. [Disclaimer](#disclaimer-🚨)

## Features ✨

- **📝 Markdown**: with support for
  [GitHub Flavored Markdown](https://github.github.com/gfm/),
  [Katex](https://katex.org/),
  [Mermaid](https://mermaid-js.github.io/mermaid/#/), and more.
- **📡 RSS Feed**: Keep readers updated automatically.
- **🔒 NextAuth**: Secure, simple logins.
- **🗺️ Sitemap Generation**: Auto-generate for better SEO.
- **🔍 SEO**: Built-in search engine optimization features.
- **🌗 Dark Mode**: Toggle between light and dark mode.
- **🧩 Modular**: Easy to extend.
- **📱 Responsive**: Works on all devices.
- **🎨 Theming**: Simple UI customization.
- **💬 Comments**: In progress. 🚧
- **📊 Analytics**: In progress. 🚧
- **👩‍💼 Admin Panel**: In progress. 🚧

## Local Development 🛠️

Here's how you can set up personal-blog-template in your local dev environment:

**Installation**

```zsh
# Install dependencies with pnpm
pnpm install
```

```zsh
# Start development server
pnpm run dev
```

_Please refer to the package.json for additional details and scripts._

## Trunk-Based Development and Git Hooks

This repository adopts a **Trunk-Based Development** approach to encourage:

- Short-lived branches or direct trunk modifications
- Frequent merges
- High collaboration among developers

### Automated Git Hooks

To maintain code quality, we've set up automated Git hooks that perform the
following tasks before any `git push` operation:

- **Linting**: Enforces a consistent code style across the codebase.
- **Formatting**: Applies standardized code formatting.
- **Testing**: Executes all unit tests to catch regressions and errors at an
  early stage.
- **Building**: Compiles the code and bundles all assets to ensure everything is
  set up correctly.

This automation helps keep our codebase clean, stable, and error-free.

## Contributing 🤝

If you'd like to contribute, please see our
[contribution guidelines](CONTRIBUTING.md) for more information.

## License ⚖️

This software is distributed under the terms of the MIT License. You can see the
full license [here](LICENSE).

## Disclaimer 🚨

This software is currently a work in progress and considered in the ALPHA phase.
As we continue to update and improve, please expect features to evolve and APIs
to change. We appreciate your patience and value your feedback! 🙌

## Screenshots 📸

| ![Image 1](/public/1.png) |
| :-----------------------: |
|         _Image 1_         |

| ![Image 2](/public/2.png) | ![Image 3](/public/3.png) |
| :-----------------------: | :-----------------------: |
|         _Image 2_         |         _Image 3_         |

| ![Image 4](/public/4.png) | ![Image 5](/public/5.png) |
| :-----------------------: | :-----------------------: |
|         _Image 4_         |         _Image 5_         |
