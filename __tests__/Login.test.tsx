import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "@/app/(routes)/(auth)/login/page";

it("Should return a session on Google signin", async () => {
  const user = userEvent.setup();
  render(<Login />);
});
