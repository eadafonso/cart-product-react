import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("sould render the productCard component 10 time", async () => {
    server.createList("product", 10);

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });

  it('should render the "no products message"', async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId("no-products")).toBeInTheDocument();
    });
  });

  it("should display error message when promise rejects", async () => {
    server.get("products", () => {
      return new Response(500, {}, "");
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId("server-error")).toBeInTheDocument();
      expect(screen.queryByTestId("no-products")).toBeNull();
      expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
    });
  });

  it("should filter the product list when a search is performed", async () => {
    const searchTerm = "Relógio bonito";

    server.createList("product", 2);

    server.create("product", {
      title: searchTerm,
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    });

    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, searchTerm);
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
    });
  });
});
