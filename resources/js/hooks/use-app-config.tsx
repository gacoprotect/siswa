export interface AppConfig {
    APP_DEBUG: boolean;
    APP_ENV: string;
    APP_NAME: string;
}

export function useAppConfig(): AppConfig {
    const el = document.getElementById('__config');
    if (!el) {
        throw new Error('Config element not found');
    }

    return {
        APP_DEBUG: el.dataset.debug === 'true',
        APP_ENV: el.dataset.env || 'local',
        APP_NAME: el.dataset.name || 'Laravel',
    };
}
