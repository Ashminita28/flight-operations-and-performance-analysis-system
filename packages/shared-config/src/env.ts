type EnvConfig = {
	DB_NAME: string;
	DB_USER: string;
	DB_PASSWORD: string;
	DB_HOST: string;
	DB_PORT: number;
	JWT_SECRET: string;
	ORIGIN: string;
};

export const validateEnv = (): EnvConfig => {
	const required: (keyof EnvConfig)[] = [
		"DB_NAME",
		"DB_USER",
		"DB_PASSWORD",
		"DB_HOST",
		"DB_PORT",
		"JWT_SECRET",
		"ORIGIN",
	];

	for (const key of required) {
		if (!process.env[key]) {
			throw new Error(`Missing environment variable: ${key}`);
		}
	}

	return {
		DB_NAME: process.env.DB_NAME!,
		DB_USER: process.env.DB_USER!,
		DB_PASSWORD: process.env.DB_PASSWORD!,
		DB_HOST: process.env.DB_HOST!,
		DB_PORT: Number(process.env.DB_PORT!),
		JWT_SECRET: process.env.JWT_SECRET!,
		ORIGIN: process.env.ORIGIN!,
	};
};
