export interface AppConfig {
    APP_DEBUG: boolean;
    APP_ENV: string;
    APP_NAME: string;
}

export function useAppConfig(): AppConfig {
    const init: AppConfig = {
        APP_DEBUG: false,
        APP_ENV: 'local',
        APP_NAME: 'MAI',
    };

    if (typeof document === 'undefined') {
        return init;
    }

    const meta = document.querySelector('meta[name="__conf"]') as HTMLMetaElement | null;
    if (!meta) {
        throw new Error('Meta config tag not found');
    }

    const { debug, env, name } = meta.dataset;

    return {
        APP_DEBUG: debug === 'true',
        APP_ENV: env ?? init.APP_ENV,
        APP_NAME: name ?? init.APP_NAME,
    };
}
