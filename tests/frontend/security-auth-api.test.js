import { beforeEach, describe, expect, it, vi } from "vitest";
import { escapeHtml, createSafeAlert } from "../../frontend/assets/js/shared/security.js";
import { fetchJson } from "../../frontend/assets/js/shared/api.js";
import { decodeJwtPayload, isTokenExpired } from "../../frontend/assets/js/shared/auth.js";

const base64Url = (value) =>
  Buffer.from(JSON.stringify(value))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const makeToken = (payload) => `${base64Url({ alg: "none", typ: "JWT" })}.${base64Url(payload)}.`;

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.localStorage = {
    data: new Map(),
    getItem(key) {
      return this.data.get(key) ?? null;
    },
    setItem(key, value) {
      this.data.set(key, String(value));
    },
    removeItem(key) {
      this.data.delete(key);
    }
  };
  globalThis.atob = (value) => Buffer.from(value, "base64").toString("binary");
});

describe("frontend security helpers", () => {
  it("escapa HTML peligroso antes de renderizarlo", () => {
    expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });

  it("crea alertas sin interpolar HTML sin escapar", () => {
    const alert = createSafeAlert("<script>alert(1)</script>", "danger");
    expect(alert).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(alert).not.toContain("<script>");
  });
});

describe("frontend auth helpers", () => {
  it("decodifica payload JWT valido", () => {
    const token = makeToken({ tipo: "usuario", exp: 4_102_444_800 });
    expect(decodeJwtPayload(token)).toMatchObject({ tipo: "usuario" });
  });

  it("marca como expirado un token vencido o invalido", () => {
    expect(isTokenExpired(makeToken({ exp: 1 }))).toBe(true);
    expect(isTokenExpired("token-invalido")).toBe(true);
  });
});

describe("frontend API helper", () => {
  it("normaliza errores HTTP con respuesta JSON", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ mensaje: "No autorizado" }), { status: 401 })));

    await expect(fetchJson("/api/privado")).rejects.toMatchObject({
      message: "No autorizado",
      status: 401
    });
  });

  it("devuelve datos JSON en respuestas exitosas", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })));

    await expect(fetchJson("/api/ok")).resolves.toEqual({ ok: true });
  });
});
