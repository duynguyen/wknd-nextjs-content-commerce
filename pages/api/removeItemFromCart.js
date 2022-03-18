import { removeFromCart } from "../../lib/cartOperations";
export default async function handler(req, res) {
    const itemUid = req.query.itemUid;
    const result = await removeFromCart(req, itemUid);
    res.status(200).json(result);
}
