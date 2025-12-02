import { CartItem } from "@/types/cart";

export const getOrderInformationHtml = (cartItems: CartItem[], totalAmount: any) => {
  let html = `
    <div style="
      font-family: Arial, Helvetica, sans-serif;
      background: #f7f7f7;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
    ">
      <h3 style="
        margin: 0 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 2px solid #e0e0e0;
        color: #333;
      ">
        Order Summary
      </h3>
  `;

  cartItems.forEach((cartItem) => {
    const { name, price, image } = cartItem;

    html += `
      <div style="
        display: flex;
        align-items: center;
        gap: 12px;
        background: #fff;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      ">
        <img 
          src="${image}" 
          alt="${name}"
          style="width: 55px; height: 55px; object-fit: cover; border-radius: 6px;"
        />

        <div style="flex: 1;">
          <p style="margin: 0; font-size: 14px; font-weight: bold; color: #222;">
            ${name}
          </p>
        </div>

        <div style="font-size: 14px; color: #444; font-weight: 600;">
          Rs ${price}
        </div>
      </div>
    `;
  });

  html += `
      <div style="
        margin-top: 20px;
        padding: 15px;
        background: #1477B4;
        color: white;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <span>Total</span>
        <span>Rs ${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  `;

  return html;
};
