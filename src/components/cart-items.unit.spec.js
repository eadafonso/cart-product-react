import { fireEvent, render, screen } from "@testing-library/react";

import CartItems from "./cart-item";

const product = {
  title: "Computador Bonito",
  price: "22.00",
  image:
    "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
};

const renderCartItems = () => {
  render(<CartItems product={product} />);
};

describe("CartItems", () => {
  it("should render CartItems", () => {
    renderCartItems();

    expect(screen.getByTestId("cart-item")).toBeInTheDocument();
  });

  it("should display props content", () => {
    renderCartItems();

    expect(screen.getByText(new RegExp(product.title))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, "i"))
    ).toBeInTheDocument();
  });

  it("should display 1 as initial quantity", () => {
    renderCartItems();

    expect(screen.getByTestId("quantity").textContent).toBe("1");
  });

  it("should increase quantity by 1 when second button is clicked", async () => {
    renderCartItems();

    const [_, button] = screen.getAllByRole("button");

    await fireEvent.click(button);

    expect(screen.getByTestId("quantity").textContent).toBe("2");
  });

  it("should increase quantity by 1 when first button is clicked", async () => {
    renderCartItems();

    const [buttonDecrease, buttonIncrease] = screen.getAllByRole("button");
    const quantity = screen.getByTestId("quantity");

    await fireEvent.click(buttonIncrease);
    expect(quantity.textContent).toBe("2");

    await fireEvent.click(buttonDecrease);
    expect(quantity.textContent).toBe("1");
  });

  it("should not below zero in the quantity", async () => {
    renderCartItems();

    const [buttonDecrease] = screen.getAllByRole("button");
    const quantity = screen.getByTestId("quantity");

    expect(quantity.textContent).toBe("1");
    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);

    expect(quantity.textContent).toBe("0");
  });
});
