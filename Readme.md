# Contribution Guide

Thank you for contributing to this repository. Please follow these steps to ensure a smooth and consistent workflow.

## 1. Fork and Clone

1. Fork this repository on GitHub.
2. Clone your fork to your local machine:

```bash
git clone https://github.com/<your-username>/batttery-webstore.git
```

## 2. Branches

This repository uses two main branches:

- `main`
- `development`

All changes should be made and pushed to the `development` branch.

## 3. Feature Branches

When building a new feature, create a dedicated branch for it.

Example:

```bash
git checkout -b feat/auth
```

## 4. Release and Hotfix Branches

- If you are working on a new release, use a `release/*` branch.
- If you are fixing a production issue, use a `hotfix/*` branch.

Example:

```bash
git checkout -b release/v1.2.0

git checkout -b hotfix/auth
```

## 5. Git Flow

This repository follows Git Flow conventions:

- `main` contains the production-ready code.
- `development` is where development work is merged.
- `feat/*` branches are for new features.
- `release/*` branches are for release preparation.
- `hotfix/*` branches are for urgent production fixes.

Thank you for contributing!

Always create new branch from thd development branch
move to the development branch first then create the new branch
