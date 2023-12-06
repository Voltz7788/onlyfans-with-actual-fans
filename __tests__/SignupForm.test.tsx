import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "@/app/components/login-signup/AuthForms";

describe("Signup Form", () => {
  const onSubmit = jest.fn();
  const setupForm = () => render(<SignupForm />);

  beforeEach(() => {
    onSubmit.mockClear();
  });

  it("onSubmit is called when all fields pass validation", async () => {
    setupForm();

    await userEvent.type(getName(), "Yannis");
    await userEvent.type(getEmail(), "yannismadu777@gmail.com");
    await userEvent.type(getPass(), "12345");
    await userEvent.type(getConfirmPass(), "12345");
  });
});

function getName() {
  return screen.getByRole("textbox", { name: /name/i });
}

function getEmail() {
  return screen.getByRole("textbox", { name: /email/i });
}

function getPass() {
  return screen.getByRole("textbox", { name: /password/i });
}

function getConfirmPass() {
  return screen.getByRole("textbox", { name: /confirmPass/i });
}
