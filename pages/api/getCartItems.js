import { queryCart } from "../../lib/cartOperations";

export default async function handler(req, res) {
    const cart = await queryCart(req);
    res.status(200).json(cart);
}
