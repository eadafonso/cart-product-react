import { screen, render, waitFor } from "@testing-library/react";

import ProductList from "../pages";

const renderProductList = () => {
  render(<ProductList />);
};

describe("Product List", () => {
  it("should render product list", () => {
    renderProductList();

    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  fit("sould render the productCard component 10 time", async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId("product-card")).toHaveLength(10);
    });
  });
});
