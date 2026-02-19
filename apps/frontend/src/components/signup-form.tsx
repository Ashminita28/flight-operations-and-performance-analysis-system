import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

// interface SignupFormProps{
// 	onSubmit:(data:{
// 		name:string,
// 		email:string,
// 		phone:string,
// 		password:string;
// 	})=>void
// }

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
	});
	const [message, setMessage] = useState("");

	const handleChange = (e: { target: { name: any; value: any } }) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://localhost:3000/api/auth/register",
				formData,
			);
			setMessage(res.data.message);
		} catch (err) {
			setMessage("Something went wrong");
		}
	};
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="name">Full Name</FieldLabel>
							<Input
								onChange={handleChange}
								id="name"
								type="text"
								placeholder="John Doe"
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								onChange={handleChange}
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
							<FieldDescription>
								We&apos;ll use this to contact you. We will not share your email
								with anyone else.
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor="phone">Phone</FieldLabel>
							<Input
								onChange={handleChange}
								id="phone"
								type="number"
								placeholder="+91-96785432"
								required
							/>
							<FieldDescription>
								We&apos;ll use this to send you message.
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<Input
								onChange={handleChange}
								id="password"
								type="password"
								required
							/>
							<FieldDescription>
								Must be at least 8 characters long.
							</FieldDescription>
						</Field>
						<FieldGroup>
							<Field>
								<Button type="submit">Create Account</Button>
								<Button
									variant="outline"
									type="button"
								>
									Sign up with Google
								</Button>
								<FieldDescription className="px-6 text-center">
									Already have an account? <a href="/login">Sign in</a>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
				{message && <p>{message}</p>}
			</CardContent>
		</Card>
	);
}
