import { useFetchProducts } from "./use-fetch-products";
import { renderHook } from "@testing-library/react-hooks";
import { makeServer } from "../miragejs/server";

import Response from "miragejs";
const originalError = console.error;

describe("useFetchProducts", () => {
  let server;

  beforeEach(() => {
    console.error = (...args) => {
      if (
        /Warning: ReactDOM.render is no longer supported in React 18./.test(
          args[0]
        )
      ) {
        return;
      }
      originalError.call(console, ...args);
    };
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should return a list of 10 products", async () => {
    server.createList("product", 10);

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.products).toHaveLength(10);
    expect(result.current.error).toBe(false);
  });

  it("should set error to true when catch() block is executed", async () => {
    server.get("products", () => {
      return new Response(500, {}, "");
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(result.current.products).toHaveLength(0);
  });
});
