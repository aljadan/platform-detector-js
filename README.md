# Platform Detector JS

**Platform Detector JS** - A seamless way to identify user platforms (Windows, macOS, iOS, Android) in your JS/TS projects!

## Features ✨

- Easy-to-use API for platform detection
- Compatible with both Browser and Node environments
- TypeScript support

## Installation 🛠️

Install `platform-detector-js` using npm:

```bash
npm install platform-detector-js
```

## Quick Start 🚀

```javascript
import Platform from "platform-detector-js"

const platform = new Platform()

console.log(platform.isWindows) // true/false
console.log(platform.isMacOS) // true/false
// ... and more!
```

Specify a custom user-agent string if needed:

```javascript
const platform = new Platform("Your-Custom-User-Agent-String")
```

## API 📘

### Constructor

- **new Platform(userAgent?: string)**
  - `userAgent` (optional): Provide a custom user agent string. If not provided, the browser's user agent string will be used (if in a browser environment).

### Methods

- **getUserAgent(): string**
- **setUserAgent(userAgent: string): void**
- **select<T>(specifics: { [platform in PlatformOS]?: T } & { default: T }): T**
  (See [Usage](#usage) section for example usage of `select` method.)

### Properties

- **isIOS**: boolean
- **isAndroid**: boolean
- **isWindows**: boolean
- **isMacOS**: boolean

## Usage 📚

### Basic Usage

```javascript
const platform = new Platform()

if (platform.isWindows) {
  // Your Windows-specific code here
}
```

### Using `select` Method

```javascript
const platform = new Platform()
const value = platform.select({
  windows: "Windows Value",
  macos: "macOS Value",
  ios: "iOS Value",
  android: "Android Value",
  default: "Default Value",
})
```

## License 📜

This project is licensed under the [MIT License](LICENSE).
