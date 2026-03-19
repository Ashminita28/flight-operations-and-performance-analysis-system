export const accountCreatedTemplate = (name: string, loginUrl: string) => {
	return `
    <h2>Welcome ${name}</h2>
    <p>Your account has been created successfully.</p>
    <p>You can login here:</p>
    <a href="${loginUrl}">${loginUrl}</a>
  `;
};

export const resetPasswordTemplate = (resetLink: string) => {
	return `
    <h2>Password Reset</h2>
    <p>Click below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>This link expires in 10 minutes.</p>
  `;
};
