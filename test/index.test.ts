import Platform from "../src";
import { describe, test, beforeEach, expect } from 'vitest'

describe('Platform', () => {
  const IOS_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1';
  const ANDROID_UA = 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
  const MACOS_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36';
  const WINDOWS_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

  let platform: Platform;

  beforeEach(() => {
    platform = new Platform();
  });

  test('should detect iOS user agent', () => {
    platform.setUserAgent(IOS_UA);
    expect(platform.isIOS).toBe(true);
  });

  test('should detect Android user agent', () => {
    platform.setUserAgent(ANDROID_UA);
    expect(platform.isAndroid).toBe(true);
  });

  test('should detect macOS user agent', () => {
    platform.setUserAgent(MACOS_UA);
    expect(platform.isMacOS).toBe(true);
  });

  test('should detect Windows user agent', () => {
    platform.setUserAgent(WINDOWS_UA);
    expect(platform.isWindows).toBe(true);
  });

  test('should select the correct value for iOS platform', () => {
    platform.setUserAgent(IOS_UA);
    const value = platform.select({
      ios: 'iOS Value',
      default: 'Default Value'
    });

    expect(value).toBe('iOS Value');
  });

  test('should select the correct value for Android platform', () => {
    platform.setUserAgent(ANDROID_UA);
    const value = platform.select({
      android: 'Android Value',
      default: 'Default Value'
    });

    expect(value).toBe('Android Value');
  });

  test('should select the correct value for macOS platform', () => {
    platform.setUserAgent(MACOS_UA);
    const value = platform.select({
      macos: 'macOS Value',
      default: 'Default Value'
    });

    expect(value).toBe('macOS Value');
  });

  test('should select the correct value for Windows platform', () => {
    platform.setUserAgent(WINDOWS_UA);
    const value = platform.select({
      windows: 'Windows Value',
      default: 'Default Value'
    });

    expect(value).toBe('Windows Value');
  });

  test('should select the default value for unknown platforms', () => {
    platform.setUserAgent('Some Unknown User Agent');
    const value = platform.select({
      ios: 'iOS Value',
      default: 'Default Value'
    });

    expect(value).toBe('Default Value');
  });
});
