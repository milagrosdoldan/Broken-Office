const express = require("express");
const router = express.Router();

const { validateAuth, validateAdmin } = require("../middleware/auth");

const {
  register,
  login,
  me,
  deleteUser,
  updateUser,
  logout,
  updatePicture,
  search,
  removePicture,
  userSearch,
  allUsers,
} = require("../controllers/user");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *         type: strin
 *         description: user's name
 *        lastname:
 *         type: string
 *         description: user's lastname
 *        password:
 *         type: string
 *         description: user's password
 *        email:
 *         type: string
 *         description: user's email
 *        tel:
 *         type: number
 *         description: user's tel
 *        companyRole:
 *         type: string
 *         description: user's companyRole
 *        isAdmin:
 *         type: boolean
 *         default: false
 *         description: is admin or not
 *        active:
 *         type: boolean
 *         default: true
 *         description: is active or not
 *        picture:
 *         type: string
 *         description: user's photo
 *      required:
 *        -name
 *        -lastname
 *        -email
 *      example:
 *        name: Bautista
 *        lastname: Gomez
 *        email: bautistagomez@gmail.com
 */
router.post("/register", register);
router.post("/login", login);
router.get("/me", validateAuth, me);
router.get("/allUsers/:role", validateAuth, validateAdmin, allUsers);
router.get("/search/:search", validateAuth, userSearch);
router.post("/logout", logout);
router.delete("/:_id", validateAuth, validateAdmin, deleteUser);
router.put("/:_id", updateUser);
router.put("/picture", validateAuth, updatePicture);
router.post("/removepicture", validateAuth, removePicture);

module.exports = router;
