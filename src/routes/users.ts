import express from "express";
import userController from "../controller/users";

const router = express.Router();

router.post('/', userController.createNewUser);
router.get('/', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;