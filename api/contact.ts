import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = process.env.CONTACT_TO_EMAIL || "ikeda@closip.co.jp";
const FROM = process.env.CONTACT_FROM_EMAIL || "no-reply@resend.dev";

function isWeekday(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDay(); // 0 Sun ... 6 Sat
  return day >= 1 && day <= 5;
}

function safeArray(v: any): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const {
      type,
      name,
      company,
      email,
      message = "",
      page_url = "",

      // poc
      poc_issues,
      poc_issues_other = "",
      poc_data_types,
      poc_departments = "",
      poc_timing = "",

      // seminar
      ai_usage_status = "",
      seminar_headcount = "",
      subsidy_preference = "",
      seminar_dt1 = "",
      seminar_dt2 = "",
      seminar_dt3 = "",
    } = req.body || {};

    const t = String(type || "");
    if (!["general", "poc", "seminar"].includes(t)) {
      return res.status(400).json({ ok: false, error: "Invalid type" });
    }

    const n = String(name || "").trim();
    const c = String(company || "").trim();
    const e = String(email || "").trim();

    if (!n || !c || !e || !e.includes("@")) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    // type-specific validation
    let subject = "";
    let bodyLines: string[] = [];

    const now = new Date().toISOString();

    bodyLines.push(`種別: ${t}`);
    bodyLines.push(`氏名: ${n}`);
    bodyLines.push(`会社名: ${c}`);
    bodyLines.push(`メール: ${e}`);
    bodyLines.push(`送信元URL: ${page_url}`);
    bodyLines.push(`送信日時: ${now}`);
    bodyLines.push("");
    bodyLines.push("----");

    if (t === "general") {
      subject = "[closip][一般] お問い合わせ";
      bodyLines.push("お問い合わせ内容:");
      bodyLines.push(message || "(未入力)");
    }

    if (t === "poc") {
      subject = "[closip][オンプレPoC] ご相談";

      const issues = safeArray(poc_issues);
      if (issues.length === 0) return res.status(400).json({ ok: false, error: "poc_issues required" });

      if (issues.includes("other") && !String(poc_issues_other).trim()) {
        return res.status(400).json({ ok: false, error: "poc_issues_other required" });
      }

      const dataTypes = safeArray(poc_data_types);

      bodyLines.push("解決したい業務課題:");
      bodyLines.push(issues.join(", "));
      if (issues.includes("other")) {
        bodyLines.push(`その他詳細: ${String(poc_issues_other).trim()}`);
      }
      bodyLines.push("");
      bodyLines.push(`扱うデータ種別: ${dataTypes.join(", ") || "(未選択)"}`);
      bodyLines.push(`想定利用部門: ${poc_departments || "(未入力)"}`);
      bodyLines.push(`想定時期: ${poc_timing || "(未選択)"}`);
      bodyLines.push("");
      bodyLines.push("備考/お問い合わせ内容:");
      bodyLines.push(message || "(未入力)");
    }

    if (t === "seminar") {
      subject = "[closip][無料セミナー] お申し込み";

      if (!String(ai_usage_status).trim()) return res.status(400).json({ ok: false, error: "ai_usage_status required" });
      if (!String(seminar_dt1).trim()) return res.status(400).json({ ok: false, error: "seminar_dt1 required" });

      // Weekday validation
      const dts = [seminar_dt1, seminar_dt2, seminar_dt3].filter(Boolean).map(String);
      for (const dt of dts) {
        if (!isWeekday(dt)) return res.status(400).json({ ok: false, error: "Seminar datetime must be weekday" });
      }

      bodyLines.push(`生成AI活用状況: ${ai_usage_status}`);
      bodyLines.push(`想定参加人数: ${seminar_headcount || "(未選択)"}`);
      bodyLines.push(`助成金活用希望: ${subsidy_preference || "(未選択)"}`);
      bodyLines.push("");
      bodyLines.push("希望日時:");
      bodyLines.push(`第1希望: ${seminar_dt1}`);
      bodyLines.push(`第2希望: ${seminar_dt2 || "(未入力)"}`);
      bodyLines.push(`第3希望: ${seminar_dt3 || "(未入力)"}`);
      bodyLines.push("");
      bodyLines.push("備考（Meet不可など）:");
      bodyLines.push(message || "(未入力)");
    }

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      text: bodyLines.join("\n"),
      reply_to: e, // 返信しやすくする
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
}
