export const accountCreatedTemplate = (
	name: string,
	password: string,
	loginUrl: string,
) => {
	return `
    Welcome ${name}
    Your account has been created successfully
    You can login here:
    Your password${password}
    login url${loginUrl}
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
