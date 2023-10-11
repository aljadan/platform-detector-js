import UAParser, { UAParserInstance } from "ua-parser-js";

type PlatformOS = 'windows' | 'macos' | 'android' | 'ios';

const isBrowser = () => typeof window !== 'undefined';

/**
 * `Platform` provides utility methods to interact with and retrieve
 * information about the current platform/environment based on the user agent string.
 */
export default class Platform {
    private UAParser: UAParserInstance;
    private osCache: (PlatformOS | 'unknown') | null = null;

    /**
     * @param userAgent - (Optional) A custom user agent string.
     * If not provided, the browser's user agent string will be used (if in a browser environment).
     */
    constructor(userAgent?: string) {
        const ua = userAgent ?? (isBrowser() ? window.navigator.userAgent : '');
        this.UAParser = new UAParser(ua);
    }

    /**
     * Retrieves the current user agent string.
     * @returns - The user agent string currently used by the instance.
     */
    getUserAgent = (): string => this.UAParser.getUA()

    /**
     * Updates the user agent string used for detection.
     * This will invalidate any cached detection results.
     * 
     * @param userAgent - The new user agent string.
     */
    setUserAgent = (userAgent: string): void => {
        this.UAParser.setUA(userAgent);
        this.osCache = null;  // Clear the cached OS.
    }

    /** Indicates if the platform is iOS. */
    get isIOS(): boolean { return this.OS === 'ios'; }

    /** Indicates if the platform is Android. */
    get isAndroid(): boolean { return this.OS === 'android'; }

    /** Indicates if the platform is Windows. */
    get isWindows(): boolean { return this.OS === 'windows'; }

    /** Indicates if the platform is macOS. */
    get isMacOS(): boolean { return this.OS === 'macos'; }

    /**
     * Determines and caches the platform OS type based on the user agent.
     * @returns The detected platform OS type or 'unknown' if unable to determine.
     */
    get OS(): PlatformOS | 'unknown' {
        if (!this.osCache) {
            const os = this.UAParser.getOS().name
            if (os === 'iOS')
                this.osCache = 'ios'
            else if (os === 'Android')
                this.osCache = 'android'
            else if (os === 'Windows')
                this.osCache = 'windows'
            else if (os === 'Mac OS')
                this.osCache = 'macos'
            else
                this.osCache = 'unknown'
        }
        return this.osCache
    }

    /**
     * Selects a value based on the current platform.
     * 
     * @example
     * const platform = new Platform();
     * const value = platform.select({
     *   windows: 'Windows Value',
     *   default: 'Default Value'
     * });
     *
     * @param specifics - Object defining values for each platform.
     * The object must contain a 'default' property if it doesn't cover all OS types.
     * @returns The value for the detected platform, the default value, or undefined.
     */
    select<T>(
        specifics: { [platform in PlatformOS]?: T } & { default: T }
    ): T;
    select<T>(
        specifics: { [platform in PlatformOS]?: T }
    ): T | undefined;
    select<T>(
        specifics:
            | ({ [platform in PlatformOS]?: T } & { default: T })
            | { [platform in PlatformOS]: T },
    ): T | undefined {
        const OS = this.OS
        const isSpecificsDefault = 'default' in specifics
        if (OS === 'unknown')
            return isSpecificsDefault ? specifics.default : undefined

        if (isSpecificsDefault)
            return specifics[OS] ?? specifics.default
        else return specifics[OS]
    }
}
