import { screen, render, waitFor } from "@testing-library/react";

import ProductList from "../pages";

import { makeServer } from "../miragejs/server";

const renderProductList = () => {
  render(<ProductList />);
};

describe("Product List", () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should render product list", () => {
    renderProductList();

    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  fit("sould render the productCard component 10 time", async () => {
    server.createList("product", 10);

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });
});
