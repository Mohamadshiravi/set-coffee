import orderModel from "@/models/order";
import productModel from "@/models/product";
import isUserLogedIn from "@/utils/auth-utill/is-user-login";

export async function POST(req) {
  const theUser = await isUserLogedIn();
  if (!theUser) {
    return Response.json({ message: "User not login" }, { status: 401 });
  }

  try {
    const {
      firstname,
      lastname,
      province,
      city,
      address,
      postCode,
      details,
      cart,
    } = await req.json();

    let serverCart = await Promise.all(
      cart.map(async (e) => {
        const product = await productModel.findOne({ _id: e.id }, "price");
        return { product: product._id, price: product.price, count: e.count };
      })
    );

    let allPrice = 0;

    serverCart.map((e) => (allPrice = allPrice + e.price * e.count));
    const tax = (allPrice * 10) / 100;

    allPrice = allPrice + tax; //tax
    allPrice = allPrice + 50000; //Motorcycle pickup cost

    const order = await orderModel.create({
      firstname,
      lastname,
      province,
      city,
      address,
      postCode,
      details,
      allPrice,
      order: serverCart,
      user: theUser._id,
    });

    return Response.json({ message: "order added" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "server error" }, { status: 500 });
  }
}
