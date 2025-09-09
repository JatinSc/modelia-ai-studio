import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest"; // ✅ add this
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import GenerateSection from "./GenerateSection";
import { mockGenerate, type GenerateResponse } from "../utils/mockApi";

// Mock API
vi.mock("../utils/mockApi", () => ({
  mockGenerate: vi.fn(),
}));

describe("GenerateSection Component", () => {
  const uploadedImage = "test-image.png";
  const prompt = "Make it look like a painting";
  const style = "Watercolor";
  const addToHistory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders generate button disabled if no image/prompt", () => {
    render(
      <GenerateSection
        uploadedImage={null}
        prompt=""
        style={style}
        addToHistory={addToHistory}
      />
    );

    const button = screen.getByRole("button", { name: /generate image/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("calls mockGenerate and shows modal on success", async () => {
    (mockGenerate as Mock).mockResolvedValueOnce({
      id: "1",
      imageUrl: "generated.png",
      prompt,
      style,
      createdAt: new Date().toISOString(),
    } as GenerateResponse);

    render(
      <GenerateSection
        uploadedImage={uploadedImage}
        prompt={prompt}
        style={style}
        addToHistory={addToHistory}
      />
    );

    const generateButton = screen.getByRole("button", {
      name: /generate image/i,
    });

    await act(async () => {
      fireEvent.click(generateButton);
    });

    const modal = await screen.findByText(/generated image/i);
    expect(modal).toBeInTheDocument();
    expect(addToHistory).toHaveBeenCalledTimes(1);
  });

  it("shows error after max retries", async () => {
    (mockGenerate as Mock).mockRejectedValue(new Error("Generation failed"));

    render(
      <GenerateSection
        uploadedImage={uploadedImage}
        prompt={prompt}
        style={style}
        addToHistory={addToHistory}
      />
    );

    const generateButton = screen.getByRole("button", {
      name: /generate image/i,
    });

    await act(async () => {
      fireEvent.click(generateButton);
    });

    const error = await screen.findByTestId(
      "error-message",
      {},
      { timeout: 5000 }
    );
    expect(error).toHaveTextContent(/generation failed/i);
  });
});
    