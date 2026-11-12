
# AGENTS.md

# DevKit — AI Agent Instructions

## 1. Project Identity

- Project Name: DevKit
- Product Type: Universal Developer Toolkit
- Tagline: Build faster. Develop smarter.
- Repository: fazasync/devkit
- License: MIT
- Platform: Web Application
- Development Approach: Modular, Local-first, Privacy-first

DevKit is an open-source developer productivity platform that provides essential developer utilities in one unified workspace.

This is a long-term open-source product. Do not treat it as a temporary demo or a simple collection of converter pages.

## 2. Core Principles

All development must follow these principles:

1. Privacy First
   - Process user data locally whenever possible.
   - Never send user input to external services without explicit permission.
   - Do not collect unnecessary personal information.
   - Never log sensitive user input.

2. Modular Architecture
   - Every developer tool must be independently maintainable.
   - Avoid tightly coupled components.
   - Keep business logic separate from UI components.
   - Make adding new tools straightforward.

3. Developer Experience
   - Prioritize usability and productivity.
   - Minimize unnecessary interactions.
   - Support keyboard navigation.
   - Provide clear feedback and error messages.

4. Performance
   - Keep the initial bundle lightweight.
   - Lazy-load heavy dependencies.
   - Avoid unnecessary re-renders.
   - Optimize for desktop and mobile browsers.

5. Open Source Quality
   - Write maintainable code.
   - Include meaningful tests.
   - Maintain documentation.
   - Follow consistent coding conventions.

## 3. Technology Stack

Use the following technologies:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Zustand
- Zod
- Vitest
- Playwright
- pnpm

Do not introduce alternative frameworks without a strong technical reason.

Use the existing package configuration as the source of truth.

## 4. Project Architecture

Recommended structure:

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── tools/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── json-formatter/
│   ├── jwt-decoder/
│   ├── regex-tester/
│   ├── base64/
│   ├── uuid-generator/
│   └── timestamp-converter/
│
├── config/
├── hooks/
├── lib/
├── stores/
├── types/
└── styles/

docs/
tests/
public/

Each feature should contain its own:

- components/
- hooks/
- lib/
- types/
- tests/
- index.ts

Keep route files lightweight. Tool-specific functionality belongs inside its feature module.

## 5. Coding Standards

- Use TypeScript strictly.
- Avoid using any.
- Prefer explicit types.
- Use descriptive variable and function names.
- Prefer named exports.
- Keep functions small and focused.
- Avoid unnecessary abstractions.
- Avoid duplicated logic.
- Avoid giant components.
- Use reusable components when appropriate.
- Follow consistent import ordering.
- Use the @/ alias.

React guidelines:

- Prefer Server Components.
- Use "use client" only when necessary.
- Do not access browser APIs during server rendering.
- Avoid unnecessary useEffect.
- Keep state as close as possible to where it is used.
- Use Zustand only for genuinely shared application state.

## 6. Tool Development Standards

Every developer tool must:

- Have a clear name.
- Have a concise description.
- Have a dedicated feature module.
- Provide a usable interface.
- Handle empty input.
- Handle invalid input.
- Provide clear error messages.
- Support copying results when appropriate.
- Include reset functionality when appropriate.
- Support keyboard accessibility.
- Include unit tests.

Keep processing logic independent from React components.

Prefer pure functions for transformations and validations.

## 7. Security and Privacy

- Treat all user-provided content as untrusted.
- Never execute arbitrary user code.
- Never expose secrets.
- Do not send tool inputs to remote APIs by default.
- Validate uploaded files before processing.
- Do not use dangerouslySetInnerHTML with untrusted content.
- Use established cryptographic APIs and libraries.
- Clearly distinguish JWT decoding from signature verification.
- Never claim that a decoded JWT is verified.
- Avoid storing raw input or output in localStorage.

## 8. UI/UX Guidelines

Follow DESIGN.md.

The interface must be:

- Minimal.
- Professional.
- Modern.
- Responsive.
- Consistent.
- Developer-focused.

Avoid:

- Excessive gradients.
- Excessive glow effects.
- Unnecessary animations.
- Generic dashboard layouts.
- Oversized decorative elements.
- Inconsistent spacing.
- Unnecessary cards.

Use shadcn/ui as the foundation for accessible UI primitives.

Use Lucide React for icons.

## 9. Performance Guidelines

- Lazy-load heavy components.
- Avoid unnecessary dependencies.
- Optimize client-side rendering.
- Keep the application shell lightweight.
- Avoid loading every tool on the homepage.
- Use dynamic imports when appropriate.
- Avoid unnecessary API requests.

## 10. Testing Requirements

Use Vitest for unit tests.

Use Playwright for important end-to-end tests.

Before completing a task:

1. Run relevant tests.
2. Run ESLint.
3. Run TypeScript checks.
4. Run production build when appropriate.
5. Verify affected interfaces.

Never claim that tests pass unless they were actually executed.

## 11. Git Conventions

Follow Conventional Commits:

- feat: New functionality
- fix: Bug fixes
- docs: Documentation
- refactor: Code restructuring
- test: Tests
- chore: Maintenance

Keep commits focused and meaningful.

Never commit:

- .env files
- API keys
- Credentials
- Build artifacts
- User-sensitive data

## 12. Development Workflow

Before implementing a feature:

1. Read AGENTS.md.
2. Read PRD.md.
3. Read DESIGN.md.
4. Inspect the existing project structure.
5. Understand existing implementation.
6. Identify reusable components.
7. Plan the implementation.

During implementation:

1. Work incrementally.
2. Follow existing architecture.
3. Write clean and maintainable code.
4. Add tests.
5. Avoid unrelated changes.
6. Update documentation when necessary.

After implementation:

1. Verify functionality.
2. Run tests.
3. Check responsive behavior.
4. Report completed changes.
5. Mention known limitations.

## 13. Initial Development Priorities

Implement in this order:

Phase 1:
- Application foundation.
- Design system.
- Responsive application shell.
- Sidebar navigation.
- Header.
- Dashboard.
- Tool registry.
- Global search.
- Command palette.

Phase 2:
- JSON Formatter.
- Base64 Encoder/Decoder.
- JWT Decoder.
- UUID Generator.
- Unix Timestamp Converter.

Phase 3:
- Regex Tester.
- Text Diff.
- URL Encoder/Decoder.
- Favorites.
- Recently Used.

Phase 4:
- Advanced tools.
- Settings.
- Additional productivity features.

## 14. Important Restrictions

- Do not implement every feature simultaneously.
- Do not change the technology stack unnecessarily.
- Do not create unnecessary backend infrastructure.
- Do not introduce authentication for basic tools.
- Do not add paid services as core dependencies.
- Do not compromise privacy for convenience.
- Do not redesign existing working components without a reason.

Always prioritize stability, maintainability, and user experience.
