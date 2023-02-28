import User from "../Schemas/user.js";


const globalAdminPermissionMiddleware = async (req, res, next) => {
    const role = req.jwtPayload.role; //guardado en el jwt middleware
    if (role !== 'GLOBAL_ADMIN') {
        return res.status(401).json({ error: "Unauthorized role" });
    }

    next();
};
export { globalAdminPermissionMiddleware };