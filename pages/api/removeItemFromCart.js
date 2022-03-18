import { removeFromCart } from "../../lib/cartOperations";
export default async function handler(req, res) {
    const result = await removeFromCart(req, res);
    res.status(200).json(result);
}
