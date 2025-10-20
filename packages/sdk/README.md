# @tma-ts/sdk

A tiny, fully typed wrapper around the Telegram WebApp client that helps you build Mini Apps in TypeScript. It exposes
the complete `Telegram.WebApp` surface, automatically binds methods to the live instance, and lets you inject mocks for
unit tests.

## Features

- 🔄 **Lazy proxy** that binds every WebApp method/property on demand.
- ✅ **Full type coverage** mirroring the official Telegram Mini App API.

## Installation

```bash
bun install @tma-ts/sdk
# or with npm / pnpm / yarn depending on your tooling
```

This package ships compiled JavaScript under dist/ together with types.d.ts, so it works out of the box in both Bun and
Node projects.

## Prerequisites

Telegram only injects window.Telegram.WebApp inside the in-app WebView. Add the official loader script before your app
bundle:

```html
<script src="https://telegram.org/js/telegram-web-app.js?59"></script>
```
When running outside Telegram (local dev, unit tests), you must provide your own mock via setSource.

## Quick Start

```typescript
import { WebApp, isTMA, TelegramWebAppUnavailableError } from '@tma-ts/sdk';

await isTMA();              // waits until Telegram.WebApp is ready
WebApp.MainButton.show();   // auto-binds to the underlying instance

try {
  WebApp.showAlert('Hello from Telegram Mini App!');
} catch (err) {
  if (err instanceof TelegramWebAppUnavailableError) {
    console.warn('Not inside Telegram yet.');
  } else {
    throw err;
  }
}
```

Because WebApp is a proxy, you can destructure members that you use frequently:

```typescript
import { WebApp, MainButton, HapticFeedback } from '@tma-ts/sdk'

MainButton.setText('Submit')
MainButton.onClick(() => WebApp.sendData('payload'))
HapticFeedback.impactOccurred('light')
```

## Testing & Dependency Injection

Inject your own implementation to run outside Telegram:

```typescript
import { setSource, WebApp } from '@tma-ts/sdk';

setSource({
  version: 'test',
  MainButton: {
    isVisible: false,
    show() {
      this.isVisible = true;
    },
// ...provide all fields you assert against
  },
  sendData: (data: string) => console.log('Mock sendData', data),
// ...rest of WebApp surface you exercise in tests
});

// Reset after each test run
afterEach(() => setSource(null));
```

`isTMA()` simply resolves once a WebApp instance exists; it never throws.

## Build Scripts

Clean + compile TypeScript (`tsconfig.prod.json`) + copy `types.d.ts`:
```bash
bun run build
```

Consumers normally install from npm, but you can build locally to inspect the bundle.

## Contributing

1. Install dependencies with Bun (`bun install`).
2. Make changes in src/.
3. Run `bun run build` to generate dist/.
4. Commit with your preferred tooling.

Feel free to open issues or PRs for missing typings or new Telegram Mini App APIs.

## License

MIT © Andrey Reznik

Let me know if you’d like a shorter version or additional sections (changelog, FAQ, badges, etc.).