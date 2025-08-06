import { Response } from 'express';
import { Request } from '../types';
import { UserModel } from '../models/user';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({}, '-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id).select('-password'); // exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};