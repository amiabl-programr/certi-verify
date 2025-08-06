import { UserModel } from "../models/user";
import { Request, Response } from "express";
import { hash, genSalt, compare } from "bcryptjs";
import { generateToken, verifyToken } from "../utils/token";
import { validateUserLogin, validateRegisterUser } from "../utils/validation";
import { sendMail } from "../services/email";


export const register = async (req: Request, res: Response) => {


    const validation = validateRegisterUser(req.body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error!.issues[0].message });
    }
    try {


        const { email, name, password } = req.body
        const userExist = await UserModel.findOne({ email })
        if (userExist) return res.status(400).json({ msg: "user already exist" })

        const salt = await genSalt(10)
        const hashedPassoword = await hash(password, salt)

        const newUser = await UserModel.create({ email, name, password: hashedPassoword })

        await sendMail(email, generateToken(newUser._id as string), name)

        res.status(201).json({ msg: "user created succesfully, check your mail to verify your account" })
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ msg: "Internal server error" });
    }

}

export const verifyUser = async (req: Request, res: Response) => {
    const token = req.query.token as string;

    if (!token) {
        return res.status(400).json({ message: 'Verification token missing' });
    }

    try {
        const decoded = verifyToken(token) as { userId: string };
        console.log('Decoded token:', decoded);
        // Find user and update
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'Email already verified' });
        }

        user.isEmailVerified = true;
        await user.save();

        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    const validation = validateUserLogin({ email, password });
    if (!validation.success) {
        return res.status(400).json({ errors: validation.error });
    }
    try {

        const user = await UserModel.findOne({ email })
        if (!user)
            return res.status(400).json({ msg: "Invalid parameter" })
        if (!user.isEmailVerified)
            return res.status(400).json({ msg: "Email not verified" })
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch)
            return res.status(400).json({ msg: "Invalid Parameters" })
        const token = generateToken(user._id as string)
        const { password: passwordExcluded, ...safeUser } = user.toObject();


        res.status(200).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 1000 })
            .json({ msg: "Login successful" })
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {

        const { email } = req.body
        const user = await UserModel.findOne({ email })
        if (!user)
            return res.status(400).json({ msg: "Invalid parameter" })
        await sendMail(email, generateToken(user._id as string), user.name)
        res.status(200).json({ msg: "Reset password email sent" })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body
    if (!token || !newPassword) {
        return res.status(400).json({ msg: "Token and new password are required" });
    }

    try {
        const decoded = verifyToken(token) as { userId: string };
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const salt = await genSalt(10);
        user.password = await hash(newPassword, salt);
        await user.save();

        return res.status(200).json({ msg: "Password reset successfully" });
    } catch (error) {
        return res.status(400).json({ msg: "Invalid or expired token" });
    }
}