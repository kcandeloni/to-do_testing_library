import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Testando renderização", () => {
  it("Se o texto To-do esta presente na tela", () => {
    render(
      <App />,
    );
    expect(screen.getByText("To-do"));
  });
});

describe("Adicionando itens na lista", () => {
  it("Valida se elemento é adicionado na tela", async () => {
    render(
      <App />,
    );
    const input = screen.getByPlaceholderText(/Whith/i);
    await userEvent.type(input, "fazer churrasco{enter}");
    expect(screen.getByText("1 - fazer churrasco"));
  });

  it("Valida se elemento não está tela", async () => {
    render(
      <App />,
    );
    const input = screen.getByPlaceholderText(/Whith/i);
    await userEvent.type(input, "fazer churrasco{enter}");
    expect(screen.queryByText("bolinha")).toEqual(null);
  });
});

describe("Removendo itens na lista", () => {
  it("Valida se elemento foi removido na tela", async () => {
    const { container } = render(
      <App />,
    );
    const input = screen.getByPlaceholderText(/Whith/i);
    await userEvent.type(input, "fazer churrasco{enter}");
    const close = container.querySelector("svg");
    await userEvent.click(close);
    expect(screen.queryByText("1 - fazer churrasco")).toEqual(null);
  });
});

describe("Item selecioando", () => {
  it("Valida se elemento da lista foi selecionado(line-through)", async () => {
    const { container } = render(
      <App />,
    );
    const input = screen.getByPlaceholderText(/Whith/i);
    await userEvent.type(input, "fazer churrasco{enter}");
    const element = container.querySelector("li");
    await userEvent.click(element);
    const selected = container.querySelector(".concluida");
    expect(selected).not.toBe(null);
  });
});