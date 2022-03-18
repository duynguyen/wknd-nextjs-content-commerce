import { addToCart } from "../../lib/cartOperations";
export default async function handler(req, res) {
    const result = await addToCart(req);
    res.status(200).json(result);
}
